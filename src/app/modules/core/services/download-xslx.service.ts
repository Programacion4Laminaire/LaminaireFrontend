
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DownloadXslxService {
  private readonly http = inject(HttpClient);

  executeDownload(endpoint: string): Observable<Blob> {
    const url = `${env.apiIdentity}${endpoint}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
