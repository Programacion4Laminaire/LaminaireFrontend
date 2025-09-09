import { Component, HostListener, Input, ViewChild, inject } from '@angular/core';
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
import { UserWithRoleAndPermissionsResponse } from '@app/modules/identity/pages/user/models/user-response.interface';
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

  // 👈 Ahora capturamos el trigger directamente
  @ViewChild(CdkMenuTrigger) userMenuTrigger!: CdkMenuTrigger;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;

  currentUser?: UserWithRoleAndPermissionsResponse;
  userImage: string = 'public/default-user.png';
  userName: string = '';
  userRole: string = '';

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];

    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.userService.userWithRoleAndPermissions(userId).subscribe((user) => {
        this.currentUser = user;
        this.userName = `${user.firstName} ${user.lastName}`;
        this.userRole = user.role?.name ?? '';
        this.userImage = this.getFullImageUrl(user.profileImagePath);

       
      });
    }
  }

  private getFullImageUrl(path: string | null): string {
    if (!path || path.trim() === '') {
      return 'public/default-user.png'; // 👈 fallback
    }
    return `${env.apiIdentity.replace('/api/', '')}${path}`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    return this.collapsed && this.screenWidth > 768
      ? 'head-trimmed'
      : 'head-md-screen';
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    this.canShowSearchAsOverlay = innerWidth < 845;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.userMenuTrigger.close(); 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
    this.userMenuTrigger.close(); 
   
  }
}
