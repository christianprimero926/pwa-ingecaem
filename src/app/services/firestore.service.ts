import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {



  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getCollection<type>(path: string) {
    const collection = this.firestore.collection<type>(path);
    return collection.valueChanges();
  }

  getId() {
    return this.firestore.createId();
  }


  deleteDocument() { }
  editDocument() { }

  getDocument() {
    console.log('Leer collecion');
    this.firestore.collection('Roles').valueChanges().subscribe((res) => {
      console.log('result: ', res);
    });
  }




}
