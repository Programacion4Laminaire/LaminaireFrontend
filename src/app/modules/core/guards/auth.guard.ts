// 
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const tokenStr = localStorage.getItem('token');
  if (!tokenStr) {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  try {
    const token = JSON.parse(tokenStr);
    const decoded: any = jwtDecode(token);

    // 1️⃣ Validar expiración
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.warn('⚠️ Token expirado');
      authService.logout();
      router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    // 2️⃣ Validar que la cookie siga existiendo
    const cookie = document.cookie.includes('Datos=');
    if (!cookie) {
      console.warn('⚠️ Cookie del backend ausente → forzar login');
      authService.logout();
      router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    return true;
  } catch (err) {
    console.error('❌ Token inválido:', err);
    authService.logout();
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
};
