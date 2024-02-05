import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    //private authService: AuthService,
    private store: Store<fromRoot.State>,
    private router: Router) {}

  canLoad(route: Route) {
    //if (this.authService.isAuth()) {
    //  return true;
    //} else {
    //  return this.router.createUrlTree(['/login']);
    //}
    return this.store.select(fromRoot.getIsAuth);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if (this.authService.isAuth()) {
    //  return true;
    //} else {
    //  // Redirect to the login page using UrlTree
    //  return this.router.createUrlTree(['/login']);
    //}
    return this.store.select(fromRoot.getIsAuth);
  }
}
