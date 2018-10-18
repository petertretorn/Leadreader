import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reader } from './../models/reader';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadersService {

  constructor(private readonly afs: AngularFirestore) { }

  getReaders(): Observable<Reader[]> {
    return this.afs.collection<Reader>('readers').valueChanges()
  }
}
