import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(
      private router: Router,
      private securityService: SecurityService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let permission = next.data.permission;

    if (localStorage.getItem('token') !== null && localStorage.getItem('user') !== null) {
      return true;
    } else {
      this.securityService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
