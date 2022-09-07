import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(){
    this.firestore.collection('Roles')
  }

  readCollection(){
    console.log('Leer collecion');
    this.firestore.collection('Roles').valueChanges().subscribe((res) => {
      console.log('result: ', res);
    });
  }
}
