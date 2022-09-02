import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SideMenuRightComponent } from './side-menu-right/side-menu-right.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuRightComponent
  ],
  exports: [
    HeaderComponent,
    SideMenuRightComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
