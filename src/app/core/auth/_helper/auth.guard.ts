import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentToken = this.authenticationService.currentUser;
    if (currentToken) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authenticationService.logout();
    return false;
  }
}
