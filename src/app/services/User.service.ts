import { Injectable } from '@angular/core';
import { DocumentReference, doc, Firestore, docData } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
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

  createUser(user: UserI) {
    this.angularFirestore.collection(USER_COLLECTION).doc().set(user);
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



}
