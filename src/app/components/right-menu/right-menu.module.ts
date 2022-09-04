import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RightMenuPageRoutingModule } from './right-menu-routing.module';

import { RightMenuPage } from './right-menu.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RightMenuPage,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RightMenuPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RightMenuPage]
})
export class RightMenuPageModule {}
