import { Component, OnInit, HostListener } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { User } from '../../../Models/Security/User.model';
import { SecurityService } from '../../../services/security.service';
import { Permission } from '../../../Models/Security/Permission.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ItemService } from '../../../services/item.service';
import { Grupo } from '../../../Models/Items/Grupo.model';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css'],
  providers: [MessageService]
})
export class GrupoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  cols: any[];
  grupos: Grupo[];
  grupoClone: Grupo[] = [];

  // Justification
  displayJustification: boolean = false;
  private indexDelete: number = 0;
  user: User = new User();
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionRead: boolean = false;
  hasPermissionDelete: boolean = false;

  loading : boolean = false;
  screenWidth:any;
  screenHeight:any;
  scrollHeight: any;

  constructor(
    private grupoService: ItemService,
    private messageService: MessageService,
    private authenticate: SecurityService,
    private securityService : SecurityService
  ) {this.onResize(); }

  ngOnInit() {

    //Justification
    this.permissionCreate = this.securityService.getPermissionLS('CREAR_GRUPO');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_GRUPO');

    if(this.securityService.hasPermission('CREAR_GRUPO')){
      this.hasPermissionCreate = true;
    }
    if(this.securityService.hasPermission('BORRAR_GRUPO')){
      this.hasPermissionDelete = true;
    }

    this.cols = [
      { field: 'nombre', header: 'Nombre'},
      { field: 'descripcion', header: 'Descripción'},
    ];
    this.getGrupo();
  }

  cancelGrupo(grupo: Grupo, index: number) {
    this.grupos[index] = this.grupoClone[grupo.id];
    delete this.grupoClone[grupo.id];
  };

  editGrupo(grupo: Grupo) {
    this.grupoClone[grupo.id] = {...grupo};
  };

  searchGrupos(form) {
    this.loading = true;
    this.grupos = [];
    this.grupoService.getGrupo(false, form.value.nombre, form.value.descripcion).subscribe((result) => {
      setTimeout(() => {
        this.loading = false;
        this.grupos = result
      }, 1000);
    });
  }

  getGrupo() {
    this.loading = true;
    this.grupos = [];
    this.grupoService.getGrupo(false, "", "")
      .subscribe((result) => {
        setTimeout(() => {
          this.loading = false;
          this.grupos = result
        }, 1000);
      });
  }

  addNewGrupo(grupo: Grupo) {
    this.blockUI.start();
    this.grupoService.addGrupo(grupo).subscribe((result) => {
        if(result == null) {
          this.grupoService.getGrupo(false, "", "").subscribe((result) => {
            this.grupos = result;
          });
          this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registro agregado con éxito.' });
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

  updateGrupo(grupo: Grupo, index: number) {
    this.blockUI.start();
    this.grupoService.updateGrupo(grupo).subscribe((result) => {
      if(result == null) {
        this.grupos.concat(grupo);
        this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registro actualizado con éxito.' });
      }
        this.blockUI.stop();
    },
    (error: HttpErrorResponse) => {
      if(error.status === 400 || error.status === 404) {
        this.cancelGrupo(grupo, index);
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
      }
        this.blockUI.stop();
    }
    );
  };

  deleteGrupo(index: number) {
    let grupo = this.grupos[index];
    this.grupoService.deleteGrupo(grupo).subscribe((result) => {
      if( result == null) {
        this.grupos.splice(index, 1);
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
      this.deleteGrupo(this.indexDelete);
    }
    this.displayJustification = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
  this.screenHeight = window.innerHeight;
  this.screenWidth = window.innerWidth;
  this.scrollHeight = this.screenHeight - 380;

  this.scrollHeight += "px";
  }

}
