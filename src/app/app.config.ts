import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorFn } from './modules/core/interceptors/auth.interceptor';
import { apiInterceptor } from './modules/core/interceptors/api.interceptor';
import { AuthExpiryInterceptor } from './modules/core/interceptors/auth-expiry.interceptor';

// 👇 Importar soporte de idioma español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// 👇 Registrar el idioma español
registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),

    // 👇 Habilita interceptores DI-based + funcionales
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([AuthInterceptorFn, apiInterceptor])
    ),

    // 👇 Registrar el interceptor por clase
    { provide: HTTP_INTERCEPTORS, useClass: AuthExpiryInterceptor, multi: true },

    // 🌍 Establecer el idioma global a español
    { provide: LOCALE_ID, useValue: 'es' },
  ],
};
