import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@app/modules/identity/pages/user/services/user.service';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';
import { UserWithRoleAndPermissionsResponse } from '@app/modules/identity/pages/user/models/user-response.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fullName = '';
  role = '';
  companyName = 'LAMINAIRE S.A.S'; // 👈 puedes parametrizar si luego viene del backend
  welcomeMessage = '';
  greeting = '';

  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.userService
        .userWithRoleAndPermissions(userId)
        .subscribe((user: UserWithRoleAndPermissionsResponse) => {
          this.fullName = `${user.firstName} ${user.lastName}`;
          this.role = user.role?.name ?? '';

          // Mensaje genérico
          this.welcomeMessage = this.buildWelcomeMessage();
          this.greeting = this.getGreetingMessage(user.userId);
        });
    }
  }

  private buildWelcomeMessage(): string {
    return `Desde aquí puedes gestionar tus módulos y colaborar en el funcionamiento del Sistema.`;
  }

  private getGreetingMessage(userId: number): string {
    const userKey = `hasVisitedHome_${userId}`;
    const alreadyVisited = localStorage.getItem(userKey);

    if (!alreadyVisited) {
      localStorage.setItem(userKey, 'true');
      return '¡Bienvenido!';
    }

    const greetings = [
      '¡Nos alegra que hayas vuelto!',
      '¡Bienvenido de nuevo!',
      '¡Qué bueno tenerte otra vez!',
      '¡Hola otra vez!',
      '¡Gracias por regresar!',
      '¡El sistema te extrañaba!',
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}
