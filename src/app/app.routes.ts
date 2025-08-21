import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { authGuard } from './modules/core/guards/auth.guard';
import { RoleManagementComponent } from './modules/identity/pages/role/components/role-management/role-management.component';
import { from } from 'rxjs';

const childrenRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./modules/identity/pages/user/components/user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./modules/identity/pages/role/components/role-list/role-list.component').then(
        (c) => c.RoleListComponent
      ),
  },
  {
    path: 'roles/crear',
    loadComponent: () =>
      import(
        './modules/identity/pages/role/components/role-management/role-management.component'
      ).then((c) => c.RoleManagementComponent),
  },
  {
    path: 'roles/editar/:roleId',
    loadComponent: () =>
      import(
        './modules/identity/pages/role/components/role-management/role-management.component'
      ).then((c) => c.RoleManagementComponent),
  },
  {
    path: 'role-users',
    loadComponent: () =>
      import(
        './modules/identity/pages/user-role/components/user-role-list/user-role-list.component'
      ).then((c) => c.UserRoleListComponent),
  },
      // Ruta para Sirlaminaire
  {
    path: 'sir-laminaire',
    loadComponent: () =>
      import('./pages/sir-laminaire/sir-laminaire.component').then(
        (c) => c.SirLaminaireComponent
      ),
  },

];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/identity/pages/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./modules/identity/pages/auth/components/reset-password/reset-password.component').then(
        (c) => c.ResetPasswordComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: childrenRoutes,
    canActivate: [authGuard],
  },
];
