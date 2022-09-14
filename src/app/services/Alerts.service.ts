import { LOADING_DELETE } from './../constants/interactions.constants';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SUCCESSFULL_DELETE, ERROR_DELETE } from '../constants/interactions.constants';
import * as ConstantsAlert from './../constants/alert.constants';
import { FirestoreService } from './firestore.service';
import { InteractionsService } from './Interactions.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private alertController: AlertController,
    private firestoreService: FirestoreService,
    private interactionService: InteractionsService
  ) { }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async deleteAlert(type, path, uid){
    const alert = await this.alertController.create({
        cssClass: 'normal',
        header: ConstantsAlert.WARNING,
        message: ConstantsAlert.DELETE_CONFIRM + type,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
              // this.alertController.dismiss();
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');
              this.interactionService.showLoading(LOADING_DELETE);
              this.firestoreService.deleteDoc(path, uid).then( res => {
                this.interactionService.dismissLoading();
                this.interactionService.successToast(SUCCESSFULL_DELETE);
              }).catch( error => {
                  this.interactionService.alertToast(ERROR_DELETE);
              });
            }
          }
        ]
      });
      await alert.present();
  }

}
