import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuResponse } from '@app/shared/models/layout/menu.interface';
import { MenuService } from '@app/modules/core/services/menu.service';
import { fadeInOutAnimation } from '@shared/animations/fade-in-out.animation';
import { INavbarData } from '@shared/models/layout/navbar-data.interface';
import { ISidebarToggle } from '@shared/models/layout/sidebar-toggle.interface';
import { SublevelMenuComponent } from '../sublevel-menu/sublevel-menu.component';

// Filtro / búsqueda
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { HighlightPipe } from '@shared/pipes/highlight.pipe';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    SublevelMenuComponent,
    MatIconModule,
    ReactiveFormsModule,
    HighlightPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [fadeInOutAnimation],
})
export class SidebarComponent {
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);

  // datos crudos y árbol
  menu: MenuResponse[] = [];
  navData: INavbarData[] = [];

  // estado UI
  @Output() onToggleSideNav: EventEmitter<ISidebarToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth = 0;
  multiple: boolean = false;

  // filtro
  searchCtrl = new FormControl<string>('', { nonNullable: true });
  filteredNavData: INavbarData[] = [];
  isFiltering = false;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.toggleCollapsed();
    this.getMenuByRole();

    // stream del filtro
    this.searchCtrl.valueChanges
      .pipe(
        startWith(this.searchCtrl.value),
        debounceTime(120),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        const t = term?.trim() ?? '';
        this.isFiltering = t.length > 0;

        const base = this.navData ?? [];
        this.filteredNavData = this.isFiltering
          ? this.filterMenuTree(base, t)
          : base;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(node: INavbarData): string {
    const current = this.router.url;

    const isActiveRoute = (route?: string | null) =>
      !!route && (current === route || current.startsWith(route + '/'));

    const hasActiveDescendant = (n: INavbarData): boolean =>
      (n.items ?? []).some(
        (ch) => isActiveRoute(ch.route) || hasActiveDescendant(ch)
      );

    if (isActiveRoute(node.route)) return 'active';
    return hasActiveDescendant(node) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let subItem of this.navData) {
        if (item !== subItem && (subItem as any).expanded) {
          (subItem as any).expanded = false;
        }
      }
    }
  }

  // ===== Armado del árbol n-niveles desde lista plana =====

  /** Convierte un MenuResponse en un INavbarData */
  private toNode(m: MenuResponse): INavbarData {
    return {
      menuId: m.menuId,
      route: m.path ?? '',
      label: m.item ?? '',
      icon: m.icon ?? '',
      items: [],
      // Si más adelante agregas "position" al DTO y al interface,
      // puedes guardarlo aquí y ordenar por position en sortRec.
      // position: m.position
    };
  }

  /**
   * Construye un árbol con soporte para:
   *  - raíces clásicas (fatherId = 0)
   *  - raíces self-parent (fatherId = menuId, p.ej. CEO)
   *  - casos donde no exista el padre en la lista (caen como raíz)
   */
  private buildTreeFromFlat(flat: MenuResponse[]): INavbarData[] {
    const map = new Map<number, INavbarData>();
    flat.forEach((m) => map.set(m.menuId, this.toNode(m)));

    const roots: INavbarData[] = [];

    for (const m of flat) {
      const node = map.get(m.menuId)!;
      const fid = m.fatherId;

      const isSelfRoot = fid === m.menuId; // raíz que se apunta a sí misma
      const isZeroRoot = fid === 0;        // raíz clásica
      const parent = fid != null ? map.get(fid) : undefined;

      if (isSelfRoot || isZeroRoot || !parent) {
        roots.push(node);
      } else {
        (parent.items ??= []).push(node);
      }
    }

    // Orden recursivo: por label (alfabético). Si tuvieras "position", úsalo primero.
    const sortRec = (nodes: INavbarData[]) => {
      nodes.sort((a, b) =>
        // ((a as any).position ?? 0) - ((b as any).position ?? 0) ||
        (a.label || '').localeCompare(b.label || '')
      );
      nodes.forEach((n) => n.items && sortRec(n.items));
    };
    sortRec(roots);

    return roots;
  }

  // ===== Carga desde backend y proyección al árbol =====
  getMenuByRole(): void {
    this.menuService.getMenuByRole().subscribe((resp) => {
      const flat = resp?.data ?? [];
      this.menu = flat;

      // 1) construir árbol
      const tree = this.buildTreeFromFlat(flat);

      // 2) si hay un único root y es self-parent (CEO), “desenvolverlo”:
      //    mostramos sus hijos como nivel principal (Financiera, Comercial, etc.)
      let nav: INavbarData[] = tree;
      if (tree.length === 1) {
        const root = tree[0];
        const isSelfRoot = flat.some(
          (x) => x.menuId === root.menuId && x.fatherId === x.menuId
        );
        if (isSelfRoot) nav = root.items ?? [];
      }

      this.navData = nav;

      // 3) refrescar filtro
      const t = this.searchCtrl.value?.trim() ?? '';
      this.isFiltering = t.length > 0;
      this.filteredNavData = this.isFiltering
        ? this.filterMenuTree(this.navData, t)
        : this.navData;
    });
  }

  // ====== utilidades de filtro ======
  clearSearch(): void {
    this.searchCtrl.setValue('');
  }

  private normalize(s: string): string {
    return (s || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase();
  }

  private filterMenuTree(nodes: INavbarData[], term: string): INavbarData[] {
    const q = this.normalize(term);

    const visit = (n: INavbarData): INavbarData | null => {
      const label = n.label ?? '';
      const route = n.route ?? '';
      const selfMatch =
        this.normalize(label).includes(q) ||
        this.normalize(route).includes(q);

      const prunedChildren = (n.items ?? [])
        .map(visit)
        .filter(Boolean) as INavbarData[];

      if (selfMatch || prunedChildren.length) {
        return { ...n, items: prunedChildren };
      }
      return null;
    };

    return (nodes ?? []).map(visit).filter(Boolean) as INavbarData[];
  }
}
