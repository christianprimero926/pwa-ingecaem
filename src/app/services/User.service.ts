import { Injectable } from '@angular/core';
import { DocumentReference, doc, Firestore, docData } from '@angular/fire/firestore';
import { Observable, BehaviorSubject} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';
import { UserI } from '../models/user.model';
import { AlertsService } from './Alerts.service';
import { FirestoreService } from './firestore.service';
import { InteractionsService } from './Interactions.service';
import { USER_COLLECTION } from '../constants/collections.constants';
import { ROL_SUPERADMIN } from '../constants/roles.constans';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userWatcher: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  PATH = 'Users';
  existUser = false;

  constructor(
    private auth: Auth,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) { }

  getUserData() {
    const user = this.auth.currentUser;
    return user;
  }

  stateUser() {
    return this.angularFireAuth.authState;
  }

  getUserById(uid: string): Observable<UserI> {
    var docRef = this.angularFirestore.collection('users').doc<UserI>(uid);
    const user$ = docRef.get().pipe(
      map((doc) => {
        if (doc.exists) {
          return doc.data()
        } else {
          return null;
        }
      })
    )
    return user$
  }

  createUser(data) {
    console.log(data.uid);
    console.log(data);
    const collection = this.angularFirestore.collection(USER_COLLECTION);
    return collection.doc(data.uid).set(data);;
  }

  get getUser(): Observable<any> {
    // let user_storage = this.validateUserStorage(localStorage.getItem('currentUser'));
    // if( user_storage != null){
    //   // return this.userWatcher.next(user_storage);
    //   this.userWatcher.next(user_storage);
    // } else {
    //   return null;
    // }
    return this.userWatcher.asObservable();
    // return this.userRefresh();
  }

  setUser(user: any): void {
    // let user_storage = this.validateUserStorage(localStorage.getItem('currentUser'));
    // if( user_storage != null){
    //   this.userWatcher.next(user_storage);
    // } else {
    //   return null;
    // }
    this.userWatcher.next(user);
  }

  validateUserStorage(user_storage) {
    if (!(user_storage === null || user_storage === undefined)) {
      let user = JSON.parse(user_storage);
      return user;
    } else {
      return null;
    }
  }

  generatePassword() {
    let passwordGen = '';

    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$.-_&/' +
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$.-_&/';

            for (let i = 1; i <= 10; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);

                passwordGen += str.charAt(char)
            }


      // Math.random().toString(36).slice(2) +
      // Math.random().toString(36)
      //   .toUpperCase().slice(2);
    return passwordGen;

  }

  navigateByRol(rol: string) {
    switch (rol) {
      case ROL_SUPERADMIN:
        this.router.navigateByUrl('/admin-dashboard', { replaceUrl: true });

        break;

      default:
        break;
    }
  }

}
