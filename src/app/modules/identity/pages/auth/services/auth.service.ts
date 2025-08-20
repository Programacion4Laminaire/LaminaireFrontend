import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { httpOptions } from '@app/shared/utils/global-constants.util';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment as env } from '@env/environment';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { endpoint } from '@app/shared/utils/endpoints.util';
import { LoginRequest } from '../models/login-request.interface';
import { ResetPasswordByIdentityRequest } from '../models/reset-password.interface';

@Injectable({
  providedIn: 'root',
})
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

  login(request: LoginRequest): Observable<BaseApiResponse<string>> {
    const requestUrl = `${env.apiIdentity}${endpoint.LOGIN}`;
    return this.http
      .post<BaseApiResponse<string>>(requestUrl, request, httpOptions)
      .pipe(
        map((response: BaseApiResponse<string>) => {
          if (response.isSuccess) {
            localStorage.setItem('token', JSON.stringify(response.accessToken));
            this.user.next(response.accessToken);
          }
          return response;
        })
      );
  }

  resetPasswordByIdentity(
    request: ResetPasswordByIdentityRequest
  ): Observable<BaseApiResponse<boolean>> {
    // Usa el mismo base URL y el path de tu controlador
    const requestUrl = `${env.apiIdentity}auth/UpdateUserPasswordByIdentity`;
    return this.http
      .put<BaseApiResponse<boolean>>(requestUrl, request, httpOptions)
      .pipe(
        map((response) => {
          // No guardamos token aquí, solo devolvemos la respuesta
          return response;
        })
      );
  }


  logout() {
    localStorage.removeItem('token');
    this.user.next('');
    window.location.reload();
  }
}
