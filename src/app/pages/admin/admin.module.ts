import { CreateUserComponent } from './users/create-user/create-user.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRolComponent } from './roles/create-rol/create-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';

@NgModule({
  declarations: [
    CreateRolComponent,
    CreateUserComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ComponentsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    IonicInputMaskModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
