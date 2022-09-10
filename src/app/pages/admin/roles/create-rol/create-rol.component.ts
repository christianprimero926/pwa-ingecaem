import { RoleI } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';
import { InteractionsService } from '../../../../services/Interactions.service';
import * as Constants from '../../../../constants/interactions.constants';


@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.scss'],
})
export class CreateRolComponent implements OnInit {

  constructor(
    private store: FirestoreService,
    private interaction: InteractionsService
  ) { }

  ngOnInit() { }

  createNewRol() {
    this.interaction.showLoading(Constants.LOADING);
    const rol: RoleI = {
      rol_id: 2,
      rol_desc: 'Gerente'
    };
    this.store.createDoc(rol, 'Roles', this.store.getId()).then(() => {
      this.interaction.dismissLoading();
      this.interaction.presentToast(Constants.SUCCESSFULL_SAVE)
    })
  }

}
