import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import {ForgotPasswordPage} from './pages/auth/forgot-password/forgot-password.page';
// import {LoginPage} from './pages/auth/login/login.page';
// import {RegisterBoxedComponent} from './pages/registration/';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  //   children: [
  //     // User Pages

  //     {path: 'pages/login', component: LoginPage, data: {extraParameter: ''}},      
  //     {path: 'pages/forgot-password', component: ForgotPasswordPage, data: {extraParameter: ''}},
  //   ]
  // },
  // {path: '**', redirectTo: ''},
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'base-layout',
    loadChildren: () => import('./pages/layout/base-layout/base-layout.module').then( m => m.BaseLayoutPageModule)
  },
  {
    path: 'pages-layout',
    loadChildren: () => import('./pages/layout/pages-layout/pages-layout.module').then( m => m.PagesLayoutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
