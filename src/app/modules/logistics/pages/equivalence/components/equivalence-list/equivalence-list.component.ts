import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ExportExcelComponent } from '@app/shared/components/reusables/export-excel/export-excel.component';
import { GenericButtonComponent } from '@app/shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '@app/shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '@app/shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '@app/shared/components/reusables/split-button/split-button.component';
import { RowClick } from '@app/shared/models/reusables/rowclick-interface';
import { SearchBox } from '@app/shared/models/reusables/search-options.interface';
import { Actions } from '@app/shared/models/reusables/split-button.interface';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import Swal from 'sweetalert2';

import { EquivalenceService } from '../service/equivalence.service';
import { AccessoryEquivalenceResponse } from '../models/equivalence-response.interface';
import { EquivalenceManagementComponent } from '../equivalence-management/equivalence-management.component';
import { componentEquivalenceSetting } from './equivalence-list-config';

@Component({
  selector: 'app-equivalence-list',
  standalone: true,
  imports: [
    MatIcon,
    GenericButtonComponent,
    SearchBoxComponent,
    ExportExcelComponent,
    SplitButtonComponent,
    ListTableComponent,
  ],
  templateUrl: './equivalence-list.component.html',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class EquivalenceListComponent {
  public readonly service = inject(EquivalenceService);
  public readonly dialog = inject(MatDialog);

  icon$ = 'compare_arrows';
  component$: any = componentEquivalenceSetting;

  ngOnInit(): void {
    this.formatGetInputs();
  }

  private formatGetInputs() {
    let str = '';

    if (this.component$.filters.textFilter != null) {
      str += `&numFilter=${this.component$.filters.numFilter}` +
             `&textFilter=${encodeURIComponent(this.component$.filters.textFilter)}`;
    }

    if (this.component$.filters.refresh === true) {
      const random = Math.random();
      str += `&refresh=${random}`;
      this.component$.filters.refresh = false;
    }

    this.component$.getInputs = str;
  }

  search(data: SearchBox) {
    this.component$.filters.numFilter = data.searchValue;
    this.component$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.component$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.component$.filters = { ...this.component$.initFilters };
        this.formatGetInputs();
        break;
    }
  }

  newEquivalence() {
    this.dialog
      .open(EquivalenceManagementComponent, {
        disableClose: true,
        width: '900px',
        maxWidth: '95vw',
        enterAnimationDuration: 250,
        exitAnimationDuration: 250,
        data: { mode: 'create' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.component$.filters.refresh = true;
          this.formatGetInputs();
        }
      });
  }

  rowClick(rowClick: RowClick<AccessoryEquivalenceResponse>) {
    const action = rowClick.action;
    const row = rowClick.row;

    switch (action) {
      case 'edit':
        this.edit(row);
        break;
      case 'delete':
        this.remove(row);
        break;
    }
  }

  edit(row: AccessoryEquivalenceResponse) {
    this.dialog.open(EquivalenceManagementComponent, {
      disableClose: true,
      width: '900px',
      maxWidth: '95vw',
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      data: { mode: 'update', detail: row },
    }).afterClosed().subscribe(res => {
      if (res) {
        this.component$.filters.refresh = true;
        this.formatGetInputs();
      }
    });
  }

  remove(row: AccessoryEquivalenceResponse) {
    Swal.fire({
      title: 'Eliminar equivalencia',
      text: `¿Deseas eliminar la equivalencia del código PT ${row.codigoPT}?`,
      icon: 'question',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#004A89',
      cancelButtonColor: '#a80b3bff',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(row.id).subscribe(() => {
          this.component$.filters.refresh = true;
          this.formatGetInputs();
        });
      }
    });
  }

  get getDownloadUrl() {
    return `AccessoryEquivalence?sort=Id&download=true`;
  }
}
