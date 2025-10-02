import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenExpiryService } from '@app/modules/identity/pages/auth/services/token-expiry.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sir-enterprise';

  // 👉 Con esto forzamos la construcción del servicio en el arranque
  private _expiry = inject(TokenExpiryService);
}
