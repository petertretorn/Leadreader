import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe, Observable } from "rxjs";
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class GoogleApiService {
  constructor(private http: HttpClient) {}

  url = "https://www.googleapis.com/books/v1/volumes?q=";

  lookaheadSearch(serchTerm$: Observable<string>): any {
    return serchTerm$.pipe(
      filter(term => !!term),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( term => this.searchApi(term) )
    )
  }

  searchApi(term: string) {
    return this.http
      .get<any>(`${this.url}${term}`)
      .pipe(map(response => response.items))
  }
}
