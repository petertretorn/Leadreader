import { Observable } from 'rxjs/internal/Observable';
import { Book } from './../models/book';
import { Reading } from './../models/reading';
import { ReadingsService } from './readings.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // readings: Reading[] = []

  constructor(private readingsService: ReadingsService) { }

  createReading(book: Book): Observable<Reading> {

    let reading = new Reading(book)

    return this.readingsService.createReading(reading)
  }
}
