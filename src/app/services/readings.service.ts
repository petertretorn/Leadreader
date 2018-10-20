import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from './auth.service';
import { Reading } from './../models/reading';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { QuoteNote } from 'src/app/models/quote-note';
import { map } from 'rxjs/operators';
import { share } from 'rxjs/internal/operators/share';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  public readings$: Observable<Reading[]>;
  private readingsCollection: AngularFirestoreCollection<Reading>;

  constructor(private readonly afs: AngularFirestore, private authService: AuthService) {
    this.afs = afs
    this.readingsCollection = afs.collection<Reading>('readings');
    
    this.readings$ = this.readingsCollection.valueChanges()
  }

  createReading(reading: Reading): Promise<void> {
    reading.userId = this.authService.readerId;

    const id = this.afs.createId()
    
    let obj = this.makePureJSObject(reading)
    obj = { ...obj, id}

    return this.readingsCollection.doc(id).set( { ...obj, id} )
  }

  getReadingsForUser(userId: string): Observable<Reading[]> {
    return this.afs.collection<Reading>('readings', ref => ref.where('userId', '==', userId)).valueChanges()
  }

  addNoteToReading(reading: Reading, note: QuoteNote) {
    note.id = this.afs.createId()

    let clone = { ...reading }
    clone.quoteNotes.push(note)

    this.updateReading(clone)
  }

  updateReading(reading: Reading): Promise<void> {
    return this.afs.doc<Reading>(`readings/${reading.id}`).update( this.makePureJSObject(reading) )
  }

  getReading(id: string): Observable<Reading> {
    return this.readingsCollection.doc(id).valueChanges() as Observable<Reading>
  }

  deleteReading(reading: Reading) {
    return this.afs.doc<Reading>(`readings/${reading.id}`).delete()
  }

  private makePureJSObject(reading) {
    return JSON.parse( JSON.stringify(reading) )
  }
}
