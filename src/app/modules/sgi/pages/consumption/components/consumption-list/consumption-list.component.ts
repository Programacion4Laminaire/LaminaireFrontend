import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatTooltipModule }   from '@angular/material/tooltip';

import { ExportExcelComponent } from '@app/shared/components/reusables/export-excel/export-excel.component';
import { GenericButtonComponent } from '@app/shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '@app/shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '@app/shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '@app/shared/components/reusables/split-button/split-button.component';

import { RowClick } from '@app/shared/models/reusables/rowclick-interface';
import { SearchBox } from '@app/shared/models/reusables/search-options.interface';
import { Actions } from '@app/shared/models/reusables/split-button.interface';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { ConsumptionService } from '../../services/consumption.service';
import { ConsumptionResponse } from '../../models/consumption-response.interface';
import { ResourceType } from '../../models/consumption-request.interface';
import { componentConsumptionSetting, tabMeta } from './consumption-list-config';
import { ConsumptionManagementComponent } from '../consumption-management/consumption-management.component';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-consumption-list',
  standalone: true,
  imports: [
    MatIconModule, MatTabsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule,
    GenericButtonComponent, SearchBoxComponent, ExportExcelComponent,
    SplitButtonComponent, ListTableComponent,CommonModule
  ],
  templateUrl: './consumption-list.component.html',
  animations: [scaleIn400ms, fadeInRight400ms]
})
export class ConsumptionListComponent {
  public readonly consumptionService = inject(ConsumptionService);
  public readonly dialog = inject(MatDialog);

  component$: any;
  resetChecks = false;

  // límites de año
  readonly MIN_YEAR = 2000;
  readonly MAX_YEAR = 2100;
  readonly minDate = `${this.MIN_YEAR}-01-01`;
  readonly maxDate = `${this.MAX_YEAR}-12-31`;

  dateError = ''; // mensaje para mostrar y evitar query

  currentTab: ResourceType = 'ENERGY';
  get currentLabel() { return tabMeta[this.currentTab].label; }
  get currentIcon()  { return tabMeta[this.currentTab].icon; }

  ngOnInit(): void {
    this.component$ = { ...componentConsumptionSetting };
    this.component$.filters.resourceType = this.currentTab;
    this.formatGetInputs();
  }

  onTabChange(index: number) {
    this.currentTab = (['ENERGY', 'GAS', 'WATER'][index] as ResourceType);
    this.component$.filters.resourceType = this.currentTab;
    this.initFilterReset(false);
  }

  private markRefresh() { this.component$.filters.refresh = true; }

  // ---------- VALIDACIONES DE FECHA ----------
  private sanitizeDate(val: string): string {
    // Acepta solo YYYY-MM-DD y que el año tenga 4 dígitos
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val ?? '');
    if (!m) return '';
    const y = +m[1], mo = +m[2], d = +m[3];
    if (m[1].length !== 4) return '';
    if (y < this.MIN_YEAR || y > this.MAX_YEAR) return '';
    // Validar fecha real
    const dt = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`);
    if (Number.isNaN(dt.getTime())) return '';
    // Mes 1-12 y día razonable (por si el browser deja algo inválido)
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return '';
    return `${m[1]}-${m[2]}-${m[3]}`;
  }

  // Evita más de 4 dígitos en el año mientras escriben (algunos navegadores lo permiten)
  enforceYearLength(ev: Event) {
    const el = ev.target as HTMLInputElement;
    const v = el.value ?? '';
    const dash = v.indexOf('-');
    if (dash > 4) {
      el.value = v.slice(0, 4) + v.slice(dash);
    } else if (dash === -1 && v.length > 4) {
      el.value = v.slice(0, 4);
    }
  }

private validateRange() {
  const s = this.component$.filters.startReadingDate;
  const e = this.component$.filters.endReadingDate;

  if (s && e) {
    const sD = new Date(`${s}T00:00:00`);
    const eD = new Date(`${e}T00:00:00`);

    if (sD > eD) {
      Swal.fire({
        icon: 'warning',
        title: 'Rango inválido',
        text: 'La fecha "Desde" no puede ser mayor que la fecha "Hasta".',
        confirmButtonColor: '#004A89'
      });

      // limpiar fechas en filtros
      this.component$.filters.endReadingDate = '';
      this.component$.filters.startReadingDate = '';
    

      // refrescar bindings de inputs
      this.formatGetInputs();
    }
  }
}

  // ------------------------------------------

  formatGetInputs() {
    this.validateRange();

    let str = '';

    // Búsqueda por texto (nota)
    if (this.component$.filters.textFilter != null) {
      str += `&numFilter=${this.component$.filters.numFilter}&textFilter=${encodeURIComponent(this.component$.filters.textFilter)}`;
    }

    // Tipo de recurso
    if (this.component$.filters.resourceType) {
      str += `&resourceType=${this.component$.filters.resourceType}`;
    }

    // Rango de fechas (solo si válido y completo)
    const s = this.component$.filters.startReadingDate;
    const e = this.component$.filters.endReadingDate;
    if (!this.dateError && s && e) {
      const sD = new Date(s);
      const eD = new Date(e);
      const [start, end] = eD < sD ? [e, s] : [s, e];
      str += `&startReadingDate=${start}&endReadingDate=${end}`;
    }

    // Refresh anti-cache
    if (this.component$.filters.refresh === true) {
      const rnd = Math.random();
      str += `&refresh=${rnd}`;
      this.component$.filters.refresh = false;
    }

    this.component$.getInputs = str;
  }

  // Search por notas
  search(data: SearchBox) {
    this.component$.filters.numFilter = data.searchValue;
    this.component$.filters.textFilter = data.searchData;
    this.markRefresh();
    this.formatGetInputs();
  }

  // Cambios en fechas
  startDateChange(ev: Event) {
    const val = (ev.target as HTMLInputElement).value || '';
    this.component$.filters.startReadingDate = this.sanitizeDate(val);
    this.markRefresh();
    this.formatGetInputs();
  }

  endDateChange(ev: Event) {
    const val = (ev.target as HTMLInputElement).value || '';
    this.component$.filters.endReadingDate = this.sanitizeDate(val);
    this.markRefresh();
    this.formatGetInputs();
  }

  clearDateRange() {
    this.component$.filters.startReadingDate = '';
    this.component$.filters.endReadingDate = '';
    this.dateError = '';
    this.markRefresh();
    this.formatGetInputs();
  }

  initFilterReset(resetType: boolean = true) {
    this.component$.filters = {
      ...this.component$.initFilters,
      resourceType: this.currentTab
    };
    this.dateError = '';
    if (!resetType) { /* no-op */ }
    this.formatGetInputs();
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.component$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  newRecord() {
    this.dialog.open(ConsumptionManagementComponent, {
      disableClose: true,
      width: '1000px',
      maxWidth: '95vw',
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      data: { mode: 'create', resourceType: this.currentTab }
    }).afterClosed().subscribe(res => { if (res) this.triggerRefresh(); });
  }

  async editRecord(row: ConsumptionResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    const detail = await firstValueFrom(this.consumptionService.byId(row.consumptionId));

    this.dialog.open(ConsumptionManagementComponent, {
      data: { mode: 'update', detail },
      disableClose: true,
      width: '1000px',
      maxWidth: '95vw',
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    }).afterClosed().subscribe(res => { if (res) this.triggerRefresh(); });
  }

  deleteRecord(row: ConsumptionResponse) {
    const dateStr = row.readingDate?.split('T')[0] ?? '';
    Swal.fire({
      title: 'Eliminar registro',
      text: `¿Deseas eliminar el consumo de ${dateStr} (${row.resourceType})?`,
      icon: 'question',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#004A89',
      cancelButtonColor: '#a80b3bff',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      width: 430,
    }).then(result => {
      if (result.isConfirmed) {
        this.consumptionService.delete(row.consumptionId).subscribe(() => this.triggerRefresh());
      }
    });
  }

  rowClick(e: RowClick<ConsumptionResponse>) {
    if (e.action === 'edit') this.editRecord(e.row);
    if (e.action === 'delete') this.deleteRecord(e.row);
  }

  triggerRefresh() {
    this.component$.filters.refresh = true;
    this.formatGetInputs();
  }
// Dentro de ConsumptionListComponent

get hasAnyRange(): boolean {
  const s = this.component$.filters.startReadingDate;
  const e = this.component$.filters.endReadingDate;
  return !!s || !!e;
}

get hasValidRange(): boolean {
  const s = this.component$.filters.startReadingDate;
  const e = this.component$.filters.endReadingDate;

  if (!s && !e) return false;          // no puso nada
  if (!s || !e) return false;          // uno vacío
  // si tienes dateError por tu validateRange, lo respetamos
  return !this.dateError;              // true solo si no hay error
}

get showTable(): boolean {
  // regla: mostrar tabla solo si hay rango y es válido
  return this.hasValidRange;
}

get exportFilename() {
  return `consumos-${this.currentLabel.toLowerCase()}`;
}

  
  get getDownloadUrl() {
    return `Consumption/Export?sort=readingDate&order=desc`;
  }
}
