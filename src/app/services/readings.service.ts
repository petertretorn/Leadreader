import { Reading } from './../models/reading';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  readings: Reading[] = []

  constructor() { }

  createReading(reading: Reading): Observable<Reading> {
    //TODO  
    this.readings.push(reading)

    return of<Reading>( reading )
  }

  getReading(id: number): Observable<Reading> {
    //TODO Add storage
    return of<Reading>(this.readings[0])
  }
}
