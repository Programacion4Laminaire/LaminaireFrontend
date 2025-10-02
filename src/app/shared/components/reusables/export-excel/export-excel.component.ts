import { Component, Input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DownloadXslxService } from '@app/modules/core/services/download-xslx.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-export-excel',
  imports: [MatIcon, MatTooltip],
  templateUrl: './export-excel.component.html',
})
export class ExportExcelComponent {
  private readonly downloadXslxService = inject(DownloadXslxService);
  private readonly spinner = inject(NgxSpinnerService);

  /** Ruta base del endpoint (ej: "User/Export", "Consumption/Export") */
  @Input() url: string = '';
  /** Query string adicional generado por filtros (ej: "&stateFilter=1-2") */
  @Input() getInputs: string = '';
  /** Nombre del archivo a descargar */
  @Input() filename: string = 'export.xlsx';

  icCloudDownload = 'download';
  infoTooltip = 'Descargar resultados en formato Excel';

  download() {
    Swal.fire({
      title: 'Confirmar',
      text: 'Esta acción descargará los registros en formato .xlsx ignorando la paginación.',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#004A89',
      cancelButtonColor: '#c57e74ff',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDownload();
      }
    });
  }

  private executeDownload() {
    this.spinner.show('carga');

    // 👉 Agregamos download=true y resolvemos si hay ? o no
    const separator = this.url.includes('?') ? '&' : '?';
    const fullUrl = `${this.url}${separator}download=true${this.getInputs}`;

    this.downloadXslxService.executeDownload(fullUrl).subscribe({
      next: (excelData: Blob) => {
        const blobUrl = URL.createObjectURL(excelData);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = this.filename.endsWith('.xlsx')
          ? this.filename
          : `${this.filename}.xlsx`;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
        this.spinner.hide('carga');
      },
      error: (err) => {
        console.error('❌ Error exportando Excel:', err);
        Swal.fire('Error', 'No se pudo generar el archivo. Intenta de nuevo.', 'error');
        this.spinner.hide('carga');
      },
    });
  }
}
