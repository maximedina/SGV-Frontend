import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from 'src/app/Models/Items/Proveedor.model';
import { Categoria } from 'src/app/Models/Items/Categoria.model';
import { Grupo } from 'src/app/Models/Items/Grupo.model';
import { Item } from 'src/app/Models/Items/Item.model';
import { ProveedorService } from '../../../../services/proveedor.service';
import { ItemService } from '../../../../services/item.service';
import { Rubro } from 'src/app/Models/Items/Rubro.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  display:boolean=false;
  params:string;
  @Input() items: Item[];
  @Output() sendItemSel = new EventEmitter();

  itemsf:Item[];
  proveedores:Proveedor[];
  proveedoresFiltrados:any[];
  categorias:Categoria[];
  categoriasFiltradas:any[];
  grupos:Grupo[];
  gruposFiltrados:any[];
  itemsFiltrados:any[];
  item:Item;
  rubros:Rubro[];
  rubrosFiltrados:Rubro[];
  
  grupo:Grupo;
  rubro:Rubro;
  prooveedor:Proveedor;
  categoria:Categoria;
  
  constructor(private proveedorService:ProveedorService,
              private categoriaService:ItemService) { }

  ngOnInit(): void {
    //this.item = new Item();
    this.getProveedores();
    this.getGrupos();
    this.getRubros();
    this.getCategorias();
    this.itemsf = this.items;
  }

  getProveedores(){
    this.proveedorService.listar()
      .subscribe(
        data => {
          this.proveedores = data;
          console.log(data);
        },
        error => {
          console.log(error);
      });
  }

  getCategorias(){
    this.categoriaService.getCategorias()
      .subscribe(
        data => {
          this.categorias = data;
          console.log(data);
        },
        error => {
          console.log(error);
      });
  }

  getGrupos(){
    this.categoriaService.getGrupos()
      .subscribe(
        data => {
          this.grupos = data;
          console.log(data);
        },
        error => {
          console.log(error);
      });
  }

  getRubros(){
    this.categoriaService.getRubros()
      .subscribe(
        data => {
          this.rubros = data;
          console.log(data);
        },
        error => {
          console.log(error);
      });
  }

  filtradoProveedor(event){
    let query = event.query;
    this.proveedoresFiltrados = this.proveedores.filter(p => p.nombre.toLowerCase().includes(query));
  }
  

  filtradoGrupos(event){
    let query = event.query;
    this.gruposFiltrados = this.grupos.filter(g => g.nombre.toLowerCase().includes(query));
  }
  filtradoRubro(event){
    let query = event.query;
    this.rubrosFiltrados = this.rubros.filter(r => r.nombre.toLowerCase().includes(query));
  }
  filtradoCategoria(event){
    let query = event.query;
    this.categoriasFiltradas = this.categorias.filter(c => c.nombre.toLowerCase().includes(query));
  }

  filtradoItems(event){
    let query = event.query;
    this.itemsFiltrados = this.items.filter(i => i.nombre.toLowerCase().includes(query));
  }

  seleccionProveedor(p:Proveedor){
    this.prooveedor = p;
  }
  seleccionGrupos(g:Grupo){
    this.grupo = g;
    this.rubros = g.rubros;
    this.rubro = null;
    this.categoria = null;
  }
  seleccionRubro(r:Rubro){
    this.rubro = r;
    this.categorias = r.categorias;
    this.categoria = null;
  }
  seleccionCategoria(c:Categoria){
    this.categoria = c;
  }
  
  seleccionItem(i:Item){
    this.item = i;
  }

  filtrar(){
    this.params = "incluirInactivos=true";
    if(this.prooveedor != null){
      this.params += "&Proveedor="+ this.prooveedor.id;
    }
    if(this.categoria != null){
      this.params += "&Categoria="+ this.categoria.id;
    }
    if(this.grupo != null){
      this.params += "&Grupo="+ this.grupo.id;
    }
    if(this.item != null){
      this.params += "&nombre="+ this.item.nombre;
    }
    if(this.rubro != null){
      this.params += "&Rubro="+ this.rubro.id;
    }
    this.categoriaService.buscarItem(this.params)
      .subscribe(
        data => {
          this.items = data;
          console.log(data);
        },
        error => {
          console.log(error);
      });

    /*this.itemsf = this.items;
    if(this.prooveedor !== null){
      this.itemsf = this.itemsf.filter(i=>i.proveedor.id == this.prooveedor.id);
    }
    if(this.categoria !== null){
      this.itemsf = this.itemsf.filter(i=>i.categoria.id == this.categoria.id);
    }
    if(this.grupo !== null){
      this.itemsf = this.itemsf.filter(i=>i.categoria.rubro.grupo.id == this.grupo.id);
    }
    if(this.item !== null){
      this.itemsf = this.itemsf.filter(i=>i.id == this.item.id);
    }*/
  }

  itemSelec(item:Item){
    this.sendItemSel.emit(item);
    this.showModal();
  }
  showModal() {
    this.display = !this.display;
  }

  onRowSelect(event) {
    //this.item = event.data;
    this.itemSelec(event.data);
    //this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
}
}
