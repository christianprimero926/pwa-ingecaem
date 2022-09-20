import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './pages/admin/roles/create-rol/create-rol.component';
import { CreateUserComponent } from './pages/admin/users/create-user/create-user.component';
import { AuthGuard } from './guards/auth.guard';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from "@angular/fire/auth-guard";
import { ROL_SUPERADMIN, ROL_ADMIN, ROL_MANAGER } from './constants/roles.constans';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./auth/login.module').then((m) => m.LoginPageModule)
    // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./pages/admin/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard],
    data: {
      role: [ROL_SUPERADMIN, ROL_ADMIN, ROL_MANAGER]
    }
  },
  { path: 'roles', component: CreateRolComponent },
  { path: 'users', component: CreateUserComponent },
  {
    path: 'operator-dashboard',
    loadChildren: () =>
      import('./pages/operator/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  //   ...canActivate(redirectUnauthorizedToLogin)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  //   ...canActivate(redirectUnauthorizedToLogin)
  // },
  // {
  //   path: 'menu',
  //   loadChildren: () =>
  //     import('./components/right-menu/right-menu.module').then((m) => m.RightMenuPageModule),
  // },
  // {
  //   path: 'accordion/:path',
  //   loadChildren: () =>
  //     import('./modules/details/details.module').then(m => m.DetailsPageModule)
  // },




  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
