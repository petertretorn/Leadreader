import { Reader } from "./../models/reader";
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.reader$.pipe(
      take(1),
      map(user => !user),
      tap(notloggedIn => {
        if (!notloggedIn) {
          this.router.navigate(['/app/search-book']);
        }
      })
    );
  }
}
