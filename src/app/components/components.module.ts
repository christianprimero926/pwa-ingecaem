import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SideMenuRightComponent } from './side-menu-right/side-menu-right.component';
import { RouterModule } from '@angular/router';
import { RightMenuPageModule } from './right-menu/right-menu.module';
import { OrderModule } from 'ngx-order-pipe';
import { AccordionComponent } from '../layouts/accordion/accordion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuRightComponent,
    AccordionComponent


  ],
  exports: [
    HeaderComponent,
    SideMenuRightComponent,
    RightMenuPageModule,
    AccordionComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RightMenuPageModule,
    OrderModule,
    FormsModule
  ]
})
export class ComponentsModule { }
