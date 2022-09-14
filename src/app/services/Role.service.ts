import { Injectable } from '@angular/core';
import { RoleI } from '../models/user.model';
import { AlertsService } from './Alerts.service';
import { FirestoreService } from './firestore.service';
import { InteractionsService } from './Interactions.service';
import * as Constants from '../constants/interactions.constants';
import { ROLES_COLLECTION } from '../constants/collections.constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  existRol = false;

  constructor(
    private alertService: AlertsService,
    private firestore: FirestoreService,
    private interaction: InteractionsService,
  ) { }

  validateExists(res: RoleI[], dataIn: RoleI, rolDesc, rolUId) {
    // console.log(res)
    let pos = res.length;;
    let i = 0;
    res.some(value => {
      if (rolDesc.localeCompare(value.rol_desc, undefined, { sensitivity: 'base' }) === 0) {
        this.existRol = true;
        return true;
      } else if (rolDesc.localeCompare(value.rol_desc, undefined, { sensitivity: 'base' }) !== 0) {
        this.existRol = false;
      } else if (i === pos) {
        return true;
      }
      i++;
    });

    if (this.existRol) {
      this.existRol = false;
      this.alertService.showAlert('Hola', 'Rle Existente');
      this.existRol = false;
      dataIn.rol_desc = '';
      dataIn.rol_id = '';
    } else {
      const id = this.firestore.generateId();
      // console.log(id)
      dataIn.uid = id;
      this.interaction.showLoading(Constants.LOADING_SAVE);
      this.firestore.createDoc(dataIn, ROLES_COLLECTION, dataIn.uid).then(() => {
        this.interaction.dismissLoading();
        this.interaction.successToast(Constants.SUCCESSFULL_SAVE);
      });
      dataIn.rol_desc = '';
      dataIn.rol_id = '';
    }
  }


}
