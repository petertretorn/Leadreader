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

@Component({
  selector: "lr-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.css"]
})
export class BookSearchComponent implements OnInit {
  bookData: any[] = [];
  searchTerm: string;
  constructor(private apiService: GoogleApiService) {}

  ngOnInit() {}

  search() {
    this.bookData = null;

    this.apiService.searchBooks(this.searchTerm).subscribe(bookData => {
      console.log(bookData)
      
      Object.values(bookData).forEach(bd => {
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
}
