// import { Injectable } from '@angular/core';
// import { environment } from '@env/environment';
// import { map, shareReplay } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';

// import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';// ajusta la ruta si es distinta
// import {
//   getCompanyIdentificationFromToken,
//   getCompanyNameFromToken,
//   getUserRoleFromToken,
//   JwtPayload
// } from '@shared/utils/token.util';

// @Injectable({ providedIn: 'root' })
// export class UserSessionService {
//   /** === Observables reactivos derivados del token === */
//   readonly userInfo$: Observable<JwtPayload | null>;
//   readonly companyIdentification$: Observable<string | null>;
//   readonly companyName$: Observable<string | null>;
//   readonly role$: Observable<string | null>;
//   readonly imageUrl$: Observable<string | null>;
//   readonly isLoggedIn$: Observable<boolean>;

//   constructor(private auth: AuthService) {
//     // Decodifica el JWT en cada cambio de token
//     this.userInfo$ = this.auth.token$.pipe(
//       map(token => (token ? this.safeDecode(token) : null)),
//       shareReplay(1)
//     );

//     this.companyIdentification$ = this.userInfo$.pipe(
//       map(ui => ui?.CompanyIdentification ?? null),
//       shareReplay(1)
//     );

//     this.companyName$ = this.userInfo$.pipe(
//       map(ui => ui?.CompanyName ?? null),
//       shareReplay(1)
//     );

//     this.role$ = this.userInfo$.pipe(
//       map(ui => ui?.Role ?? null),
//       shareReplay(1)
//     );

//     this.imageUrl$ = this.userInfo$.pipe(
//       map(ui => this.computeImageUrl(ui)),
//       shareReplay(1)
//     );

//     this.isLoggedIn$ = this.auth.token$.pipe(
//       map(token => !!token),
//       shareReplay(1)
//     );
//   }

//   /** === Getters sincrónicos (compatibilidad con tu código actual) === */
//   private getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   get companyIdentification(): string | null {
//     const token = this.getToken();
//     return token ? getCompanyIdentificationFromToken(token) : null;
//   }

//   get companyName(): string | null {
//     const token = this.getToken();
//     return token ? getCompanyNameFromToken(token) : null;
//   }

//   get role(): string | null {
//     const token = this.getToken();
//     return token ? getUserRoleFromToken(token) : null;
//   }

//   get userInfo(): JwtPayload | null {
//     const token = this.getToken();
//     return token ? this.safeDecode(token) : null;
//   }

//   get imageUrl(): string | null {
//     return this.computeImageUrl(this.userInfo);
//   }

//   get isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   /** Delegar logout al AuthService (sin reload) */
//   logout(): void {
//     this.auth.logout();
//   }

//   /** Helpers */
//   private safeDecode(token: string): JwtPayload | null {
//     try {
//       return jwtDecode<JwtPayload>(token);
//     } catch {
//       return null;
//     }
//   }

//   private computeImageUrl(userInfo: JwtPayload | null): string | null {
//     if (userInfo?.image_url) {
//       // El backend te envía "image_url" (ver tu código C#)
//       const baseUrl = environment.apiIdentity.replace(/\/api\/?$/, '');
//       return `${baseUrl}${userInfo.image_url}`;
//     }
//     return null;
//   }
// }
