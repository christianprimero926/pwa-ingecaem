import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from './User.service';
import { Router } from '@angular/router';
import { AlertsService } from './Alerts.service';
import { UserI } from '../models/user.model';
import { InteractionsService } from './Interactions.service';
import { Storage } from '@ionic/storage';
import { FirestoreService } from './firestore.service';
export interface User {
  name: string;
  role: string;
  permissions: string[];
}
const TOKEN_KEY = 'user-access-token';
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
    private alertService: AlertsService,
    private interaction: InteractionsService,
    private storage: Storage,
    private firestoreService: FirestoreService
  ) { }

  async register(credentials) {
    this.angularFireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        credentials.uid = user.user.uid;
        this.userService.createUser(credentials);
      }).catch((e) => {
        console.error(e);
        this.interaction.successToast("Error al crear usuario");
      });
  }

  signIn(credentials) {
    let email = credentials.email;
    let password = credentials.password;
    // let user = null;

    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then(data => {
      console.log(data.user.uid);
      this.firestoreService.getDoc<UserI>('Users', data.user.uid).pipe(take(1)).subscribe(data => {
        this.userService.navigateByRol(data.rol);
      });
    }).catch(err => {
      console.error(err);
      this.alertService.showAlert('Login failed', 'Please try again!!');
      return null;
    });

  }

  // signIn({ email, password }): Promise<any> {
  //   return this.angularFireAuth.signInWithEmailAndPassword(email, password).then(data => {
  //     this.userService.getUserById(data.user.uid).pipe(take(2)).subscribe(userData => {
  //       this.userService.setUser(userData);
  //       if (userData) {
  //         this.router.navigateByUrl('/home', { replaceUrl: true });
  //       } else {
  //         this.alertService.showAlert('Login failed', 'Please try again!!');
  //       }
  //     })
  //   }).catch(err => {
  //     console.error(err);
  //     return null;
  //   });
  // }

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
