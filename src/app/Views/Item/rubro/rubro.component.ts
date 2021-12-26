import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { SecurityService } from '../../../services/security.service';
import { Permission } from '../../../Models/Security/Permission.model';
import { Grupo } from 'src/app/Models/Items/Grupo.model';
import { Rubro } from 'src/app/Models/Items/Rubro.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css'],
  providers: [MessageService]

 })
 export class RubroComponent implements OnInit {
  disabled: boolean;
  cols: any;
  display: boolean = false;

  btnAddRubro : MenuItem[];

  grupos: Grupo[] =[];
  grupo: Grupo = new Grupo();

  newRubro: any;
  rubros: Rubro[];
  rubro: Rubro;
  clonedRubros: Rubro[] = [];

  displayJustification: boolean = false;
  private indexDelete: number = 0;
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionDelete: boolean = false;

  constructor(
    private regsUserService: SecurityService,
    private rubroService: ItemService,
    private messageService: MessageService,
    private authenticate: SecurityService
  ) {

    this.rubros = [];
    this.newRubro;

    this.grupos = [];
    this.grupo = new Grupo();
  }

  ngOnInit() {

    this.permissionCreate = this.authenticate.getPermissionLS('CREAR_RUBRO');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_RUBRO');

    if (this.authenticate.hasPermission('CREAR_RUBRO')) {
      this.hasPermissionCreate = true;
    }

    if (this.authenticate.hasPermission('BORRAR_RUBRO')) {
      this.hasPermissionDelete = true;
    }

    this.rubroService.getRubros().subscribe(
      (data) => {
        this.rubros = data;
      }
    );

    this.rubroService.getGrupos().subscribe(
      (data) => {
        this.grupos = data;
      }
    );

    this.rubro = new Rubro();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'grupo', header: 'Grupo' },
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
    this.rubroService.getRubro(false, form.value.nombre, form.value.descripcion, form.value.grupo)
      .subscribe((result) => {
        this.rubros = result;
      }
    );
  }

  /* Save Modal */
  addNewRubro(rubro: Rubro) {
    this.rubroService.addRubro(rubro).subscribe((result) => {
      if (result == null) {
        this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Rubro guardado con éxito.'});
        this.rubroService.getRubros().subscribe(
          (data) => {
            this.rubros = data;
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
   updateRubro(rubro: Rubro, index: number) {
    this.rubroService.updateRubro(rubro).subscribe(() => {
      this.rubros.concat(rubro);
      this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Rubro actualizado con éxito.'});
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.onRowEditCancel(rubro, index);
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );

  }

  showDialogToAdd() {
    this.display = !this.display;
  }
  // Edit
  onRowEditInit(rubro : Rubro) {
    this.clonedRubros[rubro.id] = {...rubro};
  }

  //Calcel
  onRowEditCancel(rubro: Rubro, index: number) {
    this.rubros[index] = this.clonedRubros[rubro.id];
    delete this.clonedRubros[rubro.id];
  }

   //Delete
   deleteRubro(index: number) {
    let rubro = this.rubros[index];
    this.rubroService.deleteRubro(rubro).subscribe((result) => {
      if( result == null) {
        this.rubros.splice(index, 1);
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
      this.deleteRubro(this.indexDelete);
    }
    this.displayJustification = false;
  }

}