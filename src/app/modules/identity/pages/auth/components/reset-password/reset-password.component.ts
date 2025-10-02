import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { RouterModule, Router } from '@angular/router';
import { NgxSpinnerService }  from 'ngx-spinner';

import { AuthService } from '../../services/auth.service';
import { ResetPasswordByIdentityRequest } from '../../models/reset-password.interface';
import { AlertService } from '@app/modules/core/services/alert.service';
import { SpinnerComponent } from '@shared/components/reusables/spinner/spinner.component';

// 👉 NUEVO: servicio que llama al legacy
import { LegacySirService } from '@app/modules/core/services/legacy-sir.service';

// RxJS
import { switchMap, catchError, finalize, throwError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    SpinnerComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private fb      = inject(FormBuilder);
  private auth    = inject(AuthService);
  private router  = inject(Router);
  private cd      = inject(ChangeDetectorRef);
  private spinner = inject(NgxSpinnerService);
  private alert   = inject(AlertService);
  private legacy  = inject(LegacySirService); // 👈 inyectamos el legacy

  form!: FormGroup;
  inputType = 'password';
  visible   = false;

  icUser    = 'badge';
  icVis     = 'visibility';
  icVisOff  = 'visibility_off';

  ngOnInit(): void {
    this.form = this.fb.group({
      identification: ['', Validators.required],
      userName:       ['', Validators.required],
      birthDate:      ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.matchPasswords });
  }

  private matchPasswords(group: FormGroup) {
    const p = group.get('newPassword')!.value;
    const c = group.get('confirmPassword')!.value;
    return p === c ? null : { mismatch: true };
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.inputType = this.visible ? 'text' : 'password';
    this.cd.markForCheck();
  }

  resetPassword() {
    if (this.form.invalid || this.form.hasError('mismatch')) {
      this.form.markAllAsTouched();
      return;
    }

    // payload para tu API
    const rawBirth = this.form.value.birthDate;
    const formattedBirth = rawBirth
      ? new Date(rawBirth).toISOString().substring(0, 10)
      : '';

    const req: ResetPasswordByIdentityRequest = {
      identification: this.form.value.identification,
      userName:       this.form.value.userName,
      birthDate:      formattedBirth,
      newPassword:    this.form.value.newPassword,
    };

    // 1) primero LEGACY (POST JSON {User, Password} sin credenciales)
    // 2) si 2xx → continúa con reset en tu API
    const user = this.form.value.userName;
    const pwd  = this.form.value.newPassword;

    this.spinner.show('spinnerxxx');

    this.legacy.updatePassword(user, pwd).pipe(
      switchMap(ok => {
        if (!ok) {
          return throwError(() => new Error('No se pudo actualizar la contraseña en el sistema legado.'));
        }
        return this.auth.resetPasswordByIdentity(req);
      }),
      catchError(err => {
        console.error('Reset error:', err);
        this.alert.error('Error', err?.message ?? 'No se pudo actualizar la contraseña.');
        return of(null);
      }),
      finalize(() => this.spinner.hide('spinnerxxx'))
    ).subscribe(res => {
      if (!res) return; // ya se notificó error

      if (res.isSuccess) {
        this.alert.success('Éxito', res.message);
        this.router.navigate(['/login']);
      } else {
        this.alert.warn('Atención', res.message);
      }
    });
  }
}
