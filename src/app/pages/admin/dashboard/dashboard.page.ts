import { Component, OnInit } from '@angular/core';
import { TABLE_STYLE_BOOTSTRAP } from '../../../constants/generic.constants';
import * as ConstantsForms from '../../../constants/forms.constants';
import * as Datatable from '../../../constants/datatable.constants';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FirestoreService } from '../../../services/firestore.service';
import { UserI } from '../../../models/user.model';
import { USER_COLLECTION } from '../../../constants/collections.constants';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  tableStyle = TABLE_STYLE_BOOTSTRAP;
  InputForms = ConstantsForms;
  dataTable = Datatable;
  ColumnMode = ColumnMode;
  users = [];

  constructor(
    private firestoreService: FirestoreService
  ) {
    user;
    // console.log(user);
    this.getListOfUsers();
  }

  ngOnInit() {
  }

  getListOfUsers() {
    return this.firestoreService.getCollection<UserI>(USER_COLLECTION).subscribe(res => {
      let user = [];
      res.forEach(value => {
        user.push({
          "codeUser": value.codeUser,
          "rol": value.rol,
          "name": value.name,
          "lastname": value.lastname,
          "typeId": value.typeId,
          "idUser": value._id,
          "dateBirth": value.date_birth,
          "dateIn": value.dateIn,
          "email": value.email,
          "password": value.password,
          "arl": value.arl,
          "compensationOffice": value.compensation_office,
          "uid": value.uid
        })
      });
      this.users = user;
    })

  }

}
