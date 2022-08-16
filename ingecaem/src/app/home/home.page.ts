import { Component, Renderer2 } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private renderer: Renderer2
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async toggleDarkTheme() {
    // Query for the toggle that is used to change between themes
    const toggle = document.querySelector('#themeToggle') as HTMLInputElement | null;
    // console.log(toggle.addEventListener);



    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    toggle.addEventListener('ionChange', (ev) => {
      document.body.classList.toggle('dark', (<CustomEvent>ev).detail.checked);
      console.log((<CustomEvent>ev).detail.checked);
    });

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log(prefersDark);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((e) => checkToggle(e.matches));
    // console.log(prefersDark.addListener);





    // Called when the app loads
    function loadApp() {
      checkToggle(prefersDark.matches);
      // console.log('hola');
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      toggle.checked = shouldCheck;
      // console.log('hola');
    }


  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
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



}
