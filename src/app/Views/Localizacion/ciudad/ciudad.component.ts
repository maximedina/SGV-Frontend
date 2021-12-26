import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { SecurityService } from '../../../services/security.service';
import { Permission } from '../../../Models/Security/Permission.model';
import { Provincia } from '../../../Models/Localizacion/Provincia.model';
import { Ciudad } from '../../../Models/Localizacion/Ciudad.model';
import { LocalizacionService } from '../../../services/localizacion.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css'],
  providers: [MessageService]

 })
 export class CiudadComponent implements OnInit {
  disabled: boolean;
  cols: any;
  display: boolean = false;

  btnAddCiudad : MenuItem[];

  provincias: Provincia[] =[];
  provincia: Provincia = new Provincia();

  newCiudad: any;
  ciudades: Ciudad[];
  ciudad: Ciudad;
  clonedCiudades: Ciudad[] = [];

  displayJustification: boolean = false;
  private indexDelete: number = 0;
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionDelete: boolean = false;

  constructor(
    private regsUserService: SecurityService,
    private ciudadService: LocalizacionService,
    private messageService: MessageService,
    private authenticate: SecurityService
  ) {

    this.ciudades = [];
    this.newCiudad;

    this.provincias = [];
    this.provincia = new Provincia();
  }

  ngOnInit() {

    this.permissionCreate = this.authenticate.getPermissionLS('CREAR_CIUDAD');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_CIUDAD');

    if (this.authenticate.hasPermission('CREAR_CIUDAD')) {
      this.hasPermissionCreate = true;
    }

    if (this.authenticate.hasPermission('BORRAR_CIUDAD')) {
      this.hasPermissionDelete = true;
    }

    this.ciudadService.getCiudades().subscribe(
      (data) => {
        this.ciudades = data;
      }
    );

    this.ciudadService.getProvincias().subscribe(
      (data) => {
        this.provincias = data;
      }
    );

    this.ciudad = new Ciudad();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'provincia', header: 'Provincia' },
    ];

  }
  buttonSearch(disabled: boolean) {
    return this.disabled = false;
  }

  // Disable Button Search
  disableButtonSearch() {
    const buttonSearch = this.search;
    if(!buttonSearch) {
    }
  }

  /* Button Search */
  search(form) {
    this.ciudadService.getCiudad(false, form.value.nombre, form.value.provincia)
      .subscribe((result) => {
        this.ciudades = result;
      }
    );
  }

  /* Save Modal */
  addNewCiudad(ciudad: Ciudad) {
    this.ciudadService.addCiudad(ciudad).subscribe((result) => {
      if (result == null) {
        this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Ciudad guardada con éxito.'});
        this.ciudadService.getCiudades().subscribe(
          (data) => {
            this.ciudades = data;
          }
        );
      }
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );

  }

   // Save
   updateCiudad(ciudad: Ciudad, index: number) {
    this.ciudadService.updateCiudad(ciudad).subscribe(() => {
      this.ciudades.concat(ciudad);
      this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Ciudad actualizada con éxito.'});
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.onRowEditCancel(ciudad, index);
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );

  }

  showDialogToAdd() {
    this.display = !this.display;
  }
  
  // Edit
  onRowEditInit(ciudad : Ciudad) {
    this.clonedCiudades[ciudad.id] = {...ciudad};
  }

  //Calcel
  onRowEditCancel(ciudad: Ciudad, index: number) {
    this.ciudades[index] = this.clonedCiudades[ciudad.id];
    delete this.clonedCiudades[ciudad.id];
  }

   //Delete
   deleteCiudad(index: number) {
    let ciudad = this.ciudad[index];
    this.ciudadService.deleteCiudad(ciudad).subscribe((result) => {
      if( result == null) {
        this.ciudades.splice(index, 1);
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
      this.deleteCiudad(this.indexDelete);
    }
    this.displayJustification = false;
  }

}