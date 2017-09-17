import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authSerivce: AuthService) { }

  canActivate() {
    if (this.authSerivce.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
