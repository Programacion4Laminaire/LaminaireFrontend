import {
  Component,
  HostListener,
  Input,
  ViewChild,
  inject,
  computed,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import {
  languages,
  notifications,
  userItems,
} from '@shared/utils/global-constants.util';

import { UserService } from '@app/modules/identity/pages/user/services/user.service';
import { environment as env } from '@env/environment';
import { AuthService } from '@app/modules/identity/pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, CdkMenuTrigger, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @ViewChild(CdkMenuTrigger) userMenuTrigger!: CdkMenuTrigger;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  // 👇 Signals derivados de currentUser
  userImage = computed(() =>
    this.userService.currentUser()?.profileImagePath
      ? this.getFullImageUrl(this.userService.currentUser()!.profileImagePath!)
      : 'public/default-user.png'
  );

  userName = computed(() => {
    const u = this.userService.currentUser();
    return u ? `${u.firstName} ${u.lastName}` : '';
  });

  userRole = computed(() => this.userService.currentUser()?.role?.name ?? '');

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];

    // cargar el usuario desde API
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.userService.userWithRoleAndPermissions(userId).subscribe((user) => {
        this.userService.setUser(user); // 👈 guardamos en signal
      });
    }
  }

  private getFullImageUrl(path: string | null): string {
    if (!path || path.trim() === '') {
      return 'public/default-user.png';
    }
    return `${env.apiIdentity.replace('/api/', '')}${path}`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    if (this.screenWidth <= 768) return 'head-full';
    return this.collapsed ? 'head-trimmed' : 'head-md-screen';
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    this.canShowSearchAsOverlay = innerWidth < 845;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.userMenuTrigger.close();
  }
  // 👇 NUEVO: método público para manejar error de imagen
  handleImageError(): void {
    this.userService.updateProfileImage('public/default-user.png');
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
    this.userMenuTrigger.close();
  }
}
