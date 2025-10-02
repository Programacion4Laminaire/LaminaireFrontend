// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { catchError, from, switchMap, throwError } from 'rxjs';
// import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
// import { errorMessages } from '@app/shared/utils/global-constants.util';
// import { AlertService } from '@app/modules/core/services/alert.service';

// export const apiInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const alertService = inject(AlertService);

//   return next(req).pipe(
//     catchError((err: HttpErrorResponse) => {
//       const errorConfig = errorMessages[err.status];

//       // 🔴 Caso cuando no hay conexión con el servidor o la API no responde
//       if (err.status === 0) {
//         alertService.error(
//           'Error de conexión',
//           'No se pudo conectar con la API. Verifique su conexión a internet o intente más tarde.'
//         );
//         return throwError(() => err);
//       }

//       // ✅ Errores de validación (400 con lista de errores)
//       if (err.status === 400 && err.error?.errors?.length) {
//         const validationMessages = err.error.errors
//           .map((e: any) => `• ${e.propertyName}: ${e.errorMessage}`)
//           .join('\n');

//         alertService.error('Errores de Validación', validationMessages);
//         return throwError(() => err);
//       }

//       // ✅ Errores configurados en global-constants.util
//       if (errorConfig) {
//         alertService.info(errorConfig.title, errorConfig.message);

//         if (errorConfig.logout) {
//           authService.logout();
//         }
//         return throwError(() => err);
//       }

//       // 🔴 Fallback para errores no contemplados
//       alertService.error(
//         'Error Desconocido',
//         'Ha ocurrido un error inesperado. Por favor intente más tarde.'
//       );
//       return throwError(() => err);
//     })
//   );
// };

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { errorMessages } from '@app/shared/utils/global-constants.util';
import { AlertService } from '@app/modules/core/services/alert.service';
import { Router } from '@angular/router';

// Evita múltiples redirecciones simultáneas
let _forcingLogin = false;

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  const forceGoToLogin = (title: string, message: string) => {
    if (_forcingLogin) return;
    _forcingLogin = true;

    // Muestra el mensaje (opcional)
    alertService.error(title, message);

    // Opción A: solo usar tu logout (ya recarga y limpia todo)
    authService.logout();

    // Si prefieres navegar antes del reload, descomenta:
    // router.navigateByUrl('/login').finally(() => authService.logout());
  };

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const errorConfig = errorMessages[err.status];

      // 🔴 Sin conexión / CORS / servidor caído / offline
      if (
        err.status === 0 ||                    // Network error, CORS, timeout sin status
        err.status === 502 ||                  // Bad Gateway
        err.status === 503 ||                  // Service Unavailable
        err.status === 504 ||                  // Gateway Timeout
        !navigator.onLine                      // Modo offline del navegador
      ) {
        forceGoToLogin(
          'Error de conexión',
          'No se pudo conectar con la API. Te redirigimos al inicio de sesión.'
        );
        // Cortar el flujo del request
        return throwError(() => err);
      }

      // 🔒 No autorizado / sesión inválida
      if (err.status === 401 || err.status === 403) {
        forceGoToLogin(
          'Sesión inválida',
          'Tu sesión ha expirado o no tienes autorización. Inicia sesión nuevamente.'
        );
        return throwError(() => err);
      }

      // ✅ Errores de validación (400 con lista)
      if (err.status === 400 && err.error?.errors?.length) {
        const validationMessages = err.error.errors
          .map((e: any) => `• ${e.propertyName}: ${e.errorMessage}`)
          .join('\n');
        alertService.error('Errores de Validación', validationMessages);
        return throwError(() => err);
      }

      // ✅ Errores configurados en global-constants.util
      if (errorConfig) {
        alertService.info(errorConfig.title, errorConfig.message);
        if (errorConfig.logout) {
          forceGoToLogin('Sesión finalizada', errorConfig.message);
        }
        return throwError(() => err);
      }

      // 🔴 Fallback
      alertService.error(
        'Error Desconocido',
        'Ha ocurrido un error inesperado. Por favor intente más tarde.'
      );
      return throwError(() => err);
    })
  );
};
