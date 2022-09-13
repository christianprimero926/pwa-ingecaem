import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Page } from '../models/page.model';
import { PagedData } from '../models/paged-data.model';

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
