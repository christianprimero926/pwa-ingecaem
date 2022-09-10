import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRolComponent } from './roles/create-rol/create-rol.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
    // CreateRolComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule

  ]
})
export class AdminModule { }
