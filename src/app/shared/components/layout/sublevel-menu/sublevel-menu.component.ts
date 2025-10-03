import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeInOutAnimation } from '@shared/animations/fade-in-out.animation';
import { INavbarData } from '@shared/models/layout/navbar-data.interface';
import { HighlightPipe } from '@shared/pipes/highlight.pipe';
import { SidebarComponent } from '../sidebar/sidebar.component';

/* ──────────────────────────────────────────────
   🔁 Animación local del submenú (sin overflow)
   - Usa states 'hidden' y 'visible'
   - Permite params opcionales: height y transitionParams
   - Evita animar 'overflow' (eso va fijo en CSS)
   ────────────────────────────────────────────── */
const sublevelMenuAnimation = trigger('submenu', [
  state('hidden', style({
    height: '0',
    opacity: 0
  })),
  state('visible', style({
    height: '{{height}}',
    opacity: 1
  }), { params: { height: '*' } }),
  transition('hidden <=> visible', [
    animate('{{transitionParams}}')
  ], { params: { transitionParams: '300ms cubic-bezier(0.86, 0, 0.07, 1)' } })
]);

@Component({
  standalone: true,
  selector: 'app-sublevel-menu',
  imports: [NgClass, RouterLink, RouterLinkActive, MatIconModule, HighlightPipe],
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['./../sidebar/sidebar.component.scss'],
  /* Fijamos overflow por CSS para evitar el warning de Angular */
  styles: [`
    .sublevel-nav { overflow: hidden; }
  `],
  animations: [fadeInOutAnimation, sublevelMenuAnimation],
})
export class SublevelMenuComponent {
  private readonly router = inject(Router);
  private readonly sidebar = inject(SidebarComponent); // para usar toggleFavorite

  @Input() data: INavbarData = {
    menuId: 0,
    route: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  // Para expansión forzada y resaltado en búsqueda
  @Input() isFiltering: boolean = false;
  @Input() term: string = '';

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let subItem of this.data.items) {
          if (item !== subItem && (subItem as any).expanded) {
            (subItem as any).expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return (item as any).expanded && this.router.url.includes(item.route ?? '')
      ? 'active-sublevel'
      : '';
  }

  // ⭐ usar el toggleFavorite del padre
  toggleFavorite(item: INavbarData): void {
    this.sidebar.toggleFavorite(item);
  }
}
