import { Reading } from './../models/reading';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { QuoteNote } from 'src/app/models/quote-note';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  readings: Reading[] = []

  currentReading: Reading

  private readingsCollection: AngularFirestoreCollection<Reading>;

  constructor(private readonly afs: AngularFirestore) {
    this.readingsCollection = afs.collection<Reading>('readings');
   }

  createReading(reading: Reading): Observable<Reading> {
    const id = this.afs.createId()
    
    let obj = this.makePureJSObject(reading)
    obj = { ...obj, id}

    this.readingsCollection.doc(id).set( { ...obj, id} ).then( 
      (res) => console.log(res, 'saved to firestore'))

    this.readings.push(reading)

    return of<Reading>( reading )
  }

  addQuoteNote(qnote: QuoteNote) {

  }

  getReading(id: number): Observable<Reading> {
    //TODO Add storage
    return of<Reading>(this.readings[0])
  }

  private makePureJSObject(reading) {
    return JSON.parse( JSON.stringify(reading) )
  }
}
