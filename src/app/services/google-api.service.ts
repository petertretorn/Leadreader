import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GoogleApiService {
  constructor(private http: HttpClient) {}

  url = "https://www.googleapis.com/books/v1/volumes?q=";

  searchBooks(term: string): Observable<any> {
    return this.http
      .get<any>(`${this.url}${term}`)
      .pipe(map(response => response.items));
  }
}
