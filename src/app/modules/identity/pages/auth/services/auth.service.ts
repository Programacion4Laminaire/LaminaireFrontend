import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { httpOptions } from '@app/shared/utils/global-constants.util';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment as env } from '@env/environment';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { endpoint } from '@app/shared/utils/endpoints.util';
import { LoginRequest } from '../models/login-request.interface';
import { ResetPasswordByIdentityRequest } from '../models/reset-password.interface';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  exp?: number;
  iat?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private user: BehaviorSubject<string>;
  isAuthenticated$: any;

  public get userToken(): string {
    return this.user.value;
  }

  constructor() {
    this.user = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('token')!)
    );
  }

  // 👉 Notificación cross-tab (logout / token actualizado)
  private notify(channelMsg: 'logout' | 'token-updated') {
    try {
      const bc = new BroadcastChannel('auth');
      bc.postMessage(channelMsg);
      bc.close();
    } catch { /* no-op */ }
  }

  /**
   * 🔹 Login contra el backend
   */
  login(request: LoginRequest): Observable<BaseApiResponse<string>> {
    const requestUrl = `${env.apiIdentity}${endpoint.LOGIN}`;
    return this.http
      .post<BaseApiResponse<string>>(requestUrl, request, httpOptions)
      .pipe(
        map((response: BaseApiResponse<string>) => {
          if (response.isSuccess) {
            // Guarda token
            localStorage.setItem('token', JSON.stringify(response.accessToken));
            this.user.next(response.accessToken);

            // 👇 Mantén tu lógica de cookie tal como la tienes en el login component:
            // - si desde el backend te llega `cookieDatos`, tú ya la escribes:
            //   document.cookie = `Datos=${dataCookie}; path=/;`
            //   localStorage.setItem('cookieDatos', response.cookieDatos ?? '');

            // Aviso cross-tab
            this.notify('token-updated');
          }
          return response;
        })
      );
  }

  /**
   * 🔹 Extraer el userId real desde el token JWT
   */
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(JSON.parse(token));
      if (decoded.sub) return Number(decoded.sub);
      console.warn('⚠️ No se encontró userId en el token');
      return null;
    } catch (e) {
      console.error('❌ Error decodificando token:', e);
      return null;
    }
  }

  /**
   * 🔹 Extraer nombre completo desde el token JWT
   */
  getFullNameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(JSON.parse(token));
      return `${decoded.given_name ?? ''} ${decoded.family_name ?? ''}`.trim();
    } catch (e) {
      console.error('❌ Error decodificando token:', e);
      return null;
    }
  }

  /**
   * 🔹 Cambiar contraseña por identidad
   */
  resetPasswordByIdentity(
    request: ResetPasswordByIdentityRequest
  ): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.apiIdentity}auth/UpdateUserPasswordByIdentity`;
    return this.http
      .put<BaseApiResponse<boolean>>(requestUrl, request, httpOptions)
      .pipe(map((response) => response));
  }

  /**
   * 🔹 Logout (sin recargar por defecto)
   */
  logout(shouldReload: boolean = false) {
    localStorage.removeItem('token');
    this.user.next('');

    // 👇 Mantén tu limpieza de cookies (exactamente como la tenías)
    document.cookie = "Datos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=web.laminaire.net;";
    document.cookie = "Datos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "DatosPretty=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=web.laminaire.net;";
    document.cookie = "DatosPretty=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem('cookieDatos');

    // Aviso cross-tab
    this.notify('logout');

    if (shouldReload) {
      window.location.reload();
    }
  }
}
