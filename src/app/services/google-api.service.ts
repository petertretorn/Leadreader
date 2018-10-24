import { tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe, Observable } from "rxjs";
import { map, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

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
      switchMap( term => this.http.get<any>(`${this.url}${term}`)),
      map(response => response.items) 
    )
  }

  searchApi(term: string) {
    return this.http
      .get<any>(`${this.url}${term}`)
      .pipe(map(response => response.items))
  }
}
