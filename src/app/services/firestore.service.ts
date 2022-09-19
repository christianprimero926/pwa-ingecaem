import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  isExists = false;

  constructor(private firestore: AngularFirestore) { }

  getDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).valueChanges();
  }

  createDoc(data: any, path: string, id: string) {
    console.log(data, path, id);
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  deleteDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  getCollection<type>(path: string) {
    const collection = this.firestore.collection<type>(path);
    return collection.valueChanges();
  }

  generateId() {
    return this.firestore.createId();
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // validateExists(res: any[], dataIn, unique, uid) {
  //   let pos = res.length;;
  //   let i = 0;
  //   res.some(value => {
  //     if (unique.localeCompare(value._id, undefined, { sensitivity: 'base' }) === 0) {
  //       this.isExists = true;
  //       return true;
  //     } else if (unique.localeCompare(value._id, undefined, { sensitivity: 'base' }) !== 0) {
  //       this.isExists = false;
  //     } else if (i === pos) {
  //       return true;
  //     }
  //     i++;
  //   });

  //   if (this.isExists) {
  //     this.isExists = false;
  //     this.alertService.showAlert('Hola', 'Rle Existente');
  //     this.isExists = false;
  //   } else {
  //     const id = this.firestore.generateId();
  //     uid = id;
  //     this.interaction.showLoading(Constants.LOADING_SAVE);
  //     this.firestore.createDoc(dataIn, ROLES_COLLECTION, id).then(() => {
  //       this.interaction.dismissLoading();
  //       this.interaction.presentToast(Constants.SUCCESSFULL_SAVE);
  //     });
  //   }




}
