import { auth } from "firebase";
import { AuthService } from "./../../services/auth.service";
import { ReadingsService } from "./../../services/readings.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { GoogleApiService } from "../../services/google-api.service";
import { fromEvent, Subject, Subscription, pipe, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { filter } from "rxjs/internal/operators/filter";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { Book } from "../../models/book";
import { Reading } from "../../models/reading";
import { MatDialog } from '@angular/material';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { environment } from "src/environments/environment";

@Component({
  selector: "lr-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.scss"]
})
export class BookSearchComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  bookData: any[] = [];
  isSearching: boolean

  termSubject$ = new Subject<string>();

  constructor(
    private apiService: GoogleApiService,
    private readingsService: ReadingsService,
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {

    const input$ = this.termSubject$.pipe(
      filter(term => !!term),
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => this.isSearching = true)
    )

    this.subscription = this.apiService
      .lookaheadSearch(input$)
      .subscribe((bookData: any) => {
        this.handleBookData(bookData)
        this.isSearching = false
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleBookData(bookData: any) {
    Object.values(bookData).forEach((bd: any) => {
      if (!bd.volumeInfo.imageLinks) {
        bd.volumeInfo.imageLinks = {
          thumbnail: environment.defaultCover
        };
      }
    });
    this.bookData = bookData;
  }

  addManually() {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: "340px",
    });

    dialogRef.afterClosed().subscribe((book: Book) => {
      if (book) {
        book.imageUrl = book.imageUrl || environment.defaultCover
        this.createReading(book)
      }
    });
  }

  onAddClicked(volumeInfo: any) {
    const book = this.hydrateBook(volumeInfo)
    this.createReading(book)
  }

  createReading(book: Book) {
    const reading = new Reading(book);
    reading.dateCreated = new Date();

    this.readingsService.createReading(reading).then(_ => {
      this.router.navigate([`/app/readings/${this.auth.reader.uid}`], {
        queryParams: { readingId: reading.id }
      });
    });
  }

  hydrateBook(volumeInfo: any): Book {
    const title = !!volumeInfo.title ? volumeInfo.title : "no title";

    const author = !!volumeInfo.authors
      ? volumeInfo.authors.join(", ")
      : "no author";

    const categories = !!volumeInfo.categories
      ? volumeInfo.categories.join(", ")
      : "";

    const imageUrl = volumeInfo.imageLinks.thumbnail;

    const published = !!volumeInfo.publishedDate
      ? new Date(volumeInfo.publishedDate)
      : null;

    const publisher = !!volumeInfo.publisher
      ? volumeInfo.publisher
      : "publisher n/a";

    return {
      title,
      author,
      categories,
      imageUrl,
      published,
      publisher
    }
  }
}
