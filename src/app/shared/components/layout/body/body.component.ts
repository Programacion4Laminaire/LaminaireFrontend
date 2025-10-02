import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-body',
  imports: [RouterOutlet, NgClass],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  @Input() collapsed = false;  // true = sidebar ancho (16.5625rem)
  @Input() screenWidth = 0;

  getBodyClass(): string {
    // Móvil: el body SIEMPRE a 100% (sidebar se superpone o está oculto)
    if (this.screenWidth <= 768) return 'body-full';

    // Desktop: ancho depende del estado del sidebar
    return this.collapsed ? 'body-origin' : 'body-md';
  }
}
