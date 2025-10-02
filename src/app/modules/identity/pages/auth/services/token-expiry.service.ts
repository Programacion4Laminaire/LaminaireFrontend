import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { interval, fromEvent, merge } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenExpiryService {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  // Rutas públicas (ajusta según tu app). Usar startsWith para permitir parámetros.
  private readonly PUBLIC_ROUTES = [
    '/login',
    '/reset-password',
    '/forgot-password',
    '/otp',
    '/change-password'
  ];

  private lastCookieValue: string | null = null;

  constructor() {
    const ticks$   = interval(1000);
    const focus$   = fromEvent(window, 'focus');
    const visible$ = fromEvent(document, 'visibilitychange');
    const storage$ = fromEvent<StorageEvent>(window, 'storage');

    try {
      const bc = new BroadcastChannel('auth');
      bc.onmessage = (ev) => { if (ev?.data) this.checkNow(); };
    } catch { /* no-op */ }

    this.checkNow(); // chequeo inicial
    merge(ticks$, focus$, visible$, storage$).subscribe(() => this.checkNow());
  }

  private isPublicRoute(url: string): boolean {
    // normaliza fragmentos y query string
    const clean = url.split('?')[0].split('#')[0];
    return this.PUBLIC_ROUTES.some(p => clean.startsWith(p));
  }

  private checkNow() {
    const currentUrl = this.router.url || '/';

    // ✅ Si estoy en ruta pública, no fuerzo login aunque no haya cookie/token
    if (this.isPublicRoute(currentUrl)) return;

    // 1) COOKIE FIRST
    const cookieValue = this.getCookie('Datos');
    if (!cookieValue) return this.forceLogin();

    if (this.lastCookieValue === null) {
      this.lastCookieValue = cookieValue;
    } else if (this.lastCookieValue !== cookieValue) {
      return this.forceLogin();
    }

    // 2) TOKEN
    const tokenStr = localStorage.getItem('token');
    if (!tokenStr) return this.forceLogin();

    let decoded: any;
    try { decoded = jwtDecode(JSON.parse(tokenStr)); }
    catch { return this.forceLogin(); }

    if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
      return this.forceLogin();
    }
  }

  private forceLogin() {
    // si ya estoy en login, no navegar otra vez
    if (this.isPublicRoute(this.router.url)) return;
    this.auth.logout();
    // ❌ sin query params
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([$?*|{}\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return match ? match[1] : null;
  }
}
