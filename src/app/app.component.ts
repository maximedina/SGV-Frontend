import { Component } from '@angular/core';
import { SecurityService } from './services/security.service';
import { User } from './Models/Security/User.model';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  subscription: Subscription;
  user: User = new User();
  permissions: any[];

  constructor(
      private router: Router,
      private security: SecurityService
    ) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if(!router.navigated && this.security.isLoggedIn()) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.security.getPermissionAssociated(this.user.profile).subscribe(
              (result) => {
                  this.permissions = result;
                  localStorage.setItem('permissions', JSON.stringify(this.permissions));
              },
              error => {

              }
            );

          }
        }
    });
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}