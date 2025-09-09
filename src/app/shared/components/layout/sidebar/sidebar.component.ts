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

// === NUEVO: filtro ===
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
    HighlightPipe, // para resaltar coincidencias
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [fadeInOutAnimation],
})
export class SidebarComponent {
  [x: string]: any;

  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);

  menu: MenuResponse[] = [];
  menuArray: INavbarData[] = [];

  @Output() onToggleSideNav: EventEmitter<ISidebarToggle> = new EventEmitter();
  collapsed: boolean = false; // en tu UI "true" significa ancho expandido (texto visible)
  screenWidth = 0;
  navData: INavbarData[] = [];
  multiple: boolean = false;

  // === Estado del filtro ===
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
  onResize(event: any) {
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
      ch => isActiveRoute(ch.route) || hasActiveDescendant(ch)
    );

  // Si el nodo tiene ruta, evalúa por ruta; si no, por sus hijos
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

  // === Carga del menú desde backend y armado del árbol ===
  getMenuByRole(): void {
    this.menuService.getMenuByRole().subscribe((resp) => {
      this.menu = resp.data;
      this.menuArray = [];

      if (this.menu != null) {
        // padres
        this.menu.forEach((m: MenuResponse) => {
          if (m.fatherId == 0) {
            const obj: INavbarData = {
              menuId: m.menuId,
              route: m.path ?? '',
              label: m.item ?? '',
              icon: m.icon ?? '',
              items: [],
            };
            this.menuArray.push(obj);
          }
        });

        // hijos
        this.menu.forEach((m: MenuResponse) => {
          if (m.fatherId != 0) {
            const index = this.menuArray.findIndex(
              (p) => p.menuId === m.fatherId
            );

            if (index !== -1) {
              const obj: INavbarData = {
                menuId: m.menuId,
                route: m.path ?? '',
                label: m.item ?? '',
                icon: m.icon ?? '',
                items: [],
              };

              (this.menuArray[index].items ??= []).push(obj);
            } else {
              console.warn(`No se encontró un padre con MenuId: ${m.fatherId}`);
            }
          }
        });
      }

      // refrescar fuentes del sidebar y el filtro
      this.navData = this.menuArray;

      const t = this.searchCtrl.value?.trim() ?? '';
      this.isFiltering = t.length > 0;
      this.filteredNavData = this.isFiltering
        ? this.filterMenuTree(this.navData, t)
        : this.navData;
    });
  }

  // ========= utilidades de filtro =========
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
