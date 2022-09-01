import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';

export interface User {
  name: string;
  role: string;
  permissions: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

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
    return signOut(this.auth);
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
