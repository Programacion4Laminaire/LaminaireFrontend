import { Component } from '@angular/core';
import { SidebarComponent } from '@app/shared/components/layout/sidebar/sidebar.component';
import { BodyComponent } from '@app/shared/components/layout/body/body.component';
import { HeaderComponent } from '@app/shared/components/layout/header/header.component';
import { ISidebarToggle } from '@app/shared/models/layout/sidebar-toggle.interface';




@Component({
    selector: 'app-layout',
    imports: [SidebarComponent, BodyComponent, HeaderComponent,],
    templateUrl: './layout.component.html'
})
export class LayoutComponent {
  isSidebarCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(toggle: ISidebarToggle): void {
    this.screenWidth = toggle.screenWidth;
    this.isSidebarCollapsed = toggle.collapsed;
  }
}
