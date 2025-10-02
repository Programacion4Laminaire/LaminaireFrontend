import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { endpoint } from '@app/shared/utils/endpoints.util';
import { environment as env } from '@env/environment';
import { getIcon } from '@app/shared/utils/functions.util';
import {
  ConsumptionCreateRequest,
  ConsumptionUpdateRequest
} from '../models/consumption-request.interface';
import {
  ConsumptionByIdResponse,
  ConsumptionResponse
} from '../models/consumption-response.interface';

@Injectable({ providedIn: 'root' })
export class ConsumptionService {
  private readonly http = inject(HttpClient);

  getAll(
    size: number,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<ConsumptionResponse[]>> {
    const url = `${env.apiIdentity}${endpoint.LIST_CONSUMPTIONS}?records=${size}&sort=${sort}&order=${order}&numPage=${numPage + 1}${getInputs}`;
    return this.http.get<BaseApiResponse<ConsumptionResponse[]>>(url).pipe(
      map(resp => {
        resp.data.forEach((c: ConsumptionResponse) => {
          c.icEdit = getIcon('edit', 'Actualizar consumo', true);
          c.icDelete = getIcon('delete', 'Eliminar consumo', true);
        });
        return resp;
      })
    );
  }

  byId(id: number): Observable<ConsumptionByIdResponse> {
    const url = `${env.apiIdentity}${endpoint.CONSUMPTION_BY_ID}${id}`;
    return this.http.get<BaseApiResponse<ConsumptionByIdResponse>>(url)
      .pipe(map(r => r.data));
  }

  create(req: ConsumptionCreateRequest): Observable<BaseApiResponse<boolean>> {
    const url = `${env.apiIdentity}${endpoint.CONSUMPTION_CREATE}`;
    return this.http.post<BaseApiResponse<boolean>>(url, req);
  }

  update(req: ConsumptionUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const url = `${env.apiIdentity}${endpoint.CONSUMPTION_UPDATE}`;
    return this.http.put<BaseApiResponse<boolean>>(url, req);
  }

  delete(id: number): Observable<void> {
    const url = `${env.apiIdentity}${endpoint.CONSUMPTION_DELETE}${id}`;
    return this.http.put<BaseApiResponse<boolean>>(url, '').pipe(map(() => {}));
  }
}
