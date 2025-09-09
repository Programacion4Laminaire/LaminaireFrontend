import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-external-redirect',
  standalone: true,
  template: '' // no renderiza nada
})
export class ExternalRedirectComponent implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const url = this.route.snapshot.data['externalUrl'] as string | undefined;

    if (url) {
      // 👇 abre en una nueva pestaña (_blank)
      window.open(url, '_blank');

      // opcional: redirigir la app a home para no dejar /sir-laminaire cargado
      window.location.href = '/';
    } else {
      window.location.href = '/';
    }
  }
}
