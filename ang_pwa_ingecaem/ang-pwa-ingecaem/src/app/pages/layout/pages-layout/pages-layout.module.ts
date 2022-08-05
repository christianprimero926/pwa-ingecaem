import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesLayoutPageRoutingModule } from './pages-layout-routing.module';

import { PagesLayoutPage } from './pages-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesLayoutPageRoutingModule
  ],
  declarations: [PagesLayoutPage]
})
export class PagesLayoutPageModule {}
