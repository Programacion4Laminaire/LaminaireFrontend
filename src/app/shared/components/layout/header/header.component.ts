import { Component, HostListener, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon'; // 👈 necesario para <mat-icon>
import { Router } from '@angular/router';

import {
  languages,
  notifications,
  userItems,
} from '@shared/utils/global-constants.util';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, CdkMenuTrigger, MatIconModule], // 👈 importa MatIconModule
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }

  getHeadClass(): string {
    return this.collapsed && this.screenWidth > 768
      ? 'head-trimmed'
      : 'head-md-screen';
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    this.canShowSearchAsOverlay = innerWidth < 845;
  }

 logout(): void {
  localStorage.removeItem('token');
 
  this.router.navigate(['/login'], { replaceUrl: true }); // borra historial
}
}
