import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { RoleI, UserI } from '../../../../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../services/firestore.service';
import { ROLES_COLLECTION } from '../../../../constants/collections.constants';
import * as ConstantsForms from '../../../../constants/forms.constants';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  InputForms = ConstantsForms;

  roles = [];
  users: UserI[] = [];
  newUser: UserI;

  // newrolUser: RoleI;

  customAlertOptions = {
    header: 'Pizza Toppings',
    subHeader: 'Select your favorite topping',
    message: 'Choose only one',
    translucent: true,
  };

  constructor(private firestore: FirestoreService) { }

  loadUsers() {
    this.newUser = {
      name: 'string',
      email: 'string',
      uid: 'string',
      password: 'string',
      rol: 1
    }

  }

  ngOnInit() {
    this.getListOfRoles();
    this.loadUsers();
  }

  // createNewUser() {
  //   console.log('guardado')
  // }

  getListOfRoles() {
    this.firestore.getCollection<RoleI>(ROLES_COLLECTION).subscribe(res => {
      this.roles = res;
    })
  }



}
