import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AlertService } from '@app/modules/core/services/alert.service';
import { statesSelect } from '@app/shared/utils/global-constants.util';
import { UserService } from '../../services/user.service';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { environment } from '@env/environment';

import { of, switchMap, catchError, finalize, throwError } from 'rxjs';
import { LegacySirService } from '@app/modules/core/services/legacy-sir.service';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatDividerModule,
    NgxSpinnerModule,
  ],
})
export class UserManagementComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);
  private readonly legacySir = inject(LegacySirService);
  readonly dialogRef = inject(MatDialogRef<UserManagementComponent>);

  mode: 'create' | 'update' = 'create';
  loading = false;
  user!: FormGroup;

  imageFile: File | null = null;
  imagePreview: string = '/usuario.png';

  visible = false;
  inputType: 'password' | 'text' = 'password';
  icVisibility = 'visibility';
  icVisibilityOff = 'visibility_off';

  states = statesSelect.map(s => ({
    id: s.code,
    label: s.description,
  }));

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.mode = data?.mode ?? 'create';
    this.initForm(data?.userDetail);
  }

  private initForm(detail?: any): void {
    const formattedBirthDate = detail?.birthDate
      ? detail.birthDate.split('T')[0]
      : null;

    this.user = this.fb.group({
      userId: [detail?.userId ?? 0],
      firstName: [detail?.firstName ?? null, Validators.required],
      lastName: [detail?.lastName ?? null, Validators.required],
      userName: [detail?.userName ?? null, Validators.required],
      email: [detail?.email ?? null, [Validators.required, Validators.email]],
      password: [
        null,
        this.mode === 'create' ? Validators.required : [] // obligatorio en create, opcional en update
      ],
      identification: [detail?.identification ?? null, Validators.required],
      birthDate: [formattedBirthDate, Validators.required],
      state: [detail?.state ?? null, Validators.required],
    });

    // Si está en modo edición, mostrar la imagen del backend
    if (this.mode === 'update' && detail?.profileImagePath) {
      const apiBaseUrl = environment.apiIdentity.replace(/\/api\/?$/, '');
      this.imagePreview = `${apiBaseUrl}${detail.profileImagePath}`;
    }
  }

  setDefaultImage(event: Event): void {
    (event.target as HTMLImageElement).src = 'public/default-user.png';
  }

  passwordDisabled = this.mode === 'update'; // si quieres deshabilitar el input en update

  toggleVisibility(): void {
    this.visible = !this.visible;
    this.inputType = this.visible ? 'text' : 'password';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  save(): void {
    if (this.user.invalid) {
      this.user.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = new FormData();
    const rawValues = this.user.getRawValue();

    // Campos obligatorios
    formData.append('identification', rawValues.identification);
    formData.append('firstName', rawValues.firstName);
    formData.append('lastName', rawValues.lastName);
    formData.append('userName', rawValues.userName);
    formData.append('email', rawValues.email);
    formData.append('state', String(rawValues.state));

    // Contraseña (opcional en update)
    if (rawValues.password) {
      formData.append('password', rawValues.password);
    }

    // Fecha nacimiento (YYYY-MM-DD)
    const rawBirthDate = rawValues.birthDate;
    const formattedBirthDate =
      typeof rawBirthDate === 'string'
        ? rawBirthDate
        : new Date(rawBirthDate).toISOString().split('T')[0];

    formData.append('birthDate', formattedBirthDate);

    // Imagen
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    // Solo en update: incluir ID
    if (this.mode === 'update') {
      formData.append('userId', String(rawValues.userId));
    }

    // 🔍 DEBUG (opcional)
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: [File] name=${value.name}, size=${value.size} bytes`);
      } else {
        console.log(`${key}:`, value);
      }
    });

    // Petición principal (.NET Core)
    const request$ =
      this.mode === 'create'
        ? this.userService.userCreateWithImage(formData)
        : this.userService.userUpdateWithImage(formData);

    // ⇨ Si es UPDATE y hay password -> primero LEGACY (POST JSON sin auth), luego update normal
    const needsLegacy = this.mode === 'update' && !!rawValues.password;

    const flow$ = needsLegacy
      ? this.legacySir.updateCredentialsJson(rawValues.userName, rawValues.password).pipe(
          switchMap(ok => ok
            ? request$
            : throwError(() => new Error('No se pudo actualizar credenciales en el sistema legado.')))
        )
      : request$;

    flow$
      .pipe(
        catchError(err => {
          console.error('Error:', err);
          this.alertService.error('Error', err?.message ?? 'Operación fallida');
          return of(null);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((r: BaseApiResponse<boolean> | null) => {
        if (!r) return;
        r.isSuccess
          ? this.alertService.success('Excelente', r.message)
          : this.alertService.warn('Atención', r.message);

        if (r.isSuccess) {
          this.dialogRef.close(true);
        }
      });
  }

  toUpperCaseControl(controlName: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const control = this.user.get(controlName);
    if (control) {
      control.setValue(input.value.toUpperCase(), { emitEvent: false });
    }
  }
}
