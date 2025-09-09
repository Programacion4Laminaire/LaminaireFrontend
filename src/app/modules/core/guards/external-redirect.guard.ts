import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const externalRedirectGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const externalUrl = route.data['externalUrl'] as string;
  const router = inject(Router);

  if (externalUrl) {
    window.location.href = externalUrl; // redirige afuera
  }

  // devolvemos un UrlTree vacío para que Angular no intente cargar layout ni hijos
  return router.parseUrl('/');
};
