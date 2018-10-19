import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reader } from './../models/reader';
import { Injectable } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class ReadersService {

  collection: AngularFirestoreCollection<Reader>

  constructor(private readonly afs: AngularFirestore) { 
    this.collection = this.afs.collection<Reader>('readers')
  }

  getReaders(): Observable<Reader[]> {
    return this.collection.valueChanges()
  }

  getReader(id: string): Observable<Reader> {
    return this.collection.doc(id).valueChanges() as Observable<Reader>
  }
}
