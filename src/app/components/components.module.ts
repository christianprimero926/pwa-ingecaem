import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SideMenuRightComponent } from './side-menu-right/side-menu-right.component';
import { RouterModule } from '@angular/router';
import { RightMenuPageModule } from './right-menu/right-menu.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuRightComponent,
    
  ],
  exports: [
    HeaderComponent,
    SideMenuRightComponent,
    RightMenuPageModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RightMenuPageModule,
  ]
})
export class ComponentsModule { }
