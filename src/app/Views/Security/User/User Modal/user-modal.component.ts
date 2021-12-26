import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../../../../Models/Security/User.model';
import { Profile } from '../../../../Models/Security/Profile.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  display: boolean = false;
  profile: Profile = new Profile();
  user: User;

  @Output() sendDataModal = new EventEmitter();
  @Input() profiles: Profile[] =[];

  constructor() {  }

  ngOnInit() {
    this.user = new User();
  }

  showDialog() {
    this.user = new User();
    this.display = !this.display;
  }

  addNewUser() {
    this.sendDataModal.emit(this.user);
    this.display = !this.display;
  }
}
