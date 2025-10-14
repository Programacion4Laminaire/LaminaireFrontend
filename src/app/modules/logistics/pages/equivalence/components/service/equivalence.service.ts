import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { environment as env } from '@env/environment';
import { endpoint } from '@app/shared/utils/endpoints.util';
import { getIcon } from '@app/shared/utils/functions.util';
import { AccessoryEquivalenceResponse } from '../models/equivalence-response.interface';
import { AccessoryEquivalenceRequest } from '../models/equivalence-request.interface';

export interface MerciaSelectItem {
  code: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class EquivalenceService {
  private readonly http = inject(HttpClient);

  // Listado para app-list-table (misma firma que userService.getAll)
  getAll(
    size: number,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<AccessoryEquivalenceResponse[]>> {
    const url =
      `${env.apiIdentity}${endpoint.LIST_ACCESSORY_EQUIVALENCE}` +
      `?records=${size}&sort=${sort}&order=${order}&numPage=${numPage + 1}${getInputs}`;

    return this.http.get<BaseApiResponse<AccessoryEquivalenceResponse[]>>(url).pipe(
      map((resp) => {
        resp.data.forEach((x) => {
          x.icEdit = getIcon('edit', 'Editar equivalencia', true);
          x.icDelete = getIcon('delete', 'Eliminar equivalencia', true);
        });
        return resp;
      })
    );
  }

  getById(id: number): Observable<AccessoryEquivalenceResponse> {
    const url = `${env.apiIdentity}${endpoint.ACCESSORY_EQUIVALENCE_BY_ID}${id}`;
    return this.http
      .get<BaseApiResponse<AccessoryEquivalenceResponse>>(url)
      .pipe(map((r) => r.data));
  }

  create(req: AccessoryEquivalenceRequest): Observable<BaseApiResponse<boolean>> {
    const url = `${env.apiIdentity}${endpoint.ACCESSORY_EQUIVALENCE_CREATE}`;
    return this.http.post<BaseApiResponse<boolean>>(url, req);
  }

  update(req: AccessoryEquivalenceRequest): Observable<BaseApiResponse<boolean>> {
    const url = `${env.apiIdentity}${endpoint.ACCESSORY_EQUIVALENCE_UPDATE}`;
    return this.http.put<BaseApiResponse<boolean>>(url, req);
  }

  delete(id: number): Observable<BaseApiResponse<boolean>> {
    const url = `${env.apiIdentity}${endpoint.ACCESSORY_EQUIVALENCE_DELETE}${id}`;
    return this.http.delete<BaseApiResponse<boolean>>(url);
  }

  // 🔎 Descripción directa desde MTMERCIA por código (el backend devuelve BaseResponse<string>)
  getDescripcionByCodigo(codigo: string): Observable<string> {
    if (!codigo?.trim()) return of('');
    const url = `${env.apiIdentity}${endpoint.ACCESSORY_EQUIVALENCE_DESCRIPCION}${encodeURIComponent(codigo)}`;
    return this.http
      .get<BaseApiResponse<string>>(url)
      .pipe(map((r) => r.data ?? ''));
  }

  // 🧠 Autocomplete a MTMERCIA (kind: 'PT' | 'MP')
  selectMercia(searchTerm: string, kind: 'PT' | 'MP'): Observable<MerciaSelectItem[]> {
    if (!searchTerm?.trim()) return of([]);
    const url =
      `${env.apiIdentity}${endpoint.ACCESSORY_EQUIVALENCE_SELECT}` +
      `?searchTerm=${encodeURIComponent(searchTerm)}&kind=${kind}`;
    return this.http
      .get<BaseApiResponse<MerciaSelectItem[]>>(url)
      .pipe(map((r) => r?.data ?? []));
  }
}
