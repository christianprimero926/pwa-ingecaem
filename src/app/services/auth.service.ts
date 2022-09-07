import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';


const { Storage } = Plugins;

const TOKEN_KEY = 'user_token';

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
  constructor(private auth: Auth,
    private authFirebase: AngularFireAuth
  ) {

  }

  // signIn(credentials){
  //   let email = credentials.email;
  //   let password = credentials.password;
  //   let user = null;

  //   if (email === 'admin' && password === 'admin') {
  //     user = {email, role: 'ADMIN'};
  //   } else if(email === 'user' && password === 'user') {
  //     user = {email, role: 'ADMIN'};
  //   }
  // }

  async getUserId() {
    const user = await this.authFirebase.currentUser;
    return user.uid;
  }

  stateUser(){
    return this.authFirebase.authState;
  }


  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      let currentUserData = JSON.stringify(user)
      localStorage.setItem('currentUser', currentUserData); // BAD
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    // return signOut(this.auth);
    this.authFirebase.signOut();
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
