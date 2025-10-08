import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AlertService } from '@app/modules/core/services/alert.service';
import { ConsumptionService } from '../../services/consumption.service';
import { ConsumptionCreateRequest, ConsumptionUpdateRequest, ResourceType } from '../../models/consumption-request.interface';

@Component({
  standalone: true,
  selector: 'app-consumption-management',
  templateUrl: './consumption-management.component.html',
  styleUrls: ['./consumption-management.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatTooltipModule,
    NgxSpinnerModule
  ]
})
export class ConsumptionManagementComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ConsumptionService);
  private readonly alert = inject(AlertService);
  readonly dialogRef = inject(MatDialogRef<ConsumptionManagementComponent>);

  mode: 'create'|'update' = 'create';
  loading = false;
  form!: FormGroup;
  lockType = false;

  // Etiquetas y normalización de recurso
  private readonly RT_LABELS: Record<ResourceType, string> = {
    ENERGY: 'Energía',
    GAS: 'Gas',
    WATER: 'Agua'
  };
  private readonly CODE_FROM_ANY: Record<string, ResourceType> = {
    'ENERGY': 'ENERGY', 'GAS': 'GAS', 'WATER': 'WATER',
    'Energía': 'ENERGY', 'Energia': 'ENERGY', // por si llega sin tilde
    'Gas': 'GAS',
    'Agua': 'WATER'
  };
  resourceTypeCode: ResourceType | null = null;
  resourceLabel = 'Recurso';

  private normalizeResourceType(val?: any): ResourceType | null {
    if (!val) return null;
    const key = String(val);
    return this.CODE_FROM_ANY[key] ?? null;
  }
  private setResource(code: ResourceType | null) {
    this.resourceTypeCode = code;
    this.resourceLabel = code ? this.RT_LABELS[code] : 'Recurso';
  }

  unitOptions = [
    { label: 'Energía', options: [{ value: 'kWh', label: 'Kilovatios hora (kWh)' }, { value: 'MWh', label: 'Megavatios hora (MWh)' }] },
    { label: 'Gas',     options: [{ value: 'm³',  label: 'Metros cúbicos (m³)' },   { value: 'ft³', label: 'Pies cúbicos (ft³)' }] },
    { label: 'Agua',    options: [{ value: 'L',   label: 'Litros (L)' },            { value: 'm³',  label: 'Metros cúbicos (m³)' }] }
  ];

constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  this.mode = data?.mode ?? 'create';
  const detail = data?.detail;
  const presetType: ResourceType | undefined = data?.resourceType;

  // Normaliza recurso
  const initialCode = this.normalizeResourceType(detail?.resourceType ?? presetType ?? null);
  this.setResource(initialCode);

  // Calcula la unidad inicial
  const initialUnit = detail?.unit ?? this.defaultUnit(initialCode ?? undefined);

  // Form
  this.form = this.fb.group({
    consumptionId: [detail?.consumptionId ?? 0],
    resourceType:  [initialCode, Validators.required],
    value:         [detail?.value ?? null, [Validators.required, Validators.min(0)]],
    // 👇 Unidad fija, precargada
    unit:          [{ value: initialUnit, disabled: true }, Validators.required],
    readingDate:   [detail?.readingDate ? detail.readingDate.split('T')[0] : null],
    note:          [detail?.note ?? null],
    sede: [detail?.sede ?? null, Validators.required]

  });

  // Fecha requerida solo en create
  if (this.mode === 'create') {
    this.form.get('readingDate')?.addValidators(Validators.required);
    this.form.get('readingDate')?.updateValueAndValidity({ emitEvent: false });
  }

  // Si venimos de pestaña en create, bloquea tipo
  if (presetType && this.mode === 'create') {
    this.lockType = true;
    this.form.get('resourceType')?.disable();
  }

  // Si cambia recurso en create, actualiza unidad por defecto
  this.form.get('resourceType')?.valueChanges.subscribe((val: ResourceType | string) => {
    const norm = this.normalizeResourceType(val);
    this.setResource(norm);
    if (norm && this.mode === 'create') {
      this.form.get('unit')?.setValue(this.defaultUnit(norm), { emitEvent: false });
    }
  });
}

  private defaultUnit(t?: ResourceType) {
    if (t === 'ENERGY') return 'kWh';
    if (t === 'GAS') return 'm³';
    if (t === 'WATER') return 'm³';
    return 'kWh';
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;

    const raw = this.form.getRawValue();
    const base = {
      resourceType: raw.resourceType, // ya normalizado a código
      value: Number(raw.value),
      unit: raw.unit,
      readingDate: raw.readingDate ? new Date(raw.readingDate).toISOString() : null,
      note: raw.note ?? null,
      sede: raw.sede                   // 👈 NUEVO
    };

    const req$ = this.mode === 'create'
      ? this.service.create(base as ConsumptionCreateRequest)
      : this.service.update({ ...base, consumptionId: raw.consumptionId } as ConsumptionUpdateRequest);

    req$.subscribe({
      next: (r) => {
        r.isSuccess ? this.alert.success('Excelente', r.message) : this.alert.warn('Atención', r.message);
        if (r.isSuccess) this.dialogRef.close(true);
      },
      error: () => this.alert.error('Error', 'Operación fallida'),
      complete: () => this.loading = false
    });
  }
}
