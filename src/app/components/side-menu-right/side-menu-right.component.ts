import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu-right',
  templateUrl: './side-menu-right.component.html',
  styleUrls: ['./side-menu-right.component.scss'],
})
export class SideMenuRightComponent implements OnInit {
  @Input() item: any;
  @Input() parent = '';
  asc = true;

  pages = [
    {
      alias: 'Home',
      title: 'Main',
      url: '',
      icon: 'home'
    },
    {
      alias: 'Screen',
      title: 'Pantalla y Accesibilidad',
      icon: 'moon',
      children: [
        {
          title: 'Modo Oscuro',
          icon: 'moon',
          url: '#',
          children: [
            {
              title: 'activado',
            },
            {
              title: 'desactivado',
            },
            {
              title: 'automatico',
            }



          ]
        }
      ]
    }, {
      alias: 'logout',
      title: 'Cerrar sesión',
      url: '',
      icon: 'log-out',
    }
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // if(this.parent === ''){
    //   this.parent = this.item.name;
    // } else {
    //   this.parent += `/${this.item.name}`;
    // }
  }

  // open(path){
  //   const fullPath = `${this.parent}/${path}`;

  //   const encoded = encodeURIComponent(fullPath);
  //   this.navCtrl.setDirection('root');
  //   this.router.navigateByUrl(`/home/${encoded}`);
  //   this.menuCtrl.toggle();
  // }

  selectEvent(alias) {
    if (alias === 'logout') {
      this.logout();
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
