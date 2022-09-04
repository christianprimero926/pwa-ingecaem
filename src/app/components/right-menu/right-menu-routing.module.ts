import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RightMenuPage } from './right-menu.page';

const routes: Routes = [
  {
    path: '',
    component: RightMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RightMenuPageRoutingModule {}
