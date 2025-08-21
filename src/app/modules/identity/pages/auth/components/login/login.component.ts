import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { Router } from '@angular/router';
import { SpinnerComponent } from '@shared/components/reusables/spinner/spinner.component';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@app/modules/core/services/alert.service';

import { MatSelectModule } from "@angular/material/select";


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
    MatSelectModule
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

  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

login(): void {
  if (this.form.invalid) {
    return Object.values(this.form.controls).forEach((controls) => {
      controls.markAllAsTouched();
    });
  }

  this.spinner.show('spinnerxxx');
  this.authService.login(this.form.value).subscribe({
    next: (response: BaseApiResponse<string>) => {
      if (response.isSuccess) {
        const username = this.form.get('email')?.value;

        // Expira en 10 años
        const date = new Date();
        date.setFullYear(date.getFullYear() + 10);
        const expires = "expires=" + date.toUTCString();

        // Crear cookie explícita con dominio fijo
        document.cookie = `Datos=wCodUsuario=${username}; ${expires}; domain=web.laminaire.net; path=/;`;

        this.router.navigate(['/']);
      } else {
        this.alertService.warn('Atención', response.message);
      }
      this.spinner.hide('spinnerxxx');
    },
    error: (err: any) => {
      this.spinner.hide('spinnerxxx');
      this.alertService.error('Error', 'Ocurrió un problema, intente de nuevo.');
    }
  });
}


  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
