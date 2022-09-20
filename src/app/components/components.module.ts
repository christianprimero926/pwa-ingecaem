import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SideMenuRightComponent } from './side-menu-right/side-menu-right.component';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { AccordionComponent } from '../layouts/accordion/accordion.component';
import { FormsModule } from '@angular/forms';
import { SideMenuLeftComponent } from './side-menu-left/side-menu-left.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuRightComponent,
    SideMenuLeftComponent,
    AccordionComponent
  ],
  exports: [
    HeaderComponent,
    SideMenuRightComponent,
    SideMenuLeftComponent,
    AccordionComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    OrderModule,
    FormsModule
  ]
})
export class ComponentsModule { }
