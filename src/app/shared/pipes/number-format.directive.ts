import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
  standalone: true // 👈 Muy importante
})
export class NumberFormatDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const rawValue = event.target.value.replace(/,/g, '');
    const numericValue = parseFloat(rawValue);

    if (!isNaN(numericValue)) {
      // 👉 Actualiza el FormControl con número
      this.control.control?.setValue(numericValue, { emitEvent: false });

      // 👉 Formatea lo que se ve en el input
      event.target.value = numericValue.toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      this.control.control?.setValue(null, { emitEvent: false });
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    const rawValue = event.target.value.replace(/,/g, '');
    const numericValue = parseFloat(rawValue);
    if (!isNaN(numericValue)) {
      event.target.value = numericValue.toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
}
