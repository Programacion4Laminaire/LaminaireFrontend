import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { AlertService } from '../services/alert.service';
import { errorMessages } from '@app/shared/utils/global-constants.util';
import Swal from 'sweetalert2';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const errorConfig = errorMessages[err.status];

      if (err.status === 400 && err.error?.errors?.length) {
        const validationMessages = err.error.errors
          .map((e: any) => `• ${e.propertyName}: ${e.errorMessage}`)
          .join('\n');

        return from(
          Swal.fire('Errores de Validación', validationMessages, 'error')
        ).pipe(switchMap(() => throwError(() => err)));
      }

      if (errorConfig) {
        return from(
          Swal.fire({
            title: errorConfig.title,
            text: errorConfig.message,
            icon: 'info',
            confirmButtonText: 'Ir al Login <span class="material-icons" style="vertical-align: middle; margin-right: 6px;">logout</span> ',

             confirmButtonColor: '#003366', 
          })
        ).pipe(
          switchMap(() => {
            if (errorConfig.logout) {
              authService.logout();
            }
            return throwError(() => err);
          })
        );
      }

      return from(
        Swal.fire(
          'Error Desconocido',
          'Ha ocurrido un error inesperado. Por favor intente más tarde.',
          'error'
        )
      ).pipe(switchMap(() => throwError(() => err)));
    })
  );
};