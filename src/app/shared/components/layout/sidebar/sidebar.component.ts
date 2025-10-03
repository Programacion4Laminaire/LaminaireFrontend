import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { MenuResponse } from '@app/shared/models/layout/menu.interface';
import { MenuService } from '@app/modules/core/services/menu.service';
import { fadeInOutAnimation } from '@shared/animations/fade-in-out.animation';
import { INavbarData } from '@shared/models/layout/navbar-data.interface';
import { ISidebarToggle } from '@shared/models/layout/sidebar-toggle.interface';
import { SublevelMenuComponent } from '../sublevel-menu/sublevel-menu.component';

// Filtro / búsqueda
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  filter,
} from 'rxjs/operators';
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
  collapsed: boolean = false; // false=angosto (cerrado), true=ancho (abierto)
  screenWidth = 0;
  multiple: boolean = false;

  // activación manual (grupos) y temporal (hojas)
  manualActiveId: number | null = null;
  tempActiveRoute: string | null = null;

  // filtro
  searchCtrl = new FormControl<string>('', { nonNullable: true });
  filteredNavData: INavbarData[] = [];
  isFiltering = false;

  // ⭐ favoritos (IDs en memoria)
  private FAVORITES_KEY = 'menu_favorites';
  private favoriteIds = new Set<number>();

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    // ✅ Abre por defecto solo en desktop. En móvil queda oculto.
    if (this.screenWidth > 768) {
      this.toggleCollapsed();
    }

    this.getMenuByRole();

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.manualActiveId = null;
        this.tempActiveRoute = null;
      });

    this.searchCtrl.valueChanges
      .pipe(
        startWith(this.searchCtrl.value),
        debounceTime(120),
        distinctUntilChanged()
      )
      .subscribe(() => this.refreshFilteringView());
  }

  @HostListener('window:resize')
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
    // activación manual (para grupos)
    if (this.manualActiveId != null && node.menuId === this.manualActiveId) {
      return 'active';
    }

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
  private toNode(m: MenuResponse): INavbarData {
    return {
      menuId: m.menuId,
      route: m.path ?? '',
      label: m.item ?? '',
      icon: m.icon ?? '',
      items: [],
    };
  }

  private buildTreeFromFlat(flat: MenuResponse[]): INavbarData[] {
    const map = new Map<number, INavbarData>();
    flat.forEach((m) => map.set(m.menuId, this.toNode(m)));

    const roots: INavbarData[] = [];

    for (const m of flat) {
      const node = map.get(m.menuId)!;
      const fid = m.fatherId;

      const isSelfRoot = fid === m.menuId;
      const isZeroRoot = fid === 0;
      const parent = fid != null ? map.get(fid) : undefined;

      if (isSelfRoot || isZeroRoot || !parent) {
        roots.push(node);
      } else {
        (parent.items ??= []).push(node);
      }
    }

    const sortRec = (nodes: INavbarData[]) => {
      nodes.sort((a, b) => (a.label || '').localeCompare(b.label || ''));
      nodes.forEach((n) => n.items && sortRec(n.items));
    };
    sortRec(roots);

    return roots;
  }

  // ===== Carga desde backend =====
  getMenuByRole(): void {
    this.menuService.getMenuByRole().subscribe((resp) => {
      const flat = resp?.data ?? [];
      this.menu = flat;

      const tree = this.buildTreeFromFlat(flat);

      // si hay un único root self-parent (CEO), mostrar sus hijos como raíz
      let nav: INavbarData[] = tree;
      if (tree.length === 1) {
        const root = tree[0];
        const isSelfRoot = flat.some(
          (x) => x.menuId === root.menuId && x.fatherId === x.menuId
        );
        if (isSelfRoot) nav = root.items ?? [];
      }

      this.navData = nav;

      // ⭐ restaurar favoritos desde storage al árbol real
      this.loadFavorites();       // llena favoriteIds (Set)
      this.applyFavorites(this.navData);

      // pintar vista (filtrada o no)
      this.refreshFilteringView();
    });
  }

  // ===== utilidades de filtro =====
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
        // OJO: esto crea un clon visual; el estado real vive en navData
        return { ...n, items: prunedChildren };
      }
      return null;
    };

    return (nodes ?? []).map(visit).filter(Boolean) as INavbarData[];
  }

  /** Recalcula la vista (lista filtrada o completa) según el término actual */
  private refreshFilteringView(): void {
    const t = this.searchCtrl.value?.trim() ?? '';
    this.isFiltering = t.length > 0;
    this.filteredNavData = this.isFiltering
      ? this.filterMenuTree(this.navData, t)
      : this.navData;
  }

  // ===== Favoritos =====
  private loadFavorites(): void {
    this.favoriteIds.clear();
    const raw = localStorage.getItem(this.FAVORITES_KEY);
    if (!raw) return;
    try {
      const ids: number[] = JSON.parse(raw) ?? [];
      ids.forEach(id => this.favoriteIds.add(id));
    } catch { /* ignore parse errors */ }
  }

  /** Marca favorite=true en el árbol real según favoriteIds */
  private applyFavorites(nodes: INavbarData[]): void {
    const walk = (arr: INavbarData[]) => {
      for (const n of arr) {
        const id = n.menuId!;
        n.favorite = typeof id === 'number' && this.favoriteIds.has(id);
        if (n.items?.length) walk(n.items);
      }
    };
    walk(nodes);
  }

  /** Alterna favorito por ID real, persiste y refresca la vista filtrada */
  toggleFavorite(item: INavbarData): void {
    const id = item.menuId;
    if (typeof id !== 'number') return;

    if (this.favoriteIds.has(id)) this.favoriteIds.delete(id);
    else this.favoriteIds.add(id);

    // persistir
    localStorage.setItem(
      this.FAVORITES_KEY,
      JSON.stringify(Array.from(this.favoriteIds))
    );

    // aplicar al árbol real y refrescar la vista (para que el clon filtrado se regenere)
    this.applyFavorites(this.navData);
    this.refreshFilteringView();
  }

  /** Obtiene favoritos desde el árbol real (para sección superior) */
  getFavorites(): INavbarData[] {
    const favs: INavbarData[] = [];
    const walk = (arr: INavbarData[]) => {
      for (const n of arr) {
        if (n.favorite) favs.push(n);
        if (n.items?.length) walk(n.items);
      }
    };
    walk(this.navData);
    return favs;
  }

  // ===== handlers de click =====
  onRootClick(item: INavbarData, ev: MouseEvent): void {
    // activar visualmente el grupo
    this.manualActiveId = item.menuId ?? null;

    // Si está cerrado (angosto), abrir y expandir
    if (!this.collapsed) {
      ev.preventDefault();
      ev.stopPropagation();
      this.toggleCollapsed();
      setTimeout(() => {
        this.shrinkItems(item);
        item.expanded = true;
      }, 0);
      return;
    }

    // Si ya está abierto, comportamiento normal
    this.handleClick(item);
  }

  onLeafClick(item: INavbarData, ev: MouseEvent): void {
    // Si está cerrado, abrir y navegar
    if (!this.collapsed) {
      ev.preventDefault();
      ev.stopPropagation();
      this.tempActiveRoute = item.route ?? null; // activa inmediato
      const route = item.route;
      this.toggleCollapsed();
      setTimeout(() => {
        if (route) this.router.navigate([route]);
      }, 0);
      return;
    }

    // Si ya está abierto, mantiene single-open
    this.shrinkItems(item);
  }
}
