import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Validación directa desde localStorage (más confiable en recargas)
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  // Redirige al login y reemplaza la URL para que no se pueda volver con "atrás"
  router.navigate(['/login'], { replaceUrl: true });
  return false;
};
