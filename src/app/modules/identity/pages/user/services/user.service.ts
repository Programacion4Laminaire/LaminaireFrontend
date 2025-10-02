import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core'; // 👈 añadimos signal
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { AlertService } from '@app/modules/core/services/alert.service';
import { endpoint } from '@app/shared/utils/endpoints.util';
import { getIcon, getStateBadge } from '@app/shared/utils/functions.util';
import { environment as env } from '@env/environment';
import { map, Observable } from 'rxjs';
import {
  UserCreateRequest,
  UserUpdateRequest,
} from '../models/user-request.interface';
import {
  UserByIdResponse,
  UserResponse,
  UserWithRoleAndPermissionsResponse,
} from '../models/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly alertService = inject(AlertService);

  // 👇 NUEVO: Signal para mantener el usuario logueado en memoria reactiva
  currentUser = signal<UserWithRoleAndPermissionsResponse | null>(null);

  /** Setea el usuario completo */
  setUser(user: UserWithRoleAndPermissionsResponse) {
    this.currentUser.set(user);
  }

  /** Solo actualiza la foto de perfil */
  updateProfileImage(path: string) {
    const user = this.currentUser();
    if (user) {
      this.currentUser.set({
        ...user,
        profileImagePath: path,
      });
    }
  }

  // -------------------------------------------------
  // 🔽 Métodos que ya tenías (no se pierden) 🔽
  // -------------------------------------------------

  getAll(
    size: number,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<UserResponse[]>> {
    const requestUrl = `${env.apiIdentity}${
      endpoint.LIST_USERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<UserResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          resp.data.forEach((user: UserResponse) => {
            user.fullName = user.firstName + ' ' + user.lastName;
            user.stateDescription = getStateBadge(user.stateDescription);
            user.icEdit = getIcon('edit', 'Actualizar usuario', true);
            user.icDelete = getIcon('delete', 'Eliminar usuario', true);

            // Avatar auxiliar
            user.avatar = {
              text: '',
              image: user.profileImagePath || 'public/default-user.png',
            };
          });

          return resp;
        })
      );
  }

  userById(userId: number): Observable<UserByIdResponse> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_BY_ID}${userId}`;
    return this.httpClient
      .get<BaseApiResponse<UserByIdResponse>>(requestUrl)
      .pipe(map((resp) => resp.data));
  }

  userCreate(user: UserCreateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_CREATE}`;
    return this.httpClient.post<BaseApiResponse<boolean>>(requestUrl, user);
  }

  userCreateWithImage(formData: FormData): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_CREATE_WITH_IMAGE}`;
    return this.httpClient.post<BaseApiResponse<boolean>>(requestUrl, formData);
  }

  userUpdate(user: UserUpdateRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_UPDATE}`;
    return this.httpClient.put<BaseApiResponse<boolean>>(requestUrl, user);
  }

  userUpdateWithImage(formData: FormData): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_UPDATE_WITH_IMAGE}`;
    return this.httpClient.put<BaseApiResponse<boolean>>(requestUrl, formData);
  }

  userDelete(userId: number): Observable<void> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_DELETE}${userId}`;
    return this.httpClient.put<BaseApiResponse<boolean>>(requestUrl, '').pipe(
      map((resp: BaseApiResponse<boolean>) => {
        if (resp.isSuccess) {
          this.alertService.success('Excelente', resp.message);
        }
      })
    );
  }

  userWithRoleAndPermissions(
    userId: number
  ): Observable<UserWithRoleAndPermissionsResponse> {
    const requestUrl = `${env.apiIdentity}${endpoint.USER_WITH_ROLE_AND_PERMISSIONS}${userId}`;
    return this.httpClient
      .get<BaseApiResponse<UserWithRoleAndPermissionsResponse>>(requestUrl)
      .pipe(map((resp) => resp.data));
  }
}
