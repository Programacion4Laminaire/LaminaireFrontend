import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { errorMessages } from '@app/shared/utils/global-constants.util';
import { AlertService } from '@app/modules/core/services/alert.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const errorConfig = errorMessages[err.status];

      // 🔴 Caso cuando no hay conexión con el servidor o la API no responde
      if (err.status === 0) {
        alertService.error(
          'Error de conexión',
          'No se pudo conectar con la API. Verifique su conexión a internet o intente más tarde.'
        );
        return throwError(() => err);
      }

      // ✅ Errores de validación (400 con lista de errores)
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
          authService.logout();
        }
        return throwError(() => err);
      }

      // 🔴 Fallback para errores no contemplados
      alertService.error(
        'Error Desconocido',
        'Ha ocurrido un error inesperado. Por favor intente más tarde.'
      );
      return throwError(() => err);
    })
  );
};
