import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { SecurityService } from '../../../services/security.service';
import { Permission } from '../../../Models/Security/Permission.model';
import { Categoria } from '../../../Models/Items/Categoria.model';
import { ItemService } from '../../../services/item.service';
import { Rubro } from '../../../Models/Items/Rubro.model';
import {CascadeSelectModule} from 'primeng/cascadeselect';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [MessageService]

 })
 export class CategoriaComponent implements OnInit {
  disabled: boolean;
  cols: any;
  display: boolean = false;

  btnAddCategoria : MenuItem[];

  rubros: Rubro[] =[];
  rubro: Rubro = new Rubro();

  newCategoria: any;
  categorias: Categoria[];
  categoria: Categoria;
  clonedCategorias: Categoria[] = [];

  displayJustification: boolean = false;
  private indexDelete: number = 0;
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionDelete: boolean = false;

  constructor(
    private categoriaService: ItemService,
    private messageService: MessageService,
    private authenticate: SecurityService
  ) {

    this.categorias = [];
    this.newCategoria;

    this.rubros = [];
    this.rubro = new Rubro();
  }

  ngOnInit() {

    this.permissionCreate = this.authenticate.getPermissionLS('CREAR_CATEGORIA');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_CATEGORIA');

    if (this.authenticate.hasPermission('CREAR_CATEGORIA')) {
      this.hasPermissionCreate = true;
    }

    if (this.authenticate.hasPermission('BORRAR_CATEGORIA')) {
      this.hasPermissionDelete = true;
    }

    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      }
    );

    this.categoriaService.getRubros().subscribe(
      (data) => {
        this.rubros = data;
      }
    );

    this.categoria = new Categoria();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'rubro', header: 'Rubro' },
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
    this.categoriaService.getCategoria(false, form.value.nombre, form.value.descripcion, form.value.rubro)
      .subscribe((result) => {
        this.categorias = result;
      }
    );
  }

  /* Save Modal */
  addNewCategoria(categoria: Categoria) {
    this.categoriaService.addCategoria(categoria).subscribe((result) => {
      if (result == null) {
        this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Categoria guardado con éxito.'});
        this.categoriaService.getCategorias().subscribe(
          (data) => {
            this.categorias = data;
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
   updateCategoria(categoria: Categoria, index: number) {
    this.categoriaService.updateCategoria(categoria).subscribe(() => {
      this.categorias.concat(categoria);
      this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Categoria actualizado con éxito.'});
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.onRowEditCancel(categoria, index);
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );

  }

  showDialogToAdd() {
    this.display = !this.display;
  }
  // Edit
  onRowEditInit(categoria : Categoria) {
    this.clonedCategorias[categoria.id] = {...categoria};
  }

  //Calcel
  onRowEditCancel(categoria: Categoria, index: number) {
    this.categorias[index] = this.clonedCategorias[categoria.id];
    delete this.clonedCategorias[categoria.id];
  }

   //Delete
   deleteCategoria(index: number) {
    let categoria = this.categorias[index];
    this.categoriaService.deleteCategoria(categoria).subscribe((result) => {
      if( result == null) {
        this.categorias.splice(index, 1);
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
      this.deleteCategoria(this.indexDelete);
    }
    this.displayJustification = false;
  }

}