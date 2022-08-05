import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesLayoutPage } from './pages-layout.page';

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesLayoutPageRoutingModule {}
