import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '@app/modules/identity/pages/user/services/user.service';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { AlertService } from '@app/modules/core/services/alert.service';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';
import { environment } from '@env/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  hidePassword = true;
  hideConfirmPassword = true;

  form!: FormGroup;
  loading = false;
  imageFile: File | null = null;
  imagePreview: string = 'public/default-user.png';

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        userId: [0],
        identification: ['', Validators.required],
        birthDate: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        confirmPassword: [''] // ✅ nuevo campo
      },
      {
        validators: (group: FormGroup) => {
          const pass = group.get('password')?.value;
          const confirm = group.get('confirmPassword')?.value;
          return pass === confirm ? null : { passwordMismatch: true };
        }
      }
    );

    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.userService.userById(userId).subscribe(user => {
        this.form.patchValue({
          userId: user.userId,
          identification: user.identification,
          birthDate: (user.birthDate || '').split('T')[0],
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email
        });

        this.imagePreview = user.profileImagePath
          ? `${environment.apiIdentity.replace('/api/', '')}${user.profileImagePath}`
          : 'public/default-user.png';
      });
    }
  }

  setDefaultImage(ev: Event): void {
    (ev.target as HTMLImageElement).src = 'public/default-user.png';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(this.imageFile);
    }
  }

  save(): void {
    if (!this.form || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const raw = this.form.getRawValue();

    const birth = typeof raw.birthDate === 'string'
      ? raw.birthDate
      : new Date(raw.birthDate).toISOString().substring(0, 10);

    const fd = new FormData();
    fd.append('userId', String(raw.userId));
    fd.append('identification', raw.identification ?? '');
    fd.append('firstName', raw.firstName ?? '');
    fd.append('lastName', raw.lastName ?? '');
    fd.append('userName', raw.userName ?? '');
    fd.append('email', raw.email ?? '');
    fd.append('birthDate', birth);
    fd.append('state', '1');

    if (raw.password) fd.append('password', raw.password);
    if (this.imageFile) fd.append('image', this.imageFile, this.imageFile.name);

    this.userService.userUpdateWithImage(fd).subscribe({
      next: (resp: BaseApiResponse<boolean>) => {
        if (resp.isSuccess) {
          this.alertService.success('Excelente', 'Perfil actualizado correctamente');
        } else {
          this.alertService.warn('Atención', resp.message);
        }
      },
      error: () => this.alertService.error('Error', 'No se pudo actualizar el perfil'),
      complete: () => (this.loading = false),
    });
  }

  resetForm(): void {
    this.form.reset();
  }
}
