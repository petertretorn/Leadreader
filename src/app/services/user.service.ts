import { Book } from './../models/book';
import { Reading } from './../models/reading';
import { ReadingsService } from './readings.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readings: Reading[] = []

  constructor(private readingsService: ReadingsService) { }

  createReading(book: Book) {

    let reading = new Reading(book)

    this.readingsService.createReading(reading).subscribe(reading => {
      this.readings.push(reading)
    })
  }
}
