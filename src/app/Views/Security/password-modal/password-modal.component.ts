import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/Models/Security/User.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css']
})
export class PasswordModalComponent implements OnInit {
  user: User;
  displayPassChangeModal:boolean;
  constructor( /* private regsUserService: SecurityService,
    private messageService: MessageService, */) 
    {

 }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  showPassModal() {
    this.displayPassChangeModal = !this.displayPassChangeModal;
  }

/*   search(form) {
    this.regsUserService.getUser(false, form.value.login, form.value.name, form.value.profile)
      .subscribe((result) => {
        this.users = result;
      }
    );
  } */
}
