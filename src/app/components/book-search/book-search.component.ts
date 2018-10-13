import { ReadingsService } from './../../services/readings.service';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { GoogleApiService } from "../../services/google-api.service";
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { filter } from "rxjs/internal/operators/filter";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { tap } from "rxjs/internal/operators/tap";
import { Key } from "selenium-webdriver";
import { Book } from '../../models/book';
import { Reading } from '../../models/reading';

@Component({
  selector: "lr-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.css"]
})
export class BookSearchComponent implements OnInit {
  bookData: any[] = [];
  searchTerm: string;
  constructor(
    private apiService: GoogleApiService, 
    private readingsService: ReadingsService,
    private router: Router) {}

  ngOnInit() {}

  search() {
    this.bookData = null;

    this.apiService.searchBooks(this.searchTerm).subscribe((bookData: any) => {
      console.log(bookData)
      
      Object.values(bookData).forEach( (bd: any) => {
        console.log(bd.volumeInfo.title);
        if (!bd.volumeInfo.imageLinks) {
          bd.volumeInfo.imageLinks = {
            thumbnail: "assets/images/no_cover.jpg"
          };
        }
      });

      this.bookData = bookData;
    });
  }

  addReading(volumeInfo: any) {
    let title = !!volumeInfo.title ? volumeInfo.title : 'no title'
    let author = !!volumeInfo.authors ? volumeInfo.authors.join(', ') : 'no author'
    let categories = !!volumeInfo.categories ? volumeInfo.categories.join(', ') : ''
    let imageUrl = volumeInfo.imageLinks.thumbnail

    let book = new Book(title, author, categories, imageUrl)
    let reading = new Reading(book)

    this.readingsService.createReading(reading).subscribe(
      reading => this.router.navigate([`/app/reading-detail/${reading.id}`])
    )
  }
}
