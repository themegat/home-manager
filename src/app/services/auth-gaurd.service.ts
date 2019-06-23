import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isUserAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
