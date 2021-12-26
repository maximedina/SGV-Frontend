import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterService } from 'src/app/services/master.service';
import { Item } from 'src/app/Models/Items/Item.model'
import { ItemService } from 'src/app/services/item.service';
import { Venta } from 'src/app/Models/Ventas/Venta.model';
import { DetalleVenta } from 'src/app/Models/Ventas/DetalleVenta.model';
import { SecurityService } from 'src/app/services/security.service';
import { User } from 'src/app/Models/Security/User.model';

import { Caja } from 'src/app/Models/cajas/Caja.model';
import { CajaService } from 'src/app/services/caja.service';
import { VentaService } from 'src/app/services/venta.service';

import { TipoMovimiento } from '../../Models/cajas/TipoMovimiento.model';
import { MovimientoService } from '../../services/movimiento.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [
    MessageService,
    ConfirmationService,
    MasterService,
    ItemService
  ],
})
export class VentasComponent implements OnInit {

  cajaIsClose:boolean=false;
  caja: Caja;
  user: User = new User();
  vtapendiente:boolean=true;

  tipos:TipoMovimiento[];
  tiposFiltrados:TipoMovimiento[];

  SelAll:boolean=false;

  venta: Venta = new Venta;
  elemento: Item;
  itemsFiltrados: Item[];
  items: Item[];
  cliente: User;
  clientesFiltrados: any[];
  clientes: User[];
  clienteSeleccionado: User;
  itemSeleccionado: Item;
  itemVenta: DetalleVenta;

  itemVentaEdit: DetalleVenta;

  detalleVenta: DetalleVenta[] = new Array;

  id: number;
  private sub: any;

  constructor(private itemService: ItemService, private usuarioService: SecurityService, private cajaService: CajaService,
    private movimientoService:MovimientoService,private route: ActivatedRoute,private messageService:MessageService,
    private vtaService:VentaService) { }

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 
        if(Number.isNaN(this.id)){
          this.id = 0;
        }
    });
     this.limpiar();
  }

  filtradoItems(event) {
    let query = event.query;
    this.itemsFiltrados=this.items.filter(it => it.nombre.toLowerCase().includes(query) || it.id.toString().toLowerCase().includes(query) );
  }


  filtradoClientes(event) {

    let query = event.query;
    this.clientesFiltrados = this.clientes.filter(cli => cli.identificador.toLowerCase().indexOf(query.toLowerCase()) != -1 );


  }

  seleccionItem(elemento: Item) {
    this.itemSeleccionado = elemento;
    /*var botonAgregar = document.getElementById("agregar");
    botonAgregar.hidden = false;*/
  }

  seleccionCliente(elemento: User) {
    this.clienteSeleccionado = elemento;
    this.venta.userId = this.clienteSeleccionado.userId; 
  }

  agregarItem() {
    this.venta.idCaja = this.caja.id;
    if(this.clienteSeleccionado != null){
      this.venta.userId = this.clienteSeleccionado.userId; 
    }

    this.itemVenta = new DetalleVenta;
    this.itemVenta.item = this.itemSeleccionado;
    this.itemVenta.itemId = this.itemSeleccionado.id;
    this.itemVenta.precio = Number(this.itemSeleccionado.precioVenta.toFixed(2));

    this.itemVenta.item.precioVenta = Number(this.itemVenta.item.precioVenta.toFixed(2));
    let iexist = this.detalleVenta.find(d=>d.item.id == this.itemSeleccionado.id);
    if(iexist == null){
      this.itemVenta.importe = (1-(this.itemVenta.descuento/100))*this.itemVenta.cantidad*this.itemVenta.item.precioVenta;

      this.detalleVenta.push(this.itemVenta);
      this.venta.cliente = this.clienteSeleccionado;
      this.venta.detalleVenta = this.detalleVenta;

      this.venta.total += (1-(this.itemVenta.descuento/100))*this.itemVenta.cantidad*this.itemVenta.item.precioVenta;
      this.itemVenta.importe = Number(this.itemVenta.importe.toFixed(2));
      this.venta.descuento += (this.itemVenta.descuento/100)*(this.itemVenta.cantidad*this.itemVenta.item.precioVenta);

      this.itemSeleccionado = null;
    }else{
      this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'Ya se agrego este producto' });
    }
  }

  quitar(){
    this.venta.detalleVenta = new Array();
    this.detalleVenta.forEach(element => {
      if(!element.seleccionado){
        this.venta.detalleVenta.push(element);
      }else{
        this.venta.total -= (1-(element.descuento/100))*element.cantidad*element.item.precioVenta;
        this.venta.total = Number(this.venta.total.toFixed(2));
      }
    });
    this.detalleVenta = this.venta.detalleVenta;
  }

  selTodos(){
    this.detalleVenta.forEach(element => {
      element.seleccionado = this.SelAll;
    });
  }

  searchItemSel(i):void{
    this.itemSeleccionado = i;
    this.agregarItem();
  }


  getCaja(flag:boolean):void{
    this.cajaService.buscar(this.user.userId)
      .subscribe(
        data => {
          this.caja = data;
          if(flag){
            if(this.caja.estatus){
              this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Apertura', detail: 'Se abrio la caja correctamente' });
            }else{
              this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Cierre', detail: 'Se cerro la caja correctamente' });
            }
          }
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo determinar si existe una caja abierta' });
          }
        }
      );
  }
  cerrarCaja(c):void{
    this.getCaja(true);
  }
  abrirCaja(c):void{
    this.getCaja(true);
  }

  regIngEgr(resp:string){
    if(resp == "OK"){
      this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Movimiento', detail: 'Movimiento registrado correctamente' });
      this.getCaja(false);
      this.getClientes();
    }else{
      this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Movimiento', detail: resp });
    }
  }

  onEditComplete(d){
    /*this.venta.detalleVenta.forEach(function (detalle:DetalleVenta) {
      this.venta.total += detalle.cantidad * detalle.precio;
      console.log(detalle);
    });*/
  }

  selVenta(venta:Venta){
    if(this.caja.id == 0){
      this.getCaja(false);
    }
    this.venta = venta;
    this.venta.idCaja = this.caja.id;
    this.cliente = venta.cliente;
    this.detalleVenta = venta.detalleVenta;
    //this.vtapendiente = false;
    this.vtapendiente = true;
    if(venta.estatus == "cerrada" || venta.estatus == "cancelada"){
      this.venta.id = 0;
    }
  }

  onRowEditInit(d:DetalleVenta){
    let dant = this.venta.detalleVenta.find(det=>det.itemId == d.item.id);
    if(dant!= null){
      this.venta.total -= dant.importe;
      dant.importe = (1-(d.descuento/100))*d.cantidad*d.item.precioVenta;
      
      dant.importe = Number(dant.importe.toFixed(2));

      this.itemVentaEdit = d;
      this.venta.total += (1-(d.descuento/100))*d.cantidad*d.item.precioVenta;
      this.venta.total = Number(this.venta.total.toFixed(2));
    }
  }
  cobrar(flag:string){
    if(flag == "OK"){
      this.id = 0;
      this.limpiar();
      this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Venta registrada', detail: "Se ha guardado la información correctamente" });
    }else{
      this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: flag });
    }
  }
  limpiar(){
    //this.caja = new Caja;
    this.venta = new Venta;
    this.detalleVenta = new Array;
    if(this.id > 0){
      this.vtapendiente = false;
      this.getVenta();
    }else{
      this.vtapendiente = true;
      this.cliente = null;
      this.itemSeleccionado = null;
      this.venta.total = 0;
      this.venta.descuento = 0;
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCaja(false);
    this.getTipos();
    this.getClientes();
    this.getItems();
    
  }

  getVenta(){
    this.vtaService.get(this.id.toString())
      .subscribe(
        data => {
          this.venta = data;
          //this.selVenta(this.venta);
          this.venta.idCaja = this.caja.id;
          this.cliente = this.venta.cliente;
          this.detalleVenta = this.venta.detalleVenta;
          this.vtapendiente = false;
          if(this.venta.estatus == "pendiente"){
            this.vtapendiente = true;
          }
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo obtener la venta' });
          }
        }
      );
  }
  getTipos(){
    this.movimientoService.getTipos()
      .subscribe(
        data => {
          this.tipos = data;
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los tipos' });
          }
        }
      );
  }
  getClientes(){
    this.usuarioService.getUsers().subscribe(
      (data) => {
        this.clientes = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los clientes' });
        }
      }
  );
  }
  getItems(){
    this.itemService.getItems2().subscribe(
      (data) => {
        this.items = data;
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los items' });
        }
      }
    ); 
  }
}
