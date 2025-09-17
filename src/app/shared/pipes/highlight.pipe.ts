import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hl', standalone: true })
export class HighlightPipe implements PipeTransform {
  transform(text: string | null | undefined, term: string | null | undefined): string {
    if (!text || !term?.trim()) return text ?? '';

    // función para quitar tildes/acentos
    const normalize = (str: string) =>
      str.normalize('NFD').replace(/\p{Diacritic}/gu, '');

    const normText = normalize(text);
    const normTerm = normalize(term);

    const esc = normTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(esc, 'gi');

    // Para resaltar, tenemos que mapear al texto original
    return normText.replace(re, (match, offset) => {
      // usamos el mismo rango pero en el texto original
      return `<mark>${text.substring(offset, offset + match.length)}</mark>`;
    });
  }
}
