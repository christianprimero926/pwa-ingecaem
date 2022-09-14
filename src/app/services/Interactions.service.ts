import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
   loading: any;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) { }

  async successToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      icon: 'checkmark-done-circle-sharp',
      cssClass: 'success-toast',
      buttons: [
        {
          icon: 'close-sharp',
          role: 'cancel'
        }
      ],
    });
    await toast.present();
  }

  async alertToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      icon: 'alert-circle-outline',
      cssClass: 'alert-toast',
      buttons: [
        {
          icon: 'close-sharp',
          role: 'cancel'
        }
      ],
    });
    await toast.present();
  }

  async showLoading(msg: string) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      cssClass: 'custom-loading',
    });

    this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

}
