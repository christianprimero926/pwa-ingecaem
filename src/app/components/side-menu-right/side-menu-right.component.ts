import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-menu-right',
  templateUrl: './side-menu-right.component.html',
  styleUrls: ['./side-menu-right.component.scss'],
})
export class SideMenuRightComponent implements OnInit {

  pages = [
    { title: 'Main', url: '#', icon: 'home' },
    {
      title: 'Pantalla y Accesibilidad',
      children: [
        {title: 'Modo Oscuro', icon: 'moon', url: '#'}
      ]
    }
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {}

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
