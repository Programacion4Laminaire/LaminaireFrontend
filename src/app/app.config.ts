import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorFn } from './modules/core/interceptors/auth.interceptor';
import { apiInterceptor } from './modules/core/interceptors/api.interceptor';
import { AuthExpiryInterceptor } from './modules/core/interceptors/auth-expiry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // 👇 habilita interceptores DI-based + mantiene los funcionales
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([AuthInterceptorFn, apiInterceptor])
    ),
    // 👇 registra tu interceptor por clase
    { provide: HTTP_INTERCEPTORS, useClass: AuthExpiryInterceptor, multi: true },
  ],
};
