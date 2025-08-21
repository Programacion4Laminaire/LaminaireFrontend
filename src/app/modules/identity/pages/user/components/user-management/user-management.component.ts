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

import { AlertService } from '@app/shared/services/alert.service';
import { statesSelect } from '@app/shared/utils/global-constants.util';
import { UserService } from '../../services/user.service';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { environment } from '@env/environment';
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
  this.mode === 'create' ? Validators.required : []
],


  identification: [detail?.identification ?? null, Validators.required],
  birthDate: [formattedBirthDate, Validators.required],
  state: [detail?.state ?? null, Validators.required],
});

// 👇 Desactiva el campo password si estás en modo 'update'
if (this.mode === 'update') {
  this.passwordDisabled = true;
  this.user.get('password')?.disable();
}


  // ✅ Si está en modo edición, mostrar la imagen cargada desde environment
  if (this.mode === 'update' && detail?.profileImagePath) {
    const apiBaseUrl = environment.apiIdentity.replace(/\/api\/?$/, '');
    this.imagePreview = `${apiBaseUrl}${detail.profileImagePath}`;
  }
}


setDefaultImage(event: Event): void {
  (event.target as HTMLImageElement).src = 'public/default-user.png';
}

passwordDisabled = this.mode === 'update'; // por defecto deshabilitado en edición


toggleVisibility(): void {
  this.visible = !this.visible;
  this.inputType = this.visible ? 'text' : 'password';

  if (this.mode === 'update') {
    const control = this.user.get('password');
    this.passwordDisabled = !this.passwordDisabled;

    if (this.passwordDisabled) {
      control?.disable();
    } else {
      control?.enable();
    }
  }
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

  // Fecha nacimiento (formato ISO válido para .NET)
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

  // 🔍 DEBUG (puedes quitar esto luego)
console.log('FormData contents:');
formData.forEach((value, key) => {
  if (value instanceof File) {
    console.log(`${key}: [File] name=${value.name}, size=${value.size} bytes`);
  } else {
    console.log(`${key}:`, value);
  }
});

  // Enviar al backend
  const request$ =
    this.mode === 'create'
      ? this.userService.userCreateWithImage(formData)
      : this.userService.userUpdateWithImage(formData);

  request$.subscribe({
    next: (r: BaseApiResponse<boolean>) => {
      r.isSuccess
        ? this.alertService.success('Excelente', r.message)
        : this.alertService.warn('Atención', r.message);

      if (r.isSuccess) {
        this.dialogRef.close(true);
      }
    },
    error: (err) => {
      console.error('Error en petición:', err);
      this.alertService.error('Error', 'Operación fallida');
    },
    complete: () => (this.loading = false),
  });
}



}
