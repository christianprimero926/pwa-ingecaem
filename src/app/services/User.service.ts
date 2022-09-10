import { Injectable } from '@angular/core';
import { DocumentReference, doc, Firestore, docData } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userWatcher: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private authFirebase: AngularFireAuth,
    private afs: AngularFirestore
    ) { }

  getUserData() {
    const user =  this.auth.currentUser;
    // console.log(user);
    return user;
  }

  stateUser(){
    return this.authFirebase.authState;
  }

  getUserById(uid: string): Observable<any> {
    var docRef = this.afs.collection('users').doc<any>(uid);
    const user$ = docRef.get().pipe(
      map( (doc) => {
        if (doc.exists) {
          return doc.data()
        } else {
          return null;
        }
      })
    )
    return user$
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

  // userRefresh(): Observable<any>{
  //   return this.userWatcher.next(JSON.parse(localStorage.getItem('currentUser')));
  // }

}
