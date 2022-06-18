
import { Store } from '@ngrx/store';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.store';
import { validUserSelector } from 'src/app/store/auth/auth.selectors';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.pipe(
      map((state) => validUserSelector(state)),
      map((isValidUser: boolean) => {
        if (isValidUser) {
          return true;
        }
        return this.router.createUrlTree(['']);
      })
    );
  }
}
