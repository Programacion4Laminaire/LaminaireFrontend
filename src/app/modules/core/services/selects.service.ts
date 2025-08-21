import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { map, Observable } from 'rxjs';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { SelectResponse } from '@app/shared/models/core/selects-response.interface';
import { endpoint } from '@app/shared/utils/endpoints.util';

@Injectable({
  providedIn: 'root',
})
export class SelectsService {
  private readonly httpClient = inject(HttpClient);

  listUserSelect(): Observable<SelectResponse[]> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_SELECT}`;
    return this.httpClient
      .get<BaseApiResponse<SelectResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          return resp.data;
        })
      );
  }

  listRoleSelect(): Observable<SelectResponse[]> {
    const requestUrl = `${env.apiIdentity}${endpoint.ROLE_SELECT}`;
    return this.httpClient
      .get<BaseApiResponse<SelectResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          return resp.data;
        })
      );
  }
}
