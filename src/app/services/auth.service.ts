import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from './User.service';
import { Router } from '@angular/router';
import { AlertsService } from './Alerts.service';
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
    private userService: UserService,
    private authFirebase: AngularFireAuth,
    private router: Router,
    private alert: AlertsService
  ) { }

  signIn({ email, password }): Promise<any> {
    return this.authFirebase.signInWithEmailAndPassword(email, password).then(data => {
      this.userService.getUserById(data.user.uid).pipe(take(2)).subscribe(userData => {
        this.userService.setUser(userData);
        if (userData) {
          this.router.navigateByUrl('/home', { replaceUrl: true });
          // localStorage.setItem('currentUser', userData);
        } else {
          this.alert.showAlert('Login failed', 'Please try again!!');
        }

      })
    }).catch(err => {
      console.error(err);
      return null;
    });
  }

  logout() {
    return this.authFirebase.signOut();
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
