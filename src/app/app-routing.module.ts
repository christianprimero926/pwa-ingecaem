import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './pages/admin/roles/create-rol/create-rol.component';
import { CreateUserComponent } from './pages/admin/users/create-user/create-user.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./auth/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
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
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/operator/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  { path: 'roles', component: CreateRolComponent },
  { path: 'users', component: CreateUserComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  }




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
