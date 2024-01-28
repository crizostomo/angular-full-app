import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean | UrlTree {
    if (this.authService.isAuth()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuth()) {
      return true;
    } else {
      // Redirect to the login page using UrlTree
      return this.router.createUrlTree(['/login']);
    }
  }
}
