import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, debounceTime, distinctUntilChanged, switchMap, of, merge } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ProductResponse } from '../models/product-response.interface';
import { SelectResponse } from '../models/select-response.interface';
import { ProductUpdateRequest } from '../models/product-request.interface';
import { AlertService } from '@app/modules/core/services/alert.service';
import { NumberFormatDirective } from '@app/shared/directives/number-format.directive';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    NumberFormatDirective
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly alertService = inject(AlertService);

  form: FormGroup = this.fb.group({
    code: ['', Validators.required],
    productName: [''],
    sublineCode: ['', Validators.required],
    sublineName: [''],
    cost: [0, [Validators.required, Validators.min(0.00)]],
    exchangeRate: [0],
    margin: [70, [Validators.required, Validators.min(55), Validators.max(70)]],
    salePriceCop: [0],
    salePriceUsd: [0],
    multiplier: [0, Validators.required],
    distributorMultiplier: [0, Validators.required],
    basePriceUsd: [0, Validators.required]
  });

  filteredCodes$!: Observable<SelectResponse[]>;
  filteredNames$!: Observable<SelectResponse[]>;

  ngOnInit() {
    this.filteredCodes$ = this.form.get('code')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => value ? this.productService.getSelect(value) : of([]))
    );

    this.filteredNames$ = this.form.get('productName')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => value ? this.productService.getSelect(value) : of([]))
    );

    this.setupLiveCalc();
  }

  private round2(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  private setupLiveCalc() {
    const cost$ = this.form.get('cost')!.valueChanges;
    const mult$ = this.form.get('multiplier')!.valueChanges;
    const margin$ = this.form.get('margin')!.valueChanges;

    merge(cost$, mult$, margin$).subscribe(() => this.recomputeDerived(true));
    this.form.get('exchangeRate')!.valueChanges.subscribe(() => this.recomputeDerived(false));
  }

private recomputeDerived(recalcBaseUsd: boolean) {
  const marginPercent = Number(this.form.get('margin')!.value) || 70;
  const margin = marginPercent / 100;
  const ONE_MINUS = 1 - margin;

  const cost = Number(this.form.get('cost')!.value) || 0;
  const tc = Number(this.form.get('exchangeRate')!.value) || 0;
  const mult = Number(this.form.get('multiplier')!.value) || 0;

  // Valor actual en el form (puede venir de BD o manual)
  let baseUsd = this.form.get('basePriceUsd')!.value;

  let saleCop = 0, saleUsd = 0;

  if (cost === 0) {
    // ⚡ Caso especial: costo en 0
    saleCop = 0;
    saleUsd = 0;

    // Solo poner baseUsd en 0 si el usuario está editando (no si viene de BD)
    if (recalcBaseUsd) {
      baseUsd = 0;
    }
  } else {
    if (ONE_MINUS > 0) {
      saleCop = this.round2(cost / ONE_MINUS);
    }
    if (saleCop > 0 && tc > 0) {
      saleUsd = this.round2(saleCop / tc);
    }
    if (recalcBaseUsd && saleUsd > 0 && mult > 0) {
      baseUsd = this.round2(saleUsd / mult);
    }
  }

  this.form.patchValue({
    salePriceCop: saleCop,
    salePriceUsd: saleUsd,
    basePriceUsd: baseUsd
  }, { emitEvent: false });
}

  validateMargin() {
    const margin = Number(this.form.get('margin')!.value);
    if (margin < 55 || margin > 70) {
      Swal.fire({
        icon: 'warning',
        title: 'Margen fuera de rango',
        text: `Colocaste ${margin}%. El rango permitido es entre 55% y 70%.`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
    }
  }

  onSelectProduct(code: string) {
    if (!code) return;
    this.searchProduct(code);
  }

  searchProduct(code: string) {
    this.clearForm();
    this.productService.getByCode(code).subscribe(resp => {
      if (resp.isSuccess && resp.data) {
        this.fillForm(resp.data);
      } else {
        this.alertService.warn('Atención', resp.message || 'Producto no encontrado');
      }
    });
  }

 private fillForm(product: ProductResponse) {
  this.form.patchValue({
    ...product,
    margin: this.round2(product.margin * 100) // % en vez de fracción
  }, { emitEvent: false });

  // ⚡ Forzar formateo visual en inputs
  const costInput = document.querySelector<HTMLInputElement>('input[formcontrolname="cost"]');
  if (costInput) {
    costInput.value = Number(product.cost).toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  const saleCopInput = document.querySelector<HTMLInputElement>('input[formcontrolname="salePriceCop"]');
  if (saleCopInput) {
    saleCopInput.value = Number(product.salePriceCop).toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // 👀 Importante: NO recalcular baseUsd si viene de BD
  this.recomputeDerived(false);
}
  save() {
    if (this.form.invalid) {
      this.alertService.warn('Atención', 'El formulario contiene errores.');
      return;
    }

    const raw = this.form.getRawValue();
    const payload: ProductUpdateRequest = {
      code: raw.code,
      sublineCode: raw.sublineCode,
      cost: raw.cost,
      multiplier: raw.multiplier,
      distributorMultiplier: raw.distributorMultiplier,
      margin: raw.margin / 100,
      basePriceUsd: Number(raw.basePriceUsd) || 0
    };

    Swal.fire({
      title: '¿Guardar cambios?',
      html: `
        <table style="width:100%;text-align:left">
          <tr><td><b>Código:</b></td><td>${payload.code}</td></tr>
          <tr><td><b>Sublinea:</b></td><td>${payload.sublineCode}</td></tr>
          <tr><td><b>Costo:</b></td><td>${payload.cost}</td></tr>
          <tr><td><b>Margen:</b></td><td>${raw.margin}%</td></tr>
          <tr><td><b>Multiplicador:</b></td><td>${payload.multiplier}</td></tr>
          <tr><td><b>Multiplicador Distribuidor:</b></td><td>${payload.distributorMultiplier}</td></tr>
          <tr><td><b>Precio Base USD:</b></td><td>${payload.basePriceUsd}</td></tr>
        </table>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      confirmButtonColor: '#0c5192ff',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.updateProduct(payload).subscribe({
          next: (resp) => {
            if (resp.isSuccess) {
              Swal.fire('Excelente', resp.message || 'Producto actualizado correctamente', 'success');
              this.productService.getByCode(payload.code).subscribe(r => {
                if (r.isSuccess && r.data) {
                  this.fillForm(r.data);
                }
              });
            } else {
              Swal.fire('Atención', resp.message || 'No se pudo actualizar el producto', 'warning');
            }
          },
          error: () => {
            Swal.fire('Error', 'Ocurrió un problema al actualizar el producto', 'error');
          }
        });
      }
    });
  }

  clearForm() {
    this.form.reset({
      code: '',
      productName: '',
      sublineCode: '',
      sublineName: '',
      cost: 0,
      exchangeRate: 0,
      margin: 70,
      salePriceCop: 0,
      salePriceUsd: 0,
      multiplier: 0,
      distributorMultiplier: 0,
      basePriceUsd: 0
    });
  }
}
