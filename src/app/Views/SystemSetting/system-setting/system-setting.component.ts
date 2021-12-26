import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SystemSettingService } from '../../../services/system-setting.service';
import { SystemSetting } from '../../../Models/Security/SystemSetting.model';
import { SystemModule } from '../../../Models/Security/SystemModule.model';

import { SecurityService } from '../../../services/security.service';
import { User } from '../../../Models/Security/User.model';
import { Permission } from 'src/app/Models/Security/Permission.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SystemSettingComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  cols: any[];
  systemSettings: SystemSetting[];
  systemSettingClone: SystemSetting[] = [];

  modules: SystemModule[] = [];
  module: SystemModule = new SystemModule();

  user: User = new User();
  displayJustification: boolean = false;
  private indexDelete: number = 0;
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionDelete: boolean = false;

  constructor(
    private systemSettingService: SystemSettingService,
    private messageService: MessageService,
    private authenticate: SecurityService
  ){
    this.modules = [];
    this.module = new SystemModule();
  }

  ngOnInit() {
    this.permissionCreate = this.authenticate.getPermissionLS('CREAR_PARAMETRO_SISTEMA')
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_PARAMETRO_SISTEMA');

    if (this.authenticate.hasPermission('CREAR_PARAMETRO_SISTEMA')) {
      this.hasPermissionCreate = true;
    }

    if (this.authenticate.hasPermission('BORRAR_PARAMETRO_SISTEMA')) {
      this.hasPermissionDelete = true;
    }

    this.cols = [
      {field: 'key', header: 'Clave'},
      {field: 'value', header: 'Valor'},
      {field: 'module.name', header: 'Módulo'}
    ];

    this.systemSettingService.listAllSystemModule().subscribe((result) => {
        this.modules = result;
      }
    );

    this.listSystemSetting();
  }

  editSystemSetting(systemSetting: SystemSetting) {
    this.systemSettingClone[systemSetting.systemSettingId] = {...systemSetting};
  }

  cancelSystemSetting(systemSetting: SystemSetting, index: number) {
    this.systemSettings[index] = this.systemSettingClone[systemSetting.systemSettingId];
    delete this.systemSettingClone[systemSetting.systemSettingId];
  };

  listSystemSetting() {
    this.systemSettingService.getListSystemSetting(null, 0, false).subscribe((result) => {
        this.systemSettings = result;
    });
  };

  addNewSystemSetting(systemSetting: SystemSetting) {
    this.blockUI.start();
    this.systemSettingService.addSystemSetting(systemSetting).subscribe((result) => {
        if(result == null) {
          this.listSystemSetting();
          this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registros agregado con éxito.' });
        }
          this.blockUI.stop();
    },
      (error: HttpErrorResponse) => {
        this.blockUI.stop();
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );
  };

  updateSystemSetting(systemSetting: SystemSetting, index) {
    this.blockUI.start();
    this.systemSettingService.updateSystemSetting(systemSetting).subscribe((result) => {
        if(result == null) {
          this.systemSettings.concat(systemSetting);
          this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registro actualizado con éxito.' });
        }
          this.blockUI.stop();
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.cancelSystemSetting(systemSetting, index);
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
          this.blockUI.stop();
      }
    );
  }

  deleteSystemSetting(index: number) {
    let setting = this.systemSettings[index];
    this.systemSettingService.deleteSystemSetting(setting)
      .subscribe((result) => {
        if(result == null) {
          this.systemSettings.splice(index, 1);
          this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registro borrado con éxito.' });
        }
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );
  }

  onJustification(index: number){
    this.indexDelete = index;
    this.displayJustification = true;
  }

  returnJustification(ret) {
    if (ret) {
      this.deleteSystemSetting(this.indexDelete);
    }
    this.displayJustification = false;
  }

}
