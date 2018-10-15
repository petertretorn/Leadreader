import { Observable } from 'rxjs/internal/Observable';
import { ReadingsService } from "./../services/readings.service";
import { Reading } from "./../models/reading";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router/src/router_state";
import { of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ReadingsResolver implements Resolve<Reading[]> {
  constructor(private readingsService: ReadingsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Reading[]> {
    const userId = route.params.userId;
    console.log('ReadingsResolver')

    return this.readingsService.getReadigsForUser(userId)
        
    
    
  }
}
