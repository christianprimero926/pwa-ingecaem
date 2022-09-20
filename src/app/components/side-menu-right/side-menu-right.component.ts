import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from '../../services/avatar.service';
import { UserService } from '../../services/User.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-side-menu-right',
  templateUrl: './side-menu-right.component.html',
  styleUrls: ['./side-menu-right.component.scss'],
})
export class SideMenuRightComponent implements OnInit {
  // @Input() uid: string;
  profile = null;
  email = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
    private auth: Auth,
  ) {
    this.email = this.userService.getUserData().email;
    this.avatarService.getUserProfile(auth.currentUser.uid).subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() { }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
