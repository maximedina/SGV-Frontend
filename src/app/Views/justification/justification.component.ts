import { User } from 'src/app/Models/Security/User.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationLog } from '../../Models/Security/OperationLog.model';
import { MessageService } from 'primeng/api';

import { SecurityService } from '../../services/security.service';
import { Permission } from 'src/app/Models/Security/Permission.model';

@Component({
  selector: 'app-justification',
  templateUrl: './justification.component.html',
  styleUrls: ['./justification.component.css']
})
export class JustificationComponent implements OnInit {

  @Input() displayJustification: boolean = false;
  @Input() userJustification: User = new User();
  @Input() permissionDelete: Permission = new Permission();
  @Input() tableName: string;
  @Input() valueId: string;
  @Output() sendDataModal = new EventEmitter();
  @Output() justificationSuccess: boolean = false;
  public justification: string = "";
  user: User = new User();


  constructor(private messageService: MessageService, private logOperation: SecurityService) { }

  ngOnInit() {
    this.justification = "";
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  showDialog() {
    this.justification = "";
    this.displayJustification = !this.displayJustification;
  }

  close(success) {
    this.justification = '';
    this.sendDataModal.emit(success);
  }

  // Form of Modal to Add
  save(form: OperationLog) {
    form.user = this.user;
    form.permission = this.permissionDelete;
    form.tableName = this.tableName;
    form.valueId = this.valueId;

    this.logOperation.addLog(form).subscribe((result) => {
      if(result == null) {
        this.justification = '';
        this.close(true);
      }
    },
    (error: HttpErrorResponse) => {
      if(error.status === 400 || error.status === 404) {
        this.justificationSuccess = false;
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        this.close(false);
      }
    });

  }

}
