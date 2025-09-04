import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberFormat]',
  standalone: true
})
export class NumberFormatDirective {
  private readonly locale = 'es-CO';

  constructor(private el: ElementRef, private ngControl: NgControl) {}

  // 👉 Cada vez que escribes
  @HostListener('input', ['$event'])
  onInput(event: any) {
    let input = event.target.value;

    // permitir coma como decimal → convertir a punto para parsear
    const raw = input.replace(/\./g, '').replace(',', '.');
    const numericValue = parseFloat(raw);

    // actualizar el FormControl con número crudo
    if (!isNaN(numericValue)) {
      this.ngControl.control?.setValue(numericValue, { emitEvent: false });
    } else {
      this.ngControl.control?.setValue(null, { emitEvent: false });
    }

    // formatear mientras escribo (con coma como decimal)
    if (!isNaN(numericValue)) {
      this.el.nativeElement.value = this.formatNumber(raw);
    } else {
      this.el.nativeElement.value = '';
    }
  }

  // 👉 Al perder foco → siempre 2 decimales
  @HostListener('blur')
  onBlur() {
    const value = this.ngControl.control?.value;
    if (value != null && !isNaN(value)) {
      this.el.nativeElement.value = Number(value).toLocaleString(this.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }

  // 👉 Al enfocar → mostrar crudo para que el usuario edite fácil
  @HostListener('focus')
  onFocus() {
    const value = this.ngControl.control?.value;
    if (value != null && !isNaN(value)) {
      // mostrar con coma si tiene decimales
      this.el.nativeElement.value = value.toString().replace('.', ',');
    }
  }

  private formatNumber(raw: string): string {
    const [intPartRaw, decPartRaw] = raw.split('.');
    let intPart = intPartRaw || '';
    const decPart = decPartRaw || '';

    // poner separadores de miles en la parte entera
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return decPart ? `${intPart},${decPart}` : intPart;
  }
}
