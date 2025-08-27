import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '@env/environment';
import { ProductResponse } from '../models/product-response.interface';
import { ProductUpdateRequest } from '../models/product-request.interface';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { SelectResponse } from '../models/select-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiIdentity}Product`;

  getByCode(code: string): Observable<BaseApiResponse<ProductResponse>> {
    return this.http.get<BaseApiResponse<ProductResponse>>(`${this.apiUrl}/${code}`);
  }

  getSelect(searchTerm: string): Observable<SelectResponse[]> {
    return this.http
      .get<BaseApiResponse<SelectResponse[]>>(`${this.apiUrl}/Select`, {
        params: { searchTerm }
      })
      .pipe(map(resp => resp.data || []));
  }

 updateProduct(request: ProductUpdateRequest): Observable<BaseApiResponse<boolean>> {
  return this.http.put<BaseApiResponse<boolean>>(`${this.apiUrl}/Update`, request);
}

}
