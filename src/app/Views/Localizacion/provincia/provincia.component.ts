import { Component, OnInit, HostListener } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { User } from '../../../Models/Security/User.model';
import { SecurityService } from '../../../services/security.service';
import { Permission } from '../../../Models/Security/Permission.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LocalizacionService } from '../../../services/localizacion.service';
import { Provincia } from '../../../Models/Localizacion/Provincia.model';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css'],
  providers: [MessageService]
})
export class ProvinciaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  cols: any[];
  provincias: Provincia[];
  provinciaClone: Provincia[] = [];

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
    private provinciaService: LocalizacionService,
    private messageService: MessageService,
    private authenticate: SecurityService,
    private securityService : SecurityService
  ) {this.onResize(); }

  ngOnInit() {

    //Justification
    this.permissionCreate = this.securityService.getPermissionLS('CREAR_PROVINCIA');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_PROVINCIA');

    if(this.securityService.hasPermission('CREAR_PROVINCIA')){
      this.hasPermissionCreate = true;
    }
    if(this.securityService.hasPermission('BORRAR_PROVINCIA')){
      this.hasPermissionDelete = true;
    }

    this.cols = [
      { field: 'nombre', header: 'Nombre'},
    ];
    this.getProvincia();
  }

  cancelProvincia(provincia: Provincia, index: number) {
    this.provincias[index] = this.provinciaClone[provincia.id];
    delete this.provinciaClone[provincia.id];
  };

  editProvincia(provincia: Provincia) {
    this.provinciaClone[provincia.id] = {...provincia};
  };

  searchProvincias(form) {
    this.loading = true;
    this.provincias = [];
    this.provinciaService.getProvincia(false, form.value.nombre).subscribe((result) => {
      setTimeout(() => {
        this.loading = false;
        this.provincias = result
      }, 1000);
    });
  }

  getProvincia() {
    this.loading = true;
    this.provincias = [];
    this.provinciaService.getProvincia(false, "")
      .subscribe((result) => {
        setTimeout(() => {
          this.loading = false;
          this.provincias = result
        }, 1000);
      });
  }

  addNewProvincia(provincia: Provincia) {
    this.blockUI.start();
    this.provinciaService.addProvincia(provincia).subscribe((result) => {
        if(result == null) {
          this.provinciaService.getProvincia(false, "").subscribe((result) => {
            this.provincias = result;
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

  updateProvincia(provincia: Provincia, index: number) {
    this.blockUI.start();
    this.provinciaService.updateProvincia(provincia).subscribe((result) => {
      if(result == null) {
        this.provincias.concat(provincia);
        this.messageService.add({ key: 'alert', severity: 'success', summary: 'Éxito', detail: 'Registro actualizado con éxito.' });
      }
        this.blockUI.stop();
    },
    (error: HttpErrorResponse) => {
      if(error.status === 400 || error.status === 404) {
        this.cancelProvincia(provincia, index);
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
      }
        this.blockUI.stop();
    }
    );
  };

  deleteProvincia(index: number) {
    let provincia = this.provincias[index];
    this.provinciaService.deleteProvincia(provincia).subscribe((result) => {
      if( result == null) {
        this.provincias.splice(index, 1);
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
      this.deleteProvincia(this.indexDelete);
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