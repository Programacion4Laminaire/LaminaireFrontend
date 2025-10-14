import { Component, Inject, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { EquivalenceService, MerciaSelectItem } from '../service/equivalence.service';
import { AlertService } from '@app/modules/core/services/alert.service';
import { BaseApiResponse } from '@app/shared/models/commons/base-api-response.interface';

import { of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, catchError, tap, map } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-equivalence-management',
  templateUrl: './equivalence-management.component.html',
  styleUrls: ['./equivalence-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule
  ],
})
export class EquivalenceManagementComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(EquivalenceService);
  private readonly alert = inject(AlertService);
  readonly dialogRef = inject(MatDialogRef<EquivalenceManagementComponent>);

  mode: 'create' | 'update' = 'create';
  form!: FormGroup;
  loading = false;

  // Autocomplete
  optionsPT$!: Observable<MerciaSelectItem[]>;
  optionsMP$!: Observable<MerciaSelectItem[]>;

  // Cache para recuperar descripción al seleccionar
  private lastPT: MerciaSelectItem[] = [];
  private lastMP: MerciaSelectItem[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.mode = data?.mode ?? 'create';
    this.initForm(data?.detail);
  }

  private initForm(detail?: any) {
    this.form = this.fb.group({
      id: [detail?.id ?? 0],

      // PT: solo dígitos, mínimo 15
      codigoPT: [
        detail?.codigoPT ?? '',
        [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(15)]
      ],
      descripcionPT: [detail?.descripcionPT ?? ''],

      // MP: exactamente 5 dígitos
      codigoMP: [
        detail?.codigoMP ?? '',
        [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(5), Validators.maxLength(5)]
      ],
      descripcionMP: [detail?.descripcionMP ?? ''],

      costo: [detail?.costo ?? 0, [Validators.required, Validators.min(0)]],
    });

    // PT: buscar desde 3 dígitos
    this.optionsPT$ = this.form.get('codigoPT')!.valueChanges.pipe(
      startWith(this.form.get('codigoPT')!.value ?? ''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => {
        const q = (term || '').replace(/\D+/g, '');
        return q.length >= 3
          ? this.service.selectMercia(q, 'PT').pipe(
              tap(list => (this.lastPT = list)),
              catchError(() => of([]))
            )
          : of([]);
      })
    );

    // MP: buscar desde 1 dígito
    this.optionsMP$ = this.form.get('codigoMP')!.valueChanges.pipe(
      startWith(this.form.get('codigoMP')!.value ?? ''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => {
        const q = (term || '').replace(/\D+/g, '');
        return q.length >= 1
          ? this.service.selectMercia(q, 'MP').pipe(
              tap(list => (this.lastMP = list)),
              catchError(() => of([]))
            )
          : of([]);
      })
    );
  }

  /** Normaliza a dígitos y limpia la descripción si el código queda vacío o inválido */
  onDigitsOnly(controlName: 'codigoPT' | 'codigoMP', event: Event) {
    const input = event.target as HTMLInputElement;
    let digits = (input.value || '').replace(/\D+/g, '');
    if (controlName === 'codigoMP') digits = digits.slice(0, 5);
    this.form.get(controlName)?.setValue(digits, { emitEvent: true });

    // limpiar descripción cuando no hay suficientes dígitos
    if (controlName === 'codigoPT') {
      if (!digits || digits.length < 15) this.form.get('descripcionPT')?.setValue('');
    } else {
      if (!digits || digits.length < 5) this.form.get('descripcionMP')?.setValue('');
    }
  }

  // Contadores
  get lenPT(): number { return String(this.form.get('codigoPT')?.value ?? '').length; }
  get lenMP(): number { return String(this.form.get('codigoMP')?.value ?? '').length; }

  // Selección – setea código + descripción desde el cache
  selectPT(ev: MatAutocompleteSelectedEvent) {
    const code = ev.option.value as string;
    const item = this.lastPT.find(x => x.code === code);
    this.form.patchValue({ codigoPT: code, descripcionPT: item?.description ?? '' }, { emitEvent: false });
  }

  selectMP(ev: MatAutocompleteSelectedEvent) {
    const code = ev.option.value as string;
    const item = this.lastMP.find(x => x.code === code);
    this.form.patchValue({ codigoMP: code, descripcionMP: item?.description ?? '' }, { emitEvent: false });
  }

  /** En blur: si inválido o vacío → limpiar descripción; si válido → consultar descripción */
  buscarDescripcion(campo: 'codigoPT' | 'codigoMP') {
    const codigo = String(this.form.get(campo)?.value ?? '');

    if (!codigo) {
      this.form.get(campo === 'codigoPT' ? 'descripcionPT' : 'descripcionMP')?.setValue('');
      return;
    }

    if (campo === 'codigoPT' && !/^\d{15,}$/.test(codigo)) {
      this.form.get('descripcionPT')?.setValue('');
      return;
    }
    if (campo === 'codigoMP' && !/^\d{5}$/.test(codigo)) {
      this.form.get('descripcionMP')?.setValue('');
      return;
    }

    this.service.getDescripcionByCodigo(codigo).subscribe((desc) => {
      if (campo === 'codigoPT') this.form.get('descripcionPT')?.setValue(desc ?? '');
      else this.form.get('descripcionMP')?.setValue(desc ?? '');
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload = {
      id: raw.id,
      codigoPT: raw.codigoPT,
      codigoMP: raw.codigoMP,
      costo: Number(raw.costo),
    };

    this.loading = true;
    const call$ = this.mode === 'create' ? this.service.create(payload) : this.service.update(payload);

    call$.pipe(
      catchError((err) => {
        console.error(err);
        this.alert.error('Error', err?.message ?? 'Operación fallida');
        return of({ isSuccess: false, message: 'Operación fallida' } as BaseApiResponse<boolean>);
      })
    )
    .subscribe((r) => {
      this.loading = false;
      if (r?.isSuccess) {
        this.alert.success('Excelente', r.message);
        this.dialogRef.close(true);
      } else {
        // ← aquí mostrará “ya existe la combinación” si tu handler lo retorna
        this.alert.warn('Atención', r?.message ?? 'No se pudo completar la operación');
      }
    });
  }

  // helper para errores en el template
  hasError(name: string, error: string) {
    const c = this.form.get(name);
    return !!(c && c.touched && c.hasError(error));
  }
}
