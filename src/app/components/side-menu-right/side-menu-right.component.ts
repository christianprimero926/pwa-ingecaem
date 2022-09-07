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
      id: '1',
      alias: 'Home',
      title: 'Main',
      url: '',
      icon: 'home'
    },
    {
      id: '2',
      alias: 'Screen',
      title: 'Pantalla y Accesibilidad',
      icon: 'moon',
      children: [
        {
          id: '2.1',
          title: 'Modo Oscuro',
          icon: 'moon',
          url: '#',
          alias: 'dark_mode',
          // children: [
          //   {
          //     id: '2.1.1',
          //     title: 'Activado',
          //     radio: true,
          //   },
          //   {
          //     id: '2.1.2',
          //     title: 'Desactivado',
          //     radio: true,
          //   },
          //   {
          //     id: '2.1.3',
          //     title: 'Automatico',
          //     radio: true,
          //     alias: 'automatic_dark_theme',
          //   }



          // ]
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
    switch (alias) {
      case 'logout':
        this.logout();
        break;
      case 'automatic_dark_theme':
        this.toggleTheme(event);
        break;
      default:
        break;
    }
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

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
