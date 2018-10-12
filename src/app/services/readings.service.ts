import { Reading } from './../models/reading';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { QuoteNote } from 'src/app/models/quote-note';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  readings: Reading[] = []

  currentReading: Reading

  private readingsCollection: AngularFirestoreCollection<Reading>;

  constructor(private readonly afs: AngularFirestore) {
    this.afs = afs
    this.readingsCollection = afs.collection<Reading>('readings');
   }

  createReading(reading: Reading): Observable<Reading> {
    const id = this.afs.createId()
    
    let obj = this.makePureJSObject(reading)
    obj = { ...obj, id}

    this.readingsCollection.doc(id).set( { ...obj, id} ).then( 
      () => console.log('saved to firestore'))

    this.currentReading = obj

    return of<Reading>( obj )
  }

  addQuoteNote(qnote: QuoteNote) {

  }

  updateReading(reading: Reading) {
    this.afs.doc<Reading>(`readings/${reading.id}`).update( this.makePureJSObject(reading) )
  }

  getReading(id: string): Observable<Reading> {
    //TODO Add storage
    return this.readingsCollection.doc(id).valueChanges() as Observable<Reading>
    
  }

  private makePureJSObject(reading) {
    return JSON.parse( JSON.stringify(reading) )
  }
}
