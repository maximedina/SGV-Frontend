import { Component, OnInit, HostListener } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { User } from '../../../Models/Security/User.model';
import { SecurityService } from '../../../services/security.service';
import { Permission } from '../../../Models/Security/Permission.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Tipo } from '../../../Models/Items/Tipo.model';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],
  providers: [MessageService]
})
export class TipoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  cols: any[];
  tipos: Tipo[];
  tipoClone: Tipo[] = [];

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
    private tipoService: ItemService,
    private messageService: MessageService,
    private authenticate: SecurityService,
    private securityService : SecurityService
  ) {this.onResize(); }

  ngOnInit() {

    //Justification
    this.permissionCreate = this.securityService.getPermissionLS('CREAR_TIPO');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_TIPO');

    if(this.securityService.hasPermission('CREAR_TIPO')){
      this.hasPermissionCreate = true;
    }
    if(this.securityService.hasPermission('BORRAR_TIPO')){
      this.hasPermissionDelete = true;
    }

    this.cols = [
      { field: 'nombre', header: 'Nombre'},
      { field: 'descripcion', header: 'Descripción'},
    ];
    this.getTipo();
  }

  cancelTipo(tipo: Tipo, index: number) {
    this.tipos[index] = this.tipoClone[tipo.id];
    delete this.tipoClone[tipo.id];
  };

  editTipo(tipo: Tipo) {
    this.tipoClone[tipo.id] = {...tipo};
  };

  searchTipos(form) {
    this.loading = true;
    this.tipos = [];
    this.tipoService.getTipo(false, form.value.nombre, form.value.descripcion).subscribe((result) => {
      setTimeout(() => {
        this.loading = false;
        this.tipos = result
      }, 1000);
    });
  }

  getTipo() {
    this.loading = true;
    this.tipos = [];
    this.tipoService.getTipo(false, "", "")
      .subscribe((result) => {
        setTimeout(() => {
          this.loading = false;
          this.tipos = result
        }, 1000);
      });
  }

  addNewTipo(tipo: Tipo) {
    this.blockUI.start();
    this.tipoService.addTipo(tipo).subscribe((result) => {
        if(result == null) {
          this.tipoService.getTipo(false, "", "").subscribe((result) => {
            this.tipos = result;
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

  updateTipo(tipo: Tipo, index: number) {
    this.blockUI.start();
    this.tipoService.updateTipo(tipo).subscribe((result) => {
      if(result == null) {
        this.tipos.concat(tipo);
        this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registro actualizado con éxito.' });
      }
        this.blockUI.stop();
    },
    (error: HttpErrorResponse) => {
      if(error.status === 400 || error.status === 404) {
        this.cancelTipo(tipo, index);
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
      }
        this.blockUI.stop();
    }
    );
  };

  deleteTipo(index: number) {
    let tipo = this.tipos[index];
    this.tipoService.deleteTipo(tipo).subscribe((result) => {
      if( result == null) {
        this.tipos.splice(index, 1);
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
      this.deleteTipo(this.indexDelete);
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