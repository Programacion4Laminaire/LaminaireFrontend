import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ProductResponse } from '../models/product-response.interface';
import { SelectResponse } from '../models/select-response.interface';
import { ProductUpdateRequest } from '../models/product-request.interface';
import { AlertService } from '@app/modules/core/services/alert.service';

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
    MatAutocompleteModule
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
    cost: [0, [Validators.required, Validators.min(0.01)]],
    exchangeRate: [0],
    margin: [0],
    salePriceCop: [0],
    salePriceUsd: [0],
    multiplier: [0, Validators.required],
    distributorMultiplier: [0, Validators.required],
    basePriceUsd: ['', Validators.required],
  });

  filteredCodes$!: Observable<SelectResponse[]>;
  filteredNames$!: Observable<SelectResponse[]>;

  ngOnInit() {
    // 🔹 Autocomplete por código
    this.filteredCodes$ = this.form.get('code')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => value ? this.productService.getSelect(value) : of([]))
    );

    // 🔹 Autocomplete por nombre
    this.filteredNames$ = this.form.get('productName')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => value ? this.productService.getSelect(value) : of([]))
    );
  }

  onSelectProduct(code: string) {
    if (!code) return;
    this.searchProduct(code);
  }

  searchProduct(code: string) {
    this.productService.getByCode(code).subscribe(resp => {
      if (resp.isSuccess && resp.data) {
        this.fillForm(resp.data);
      } else {
        this.alertService.warn('Atención', resp.message || 'Producto no encontrado');
      }
    });
  }

  private fillForm(product: ProductResponse) {
    this.form.patchValue(product);
  }

  save() {
    if (this.form.invalid) {
      this.alertService.warn('Atención', 'El formulario contiene errores.');
      return;
    }

    const payload: ProductUpdateRequest = {
      code: this.form.getRawValue().code,
      sublineCode: this.form.getRawValue().sublineCode,
      cost: this.form.getRawValue().cost,
      multiplier: this.form.getRawValue().multiplier,
      distributorMultiplier: this.form.getRawValue().distributorMultiplier,
    };

    // 🔹 SweetAlert con confirmación elegante
    Swal.fire({
      title: '¿Guardar cambios?',
      html: `
        <table style="width:100%;text-align:left">
          <tr><td><b>Código:</b></td><td>${payload.code}</td></tr>
          <tr><td><b>Sublinea:</b></td><td>${payload.sublineCode}</td></tr>
          <tr><td><b>Costo:</b></td><td>${payload.cost}</td></tr>
          <tr><td><b>Multiplicador:</b></td><td>${payload.multiplier}</td></tr>
          <tr><td><b>Multiplicador Distribuidor:</b></td><td>${payload.distributorMultiplier}</td></tr>
        </table>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      draggable: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.updateProduct(payload).subscribe({
          next: (resp) => {
            if (resp.isSuccess) {
              Swal.fire('Excelente', resp.message || 'Producto actualizado correctamente', 'success');

              // 🔄 Refrescar datos después de guardar
              this.productService.getByCode(payload.code).subscribe(r => {
                if (r.isSuccess && r.data) {
                  this.fillForm(r.data);
                }
              });

            } else {
              Swal.fire('Atención', resp.message || 'No se pudo actualizar el producto', 'warning');
            }
          },
          error: (err) => {
            console.error('Error en update:', err);
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
      margin: 0,
      salePriceCop: 0,
      salePriceUsd: 0,
      multiplier: 0,
      distributorMultiplier: 0,
      basePriceUsd: '',
    });
  }
}
