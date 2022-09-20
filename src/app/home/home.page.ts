import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/User.service';
import { Observable, of } from 'rxjs';
import { user, Auth } from '@angular/fire/auth';
import { userInfo } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  profile = null;
  user$: Observable<any> = of(null);
  // darkMode: boolean = true;


  constructor(
    private userService: UserService,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private auth: Auth,
  ) {
    console.log(auth.currentUser.uid);
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.avatarService.getUserProfile(auth.currentUser.uid).subscribe((data) => {
      // console.log(data);
      this.profile = data;
    });
  }
  ngOnInit(): void {
    this.user$ = this.userService.getUser;
  }

  toggleTheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      document.querySelector('#theme-icon').setAttribute('name', 'moon');
      // console.l]og(document.querySelector('ion-icon'));
    } else {
      document.body.setAttribute('color-theme', 'light');
      document.querySelector('#theme-icon').setAttribute('name', 'sunny');
    }

  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt
    });
    // console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();
      // console.log(result);

      if (result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  getRoles() {
    // this.firestore.readCollection();
  }



}
