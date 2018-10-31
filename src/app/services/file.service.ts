import { Injectable } from '@angular/core';
import * as  firebase from 'firebase';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { take } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private basePath = '/images';

  constructor(private afStorage: AngularFireStorage) { }

  uploadFile(file: File) {
    const fullPath = `${this.basePath}/${file.name}`
    const ref = this.afStorage.ref(fullPath);
  
    return this.afStorage.upload(fullPath, file).then( _ => {
      return ref.getDownloadURL().toPromise()
    })
  }

  deleteFile(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete().then( res => {
      console.log(`file delete: ${res}`)
    })
  }
}
