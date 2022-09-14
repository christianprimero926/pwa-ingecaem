import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { RoleI } from './../../../../models/user.model';
import { RoleService } from '../../../../services/Role.service';
import { FirestoreService } from '../../../../services/firestore.service';
import { AlertsService } from '../../../../services/Alerts.service';
import { TABLE_STYLE_BOOTSTRAP } from '../../../../constants/generic.constants';
import { ROLES_COLLECTION } from '../../../../constants/collections.constants';
import { dataRolIn } from '../../../../constants/formsInput.constants';
import * as ConstantsForms from '../../../../constants/forms.constants';
import * as Datatable from '../../../../constants/datatable.constants';
import { THIS_ROLE } from '../../../../constants/alert.constants';


@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.scss'],
})
export class CreateRolComponent implements OnInit {
  tableStyle = TABLE_STYLE_BOOTSTRAP;
  InputForms = ConstantsForms;
  dataTable = Datatable;
  ColumnMode = ColumnMode;
  dataIn = dataRolIn;
  roles = [];

  constructor(
    private firestoreService: FirestoreService,
    private roleService: RoleService,
    private alertService: AlertsService
  ) {
    this.getListOfRoles();
  }

  ngOnInit() { }

  createNewRol() {
    this.firestoreService.getCollection<RoleI>(ROLES_COLLECTION).pipe(take(1)).subscribe(res => {
      this.roleService.validateExists(res, this.dataIn, this.dataIn.rol_desc, this.dataIn.uid);
    });
  }

  getListOfRoles() {
    return this.firestoreService.getCollection<RoleI>(ROLES_COLLECTION).subscribe(res => {
      let rol = [];
      res.forEach(value => {
        rol.push({ "rolId": value.rol_id, "rolDesc": value.rol_desc, "uid": value.uid })
      });
      this.roles = rol;
    })
  }

  async deleteRol(uid) {
console.log(uid)
    this.alertService.deleteAlert(THIS_ROLE, ROLES_COLLECTION, uid);


    // const alert = await this.alertController.create({
    //   cssClass: 'normal',
    //   header: 'Advertencia',
    //   message: ' Seguro desea <strong>eliminar</strong> este producto',
    //   buttons: [
    //     {
    //       text: 'cancelar',
    //       role: 'cancel',
    //       cssClass: 'normal',
    //       handler: (blah) => {
    //         console.log('Confirm Cancel: blah');
    //         // this.alertController.dismiss();
    //       }
    //     }, {
    //       text: 'Ok',
    //       handler: () => {
    //         console.log('Confirm Okay');
    //         this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
    //           this.presentToast('eliminado con exito');
    //           this.alertController.dismiss();
    //         }).catch( error => {
    //             this.presentToast('no se pude eliminar');
    //         });
    //       }
    //     }
    //   ]
    // });
    // await alert.present();
  }


}
