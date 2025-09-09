import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hl', standalone: true })
export class HighlightPipe implements PipeTransform {
  transform(text: string | null | undefined, term: string | null | undefined): string {
    if (!text || !term?.trim()) return text ?? '';
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(esc, 'gi');
    return text.replace(re, (m) => `<mark>${m}</mark>`);
  }
}
