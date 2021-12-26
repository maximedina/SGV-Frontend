import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap'; // call tap exactly this way, otherwise it will conflict with Observable.
import { SecurityService } from '../services/security.service';


@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private securityService: SecurityService
    ) { }

    // This method will intercept all http requisitions fired from the client
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') !== null && localStorage.getItem('user') !== null) { // If user is logged in
            const cloneReq = req.clone({ // clone the requisition and adds a header in it.
                headers: req.headers.set('sessionToken', localStorage.getItem('token'))
            });
            return next.handle(cloneReq).pipe( // pipe: handle requisitions
                tap( // tap stacks requisitions handled in the pipe method.
                    succ => { },
                    err => {
                        if (err.status === 401) {
                            this.router.navigate(['/login']);
                            this.securityService.logout();
                        }
                    }
                )
            );
        } else {
            return next.handle(req.clone());
        }
    }
}
