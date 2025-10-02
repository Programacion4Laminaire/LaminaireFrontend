import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';

@Injectable()
export class AuthExpiryInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
if ([401, 403, 419].includes(err.status)) {
  this.auth.logout(); // antes: logout(false)
  // ❌ sin queryParams por seguridad
  this.router.navigate(['/login'], { replaceUrl: true });
  return throwError(() => err);
}

        }
        return throwError(() => err);
      })
    );
  }
}
