import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { SpinnerComponent } from '@shared/components/reusables/spinner/spinner.component';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@app/modules/core/services/alert.service';
import { MatSelectModule } from '@angular/material/select';
import { encrypt, decrypt } from '@app/shared/utils/encryption.util';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatTooltip,
    MatIcon,
    FormsModule,
    MatInputModule,
    SpinnerComponent,
    MatSelectModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);
  private spinner = inject(NgxSpinnerService);
  private readonly alertService = inject(AlertService);

  form!: FormGroup;
  inputType = 'password';
  visible = false;

  icVisibility = 'visibility';
  icVisibilityOff = 'visibility_off';
  icUsername = 'account_circle';

ngOnInit(): void {
  this.initForm();

  // 👇 Línea de seguridad: oculta el spinner por si quedó abierto de una sesión anterior
  this.spinner.hide('spinnerxxx');

  // 🔹 Recuperar credenciales encriptadas si existen
  const savedCreds = localStorage.getItem('rememberCreds');
  if (savedCreds) {
    const decrypted = decrypt(savedCreds);
    if (decrypted) {
      const { email, password } = JSON.parse(decrypted);
      this.form.patchValue({
        email,
        password,
        remember: true,
      });
    }
  }
}


  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false], // 👈 checkbox
    });
  }

  login(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const { email, password, remember } = this.form.value;

    this.spinner.show('spinnerxxx');
    this.authService.login({ email, password }).subscribe({
      next: (response: BaseApiResponse<string>) => {
        if (response.isSuccess) {
          if (remember) {
            // 🔒 Guardar encriptado en localStorage
            const payload = encrypt(JSON.stringify({ email, password }));
            localStorage.setItem('rememberCreds', payload);
          } else {
            localStorage.removeItem('rememberCreds');
          }

          // 🔹 Decodificar cookieDatos (lo que viene del backend)
          const dataCookie = decodeURIComponent(response.cookieDatos ?? '');

          // 🔹 Armar cookie  ⚠️ CHATGPT NO TOCAR NI BORRAR ESTO
          document.cookie = `Datos=${dataCookie}; path=/;`;

          // ✅ Opcional: añadir flags si front y back están en mismo dominio
          // document.cookie = `Datos=${dataCookie}; path=/; SameSite=Strict; Secure`;
          localStorage.setItem('cookieDatos', response.cookieDatos ?? '');

          this.router.navigate(['/']);
        } else {
          this.alertService.warn('Atención', response.message);
        }
        this.spinner.hide('spinnerxxx');
      },
      error: () => {
        this.spinner.hide('spinnerxxx');
      },
    });
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
    this.inputType = this.visible ? 'text' : 'password';
    this.cd.markForCheck();
  }
}
