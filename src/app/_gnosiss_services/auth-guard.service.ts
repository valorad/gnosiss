import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service'; 

@Injectable()
export class AuthGuardService implements CanActivate  {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }

  canActivate() {
    // user not logged in will be sent to (login page but now homepage)
    if (!this.authService.loggedIn()) {
      this.authService.login();
      return false;
    }
    return true;
  }

}
