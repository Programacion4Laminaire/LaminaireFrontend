import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeInOutAnimation } from '@shared/animations/fade-in-out.animation';
import { INavbarData } from '@shared/models/layout/navbar-data.interface';
import { HighlightPipe } from '@shared/pipes/highlight.pipe';
import { SidebarComponent } from '../sidebar/sidebar.component';

/* 🔁 Animación local (sin overflow) */
const sublevelMenuAnimation = trigger('submenu', [
  state('hidden', style({ height: '0', opacity: 0 })),
  state('visible', style({ height: '{{height}}', opacity: 1 }), {
    params: { height: '*' }
  }),
  transition('hidden <=> visible', [
    animate('{{transitionParams}}')
  ], {
    params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)' } // easing válido
  })
]);

@Component({
  standalone: true,
  selector: 'app-sublevel-menu',
  imports: [NgClass, RouterLink, RouterLinkActive, MatIconModule, HighlightPipe],
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['./../sidebar/sidebar.component.scss'],
  styles: [`.sublevel-nav { overflow: hidden; }`],
  animations: [fadeInOutAnimation, sublevelMenuAnimation],
})
export class SublevelMenuComponent {
  private readonly router = inject(Router);
  private readonly sidebar = inject(SidebarComponent);

  @Input() data: INavbarData = { menuId: 0, route: '', icon: '', label: '', items: [] };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false; // acordeón por nivel

  // Para expansión forzada y resaltado en búsqueda
  @Input() isFiltering: boolean = false;
  @Input() term: string = '';

  /** 👉 Igual que el normal: toggle y cierra hermanos del MISMO nivel */
  handleClick(item: INavbarData): void {
    if (!this.multiple && this.data.items?.length) {
      for (const sib of this.data.items) {
        if (sib !== item && (sib as any).expanded) (sib as any).expanded = false;
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return (item as any).expanded && this.router.url.includes(item.route ?? '')
      ? 'active-sublevel'
      : '';
  }

  // ⭐ favorito: usa el del padre (no se toca tu lógica)
  toggleFavorite(item: INavbarData): void {
    this.sidebar.toggleFavorite(item);
  }

  /** Se conserva tu lógica de NEW (no se toca) */
  hasNewDescendant(node: INavbarData | null | undefined): boolean {
    if (!node) return false;
    if (node.isNew) return true;
    if (!node.items?.length) return false;
    const stack: INavbarData[] = [...node.items];
    while (stack.length) {
      const n = stack.pop()!;
      if (n.isNew) return true;
      if (n.items?.length) stack.push(...n.items);
    }
    return false;
  }
}
