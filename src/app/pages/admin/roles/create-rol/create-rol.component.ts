import { RoleI } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';
import { InteractionsService } from '../../../../services/Interactions.service';
import * as Constants from '../../../../constants/interactions.constants';
import data from './../../../../../assets/roles.json';
import { TABLE_STYLE_BOOTSTRAP } from '../../../../constants/generic.constants';
import { ROLES_COLLECTION } from '../../../../constants/collections.constants';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';


export interface Item { name: string; }
@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.scss'],
})
export class CreateRolComponent implements OnInit {
  public rolesJSON = data;

  // private itemsCollection: AngularFirestoreCollection<RoleI>;
  // items: Observable<RoleI[]>;

  json;

  roleList: Array<any> = new Array();

  obj: { name: string; };

  parsed;

  // rolesGrid = {};
  rolesGrid: RoleI = {
    rol_id: null,
    rol_desc: '',
    uid: ''
  };
  myarray = [];

  public roles: RoleI[] = [];
  tableStyle = TABLE_STYLE_BOOTSTRAP;
  dataIn: RoleI = {
    rol_id: null,
    rol_desc: '',
    uid: ''
  };

  constructor(
    private store: FirestoreService,
    private interaction: InteractionsService
  ) {

  }

  ngOnInit() {
    this.getRoles();
    // console.log(this.parsed);
    // console.log(this.rolesJSON);
    // this.json = Object.assign({}, this.roleList);
    // console.log(this.json);

    // console.log(this.getRoles());

  }

  createNewRol() {
    const id = this.store.getId();
    this.dataIn.uid = id;
    this.interaction.showLoading(Constants.LOADING_SAVE);
    this.store.createDoc(this.dataIn, ROLES_COLLECTION, id).then(() => {
      this.interaction.dismissLoading();
      this.interaction.presentToast(Constants.SUCCESSFULL_SAVE);
    })
  }

  getRoles() {
    return this.store.getCollection<RoleI>(ROLES_COLLECTION).subscribe(res => {
      // let rolesL = new Object();
      res.forEach(value => {
        this.roles.push(
          {
            rol_id: value.rol_id,
            rol_desc: value.rol_desc,
            uid: value.uid
          }
        )
        // this.json = JSON.stringify(this.roles);

        // console.log(typeof this.json); // 👉️ "string"

        // this.parsed = JSON.parse(this.json) as typeof this.roles;

        // console.log(this.parsed);


      });
      this.json = JSON.stringify(this.roles);

        // console.log(typeof this.json); // 👉️ "string"

        this.parsed = JSON.parse(this.json) as typeof this.roles;

        console.log(this.parsed);
      //  this.json = JSON.parse(JSON.stringify(this.myarray));
      //  console.log(this.json);


      // console.log(this.roleList);
      // this.rolesGrid = JSON.parse(JSON.stringify(this.roleList));
      // // this.addItem(res);
      // console.log(JSON.parse(JSON.stringify(this.roleList)));
      // JSON.parse(res.forEach);
      // this.addItem(res);
    });
  }

  addItem(response: RoleI[]) {
    this.json = JSON.stringify(this.roles);

        console.log(typeof this.json); // 👉️ "string"

        this.parsed = JSON.parse(this.json) as typeof this.roles;

        console.log(this.parsed);
  }

}
