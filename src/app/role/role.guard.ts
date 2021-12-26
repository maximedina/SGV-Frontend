import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate  {

    constructor(
      private router: Router,
      private securityService: SecurityService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let permission = next.data.permission;

    // check if user has permission to access that route
    if(typeof(permission) != 'undefined' && !this.securityService.hasPermission(permission) && window.location.pathname != '/' ) {
      sessionStorage.setItem('permissionDenied', 'true');
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
    
}
