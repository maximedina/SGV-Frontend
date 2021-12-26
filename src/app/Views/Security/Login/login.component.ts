import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from "../../../services/security.service";
import { MessageService } from 'primeng/api';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NavbarComponent } from '../../Layout/Navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  errorMsg: string;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private router: Router,
    private navbarComponent: NavbarComponent,
    private securityService: SecurityService,
    private messageService: MessageService,
  ){}

  ngOnInit() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
  }

  OnSubmit(form) {
    this.blockUI.start("Cargando permisos...");
    this.errorMsg = undefined;
    this.securityService.authenticate(form.value.UserName, form.value.Password)
      .subscribe(
        (session: any) => {
          this.router.navigateByUrl('/turnos');
          this.navbarComponent.buildMenu(); // this function calls buildMenu()
          this.blockUI.stop();
        },
        (error => {
          this.blockUI.stop();
          this.messageService.add({severity:'error', summary:'Error', detail: 'Usuario o contraseña invalidos'});
        })
      );
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
