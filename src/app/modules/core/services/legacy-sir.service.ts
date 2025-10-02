import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { legacyEndpoint } from '@app/shared/utils/endpoints.util';
import { map, Observable } from 'rxjs';

/**
 * Cliente "crudo" (sin interceptores), sin Authorization ni cookies.
 * POST JSON { User, Password } a .../WebApiLaminaire/ActualizarPasswordSirOfima
 */
@Injectable({ providedIn: 'root' })
export class LegacySirService {
  private rawHttp: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.rawHttp = new HttpClient(httpBackend);
  }

  private url(): string {
    const base = env.apiLegacySir.replace(/\/+$/, '');
    return `${base}/${legacyEndpoint.UPDATE_SIR_CREDENTIALS}`;
  }

  /** Implementación base */
  private postUserPassword(user: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    const body = { User: user, Password: password };

    return this.rawHttp.post(this.url(), body, {
      headers,
      withCredentials: false,           // sin cookies
      observe: 'response',
      responseType: 'text' as 'json',  // legacy suele devolver vacío
    })
    .pipe(map(r => r.status >= 200 && r.status < 300));
  }

  /** Alias usado en UserManagementComponent */
  updateCredentialsJson(user: string, password: string): Observable<boolean> {
    return this.postUserPassword(user, password);
  }

  /** Alias usado en ResetPasswordComponent */
  updatePassword(user: string, password: string): Observable<boolean> {
    return this.postUserPassword(user, password);
  }
}
