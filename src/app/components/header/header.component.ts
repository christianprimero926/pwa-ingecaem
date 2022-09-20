import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AvatarService } from 'src/app/services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/User.service';
import { take } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // @Input() uid: string;
  // user$: Observable<any> = of(null);
  // email = this.authService.getCurrentUser().user.email;
  profile = null;
  user$: Observable<any> = of(null);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private menu: MenuController,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: Auth
  ) {
    this.avatarService.getUserProfile(auth.currentUser.uid).subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() {

  }

  getAvatar(){
    this.userService.getUser.pipe(take(2)).subscribe(userData => {
      this.userService.setUser(userData);
      if (userData) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
        localStorage.setItem('currentUser', userData);
      } else {
        // this.alert.showAlert('Login failed', 'Please try again!!');
      }

    })
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async openMenu() {
    await this.menu.open();
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
