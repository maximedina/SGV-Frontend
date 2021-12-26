import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Permission } from '../../../../Models/Security/Permission.model';
import { SystemModule } from '../../../../Models/Security/SystemModule.model';
import { Profile } from '../../../../Models/Security/Profile.model';
import { SecurityService } from '../../../../services/security.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css'],
  providers: [MessageService]
})
export class ProfileModalComponent implements OnInit {
  cols: any;
  display: boolean;
  optionsPicklist: boolean = true;

  @Input() profile : Profile;
  @Input() profiles;

  permissions: Permission[] = [];
  permissionsAssociated: Permission[] = [];
  saveAssociate: Profile[] = [];
  deleteAssociate: Profile[] = [];
  systemModules: SystemModule[] = [];

  constructor(private SecurityService: SecurityService, private messageService: MessageService) {
    this.systemModules = [];
    this.permissions = [];
    this.saveAssociate = [];
    this.deleteAssociate = [];
    this.permissionsAssociated = [];
  }

  ngOnInit() {
    this.cols = [
      { field: 'sistemModuleId', header: 'Módulos' },
    ];
  }

  reset() {
    this.systemModules = [];
    this.permissions = [];
    this.saveAssociate = [];
    this.deleteAssociate = [];
    this.permissionsAssociated = [];
  }

  showDialog() {
    this.getSystemModules();
    this.display = !this.display;
    // limpiar campos
    this.reset();
  }

  getSystemModules() {
    this.SecurityService.getSystemModules().subscribe(
      (data) => {
        this.systemModules = data;
      }
    );
  }

  //Permission available
  getAssociatedPermissions (rowData) {
    this.SecurityService.getPermissionAssociated(this.profile).subscribe(
      (data) => {
        this.permissions = data;
      }
    );

    this.getPermission(rowData);
    this.optionsPicklist = !this.optionsPicklist;
  }

  //permission associated
  getPermission(rowData) {
    this.SecurityService.getPermission(this.profile.profileId, rowData.systemModuleId).subscribe(
      (data) => {
        this.permissionsAssociated = data;
      }
    );
  }

  associatePermission(event: any) {
    this.SecurityService.associatePermission(this.profile, event.items[0]).subscribe(
      (data) => {
        this.saveAssociate = data;
        this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Permiso asociado con el éxito!'});
      }, (error: HttpErrorResponse) => {
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
      }
    );
  }

  disassociatePermission(event: any) {
    this.SecurityService.disassociatePermission(this.profile, event.items[0]).subscribe(
      (data) => {
        this.deleteAssociate = data;
        this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Permiso disociado con éxito!'});
      }, (error: HttpErrorResponse) => {
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
      }
    );
  }
}
