import { Component, OnInit } from '@angular/core';
import { RoleI } from './../../../../models/user.model';
import { FirestoreService } from '../../../../services/firestore.service';
import { InteractionsService } from '../../../../services/Interactions.service';
import * as Constants from '../../../../constants/interactions.constants';
import { TABLE_STYLE_BOOTSTRAP } from '../../../../constants/generic.constants';
import { ROLES_COLLECTION } from '../../../../constants/collections.constants';
import { Page } from '../../../../models/page.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as Datatable from '../../../../constants/datatable.constants';


@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.scss'],
})
export class CreateRolComponent implements OnInit {
  tableStyle = TABLE_STYLE_BOOTSTRAP;
  columnDesc = Datatable.COLUMN_ROL_DESC;
  columnAction = Datatable.COLUMN_ACTIONS;
  ColumnMode = ColumnMode;
  roles = [];

  dataIn: RoleI = {
    rol_id: null,
    rol_desc: '',
    uid: ''
  };

  constructor(
    private firestore: FirestoreService,
    private interaction: InteractionsService,
  ) { this.getRoles(); }

  ngOnInit() { }

  createNewRol() {
    const id = this.firestore.getId();
    this.dataIn.uid = id;
    this.interaction.showLoading(Constants.LOADING_SAVE);
    this.firestore.createDoc(this.dataIn, ROLES_COLLECTION, id).then(() => {
      this.interaction.dismissLoading();
      this.interaction.presentToast(Constants.SUCCESSFULL_SAVE);
    })
  }

  getRoles() {
    this.firestore.getCollection<RoleI>(ROLES_COLLECTION).subscribe(res => {
      let rol = [];
      res.forEach(value => {
        rol.push(
          {
            "rolId": value.rol_id,
            "rolDesc": value.rol_desc,
            "uid": value.uid
          })
      });
      this.roles = rol;
    })
    // return JSON.parse(JSON.stringify(this.roles));
  }
}
