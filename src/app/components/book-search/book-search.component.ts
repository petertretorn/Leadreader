import { auth } from "firebase";
import { AuthService } from "./../../services/auth.service";
import { ReadingsService } from "./../../services/readings.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { GoogleApiService } from "../../services/google-api.service";
import { fromEvent, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { filter } from "rxjs/internal/operators/filter";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { Book } from "../../models/book";
import { Reading } from "../../models/reading";

@Component({
  selector: "lr-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.scss"]
})
export class BookSearchComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  bookData: any[] = [];

  subject$ = new Subject<string>();

  constructor(
    private apiService: GoogleApiService,
    private readingsService: ReadingsService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.apiService
      .lookAheadSearch(this.subject$)
      .subscribe((bookData: any) => {
        console.log("lookAheadSearch");
        this.handleBookDate(bookData);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleBookDate(bookData: any) {
    Object.values(bookData).forEach((bd: any) => {
      if (!bd.volumeInfo.imageLinks) {
        bd.volumeInfo.imageLinks = {
          thumbnail: "assets/images/no_cover.jpg"
        };
      }
    });
    this.bookData = bookData;
  }

  addReading(volumeInfo: any) {
    const book = this.hydrateBook(volumeInfo)
    const reading = new Reading(book);
    reading.dateCreated = new Date();

    this.readingsService.createReading(reading).then(_ => {
      this.router.navigate([`/app/readings/${this.auth.reader.uid}`], {
        queryParams: { readingId: reading.id }
      });
    });
  }

  hydrateBook(volumeInfo: any) {
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

    const book: Book = {
      title,
      author,
      categories,
      imageUrl,
      published,
      publisher
    };

    return book;
  }
}
