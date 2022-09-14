import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from './User.service';
import { Router } from '@angular/router';
import { AlertsService } from './Alerts.service';
import { UserI } from '../models/user.model';
export interface User {
  name: string;
  role: string;
  permissions: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  authState = new BehaviorSubject(null);

  // private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private alertService: AlertsService
  ) { }

  async register(newUser: UserI) {
    this.angularFireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        this.userService.createUser(newUser);
      })
      .catch((e) => console.log(e));
  }

  signIn({ email, password }): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then(data => {
      this.userService.getUserById(data.user.uid).pipe(take(2)).subscribe(userData => {
        this.userService.setUser(userData);
        if (userData) {
          this.router.navigateByUrl('/home', { replaceUrl: true });
          // localStorage.setItem('currentUser', userData);
        } else {
          this.alertService.showAlert('Login failed', 'Please try again!!');
        }

      })
    }).catch(err => {
      console.error(err);
      return null;
    });
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  getCurrentUser() {
    let user_string = localStorage.getItem('currentUser');
    if (!(user_string === null || user_string === undefined)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

}
