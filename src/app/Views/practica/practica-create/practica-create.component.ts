import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRouteSnapshot, ActivatedRoute} from "@angular/router"
import { ConfirmationService, MessageService } from 'primeng/api';
import { Item } from 'src/app/Models/Items/Item.model'
import { Venta } from 'src/app/Models/Ventas/Venta.model'
import { ItemService } from 'src/app/services/item.service';
import { DetalleVenta } from 'src/app/Models/Ventas/DetalleVenta.model';
import { SecurityService } from 'src/app/services/security.service';
import { User } from 'src/app/Models/Security/User.model';
import { PracticaService } from 'src/app/services/practica.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnoService} from 'src/app/services/turno.service';
import { Paciente } from 'src/app/Models/Pacientes/Paciente.model';
import { Practica } from 'src/app/Models/practicas/practica.model';
import { DetallePractica } from 'src/app/Models/practicas/detalle-practica.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Turno } from 'src/app/Models/Turnos/Turno.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-practica-create',
  templateUrl: './practica-create.component.html',
  styleUrls: ['./practica-create.component.css'],
  providers: [
    MessageService,
    DatePipe
  ]
})
export class PracticaCreateComponent implements OnInit {

  error:string;

  fecNextCita:"";

  display:boolean=false;
  displayvh:boolean=false;
  
  practica:Practica;
  practicasAll:Practica[];//Practicas item tipo 1
  practicasPaciente:Practica[];//Practicas item tipo 1
  vacunasPaciente:Practica[];//Practicas item categoria 1
  desparacitacionesPaciente:Practica[];//Practicas item categoria 2

  pacientes:Paciente[];
  pacientesfil:any[];
  //paciente:Paciente;
  
  turnos:Turno[];
  turnosFil:Turno[];
  //turno:Turno;
  
  venta:Venta;
  ventar:Venta;
  detalleVenta:DetalleVenta[];
  itemVenta: DetalleVenta;

  itemsAll: Item[];
  items: Item[];
  itemsFiltrados: Item[];
  itemSeleccionado: Item;

  itemsP: Item[];
  itemsFiltradosP: Item[];
  itemSeleccionadoP: Item;

  user: User = new User();
  clientesFiltrados: any[];
  clientes: User[];
  clienteSeleccionado: User;
  
  turno:Turno;

  permiso:String;


  constructor(private itemService: ItemService, private usuarioService: SecurityService,
    private pacienteService:PacienteService, private practicaService:PracticaService,
    private messageService: MessageService,
    private router:Router,
    private turnoService:TurnoService,
    private r:ActivatedRoute) { }

  ngOnInit(): void {
    this.limpiar();
    this.permiso = this.r.snapshot.data.permission;
  }

  filtradoItems(event) {
    let query = event.query;
    this.itemsFiltrados=this.items.filter(it => it.nombre.toLowerCase().includes(query) || it.id.toString().toLowerCase().includes(query) );
  }
  filtradoItemsP(event) {
    let query = event.query;
    this.itemsFiltradosP=this.itemsP.filter(it => it.nombre.toLowerCase().includes(query) || it.id.toString().toLowerCase().includes(query) );
  }
  filtradoTurno(event) {
    let query = event.query;
    this.turnosFil=this.turnos.filter(t => t.title.toLowerCase().includes(query) || t.observaciones.toString().toLowerCase().includes(query) );
  }
  seleccionItem(elemento: Item) {
    this.itemSeleccionado = elemento;
  }
  seleccionItemP(elemento: Item) {
    this.itemSeleccionadoP = elemento;
  }
  seleccionTurno(t:Turno){
    this.turno = t;
    this.turno.tomado = true;
  }
  seleccionPaciente(p:Paciente){
    //this.paciente=p;
    this.practicaService.getPracticasPaciente(p.id.toString())
      .subscribe(
        response => {
          this.practicasAll = response;
          this.practicasPaciente = new Array();
          this.vacunasPaciente = new Array();
          this.desparacitacionesPaciente = new Array();
          this.practicasAll.forEach(element => {
            if(element.item.tipoId == 1){
              element.venta.detalleVenta = element.venta.detalleVenta.filter(e=>e.itemId != element.itemId);
              if(element.item.categoriaId == 1){
                this.vacunasPaciente.push(element);
              }else if(element.item.categoriaId == 2){
                this.desparacitacionesPaciente.push(element);
              }else{
                this.practicasPaciente.push(element);
              }
            }
          });
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener las practicas para este paciente' });
          }
        }
    );
        this.getTurnosPaciente(p);
  }
  searchItemSel(i):void{
    this.itemSeleccionado = i;
    //this.agregarItem();
  }

  
  filtradoClientes(event) {
    let query = event.query;
    this.clientesFiltrados = this.clientes.filter(cli => cli.identificador.toLowerCase().indexOf(query.toLowerCase()) != -1 );
  }

  seleccionCliente(elemento: User) {
    this.clienteSeleccionado = elemento;
    this.practica.userId = this.clienteSeleccionado.userId; 
    this.practica.paciente = null;
    this.practicasPaciente = null;
    this.pacientesfil = this.pacientes.filter(g => g.propietario.userId == this.clienteSeleccionado.userId);
  }

  filtradoPacientes(event){
    let query = event.query;
    this.pacientesfil = this.pacientes.filter(g => g.nombre.toLowerCase().includes(query) && g.propietario.userId == this.clienteSeleccionado.userId);
  }

  agregarItem(){
    let iexist = this.practica.venta.detalleVenta.find(d=>d.item.id == this.itemSeleccionado.id);
    if(iexist == null){
      this.itemVenta = new DetalleVenta();
      this.itemVenta.cantidad = 1;
      this.itemVenta.descuento = 0;
      this.itemVenta.precio = Number(this.itemSeleccionado.precioVenta.toFixed(2));
      this.itemVenta.importe = this.itemVenta.cantidad * this.itemVenta.precio;
      this.itemVenta.importe = Number(this.itemVenta.importe.toFixed(2));
      this.itemVenta.item = this.itemSeleccionado;
      this.itemVenta.itemId = this.itemSeleccionado.id;
      this.itemVenta.item.precioVenta = Number(this.itemVenta.item.precioVenta.toFixed(2));

      this.practica.venta.total += this.itemVenta.importe;
      this.practica.venta.detalleVenta.push(this.itemVenta);

      this.itemSeleccionado = null;
    }else{
      this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'Ya se agrego este producto' });
    }
  }

  onRowEditInit(d:DetallePractica){
    let dant = this.practica.venta.detalleVenta.find(det=>det.itemId == d.itemId);
    if(dant!= null){
      this.practica.venta.total -= dant.importe;
      this.practica.venta.total += (1-(d.descuento/100))*d.cantidad*d.item.precioVenta;
      dant.importe = (1-(d.descuento/100))*d.cantidad*d.item.precioVenta;
      
      //this.itemEdit = d;
      
    }
  }

  goVentas(){
    if(this.ventar != null){
      this.router.navigate(['/ventas', this.ventar.id]);
    }
  }

  limpiar(){
    this.practica = new Practica();
    this.items = new Array();
    this.itemsP = new Array();
    this.venta = new Venta;
    this.detalleVenta=new Array;
    this.venta.detalleVenta = this.detalleVenta;
    this.practica.venta = this.venta;
    this.turnos = new Array;
    this.practicasPaciente = null;
    this.practica.venta.total = 0;
    //this.practica.venta.detalleVenta = this.detalles;
    this.practica.usuario = this.user = JSON.parse(localStorage.getItem('user'));
    this.practica.userId = this.practica.usuario.userId;
    this.getClientes()
    this.getPacientes();
    this.getItems();
  }
  registrar(){
    if(this.practica.venta.cliente != null && this.practica.paciente != null && this.practica.venta.total>0 && this.itemSeleccionadoP != null && this.practica.item != null ){
      this.practica.venta.userId = this.practica.venta.cliente.userId;
      this.practica.pacienteId = this.practica.paciente.id;
      this.practica.userId = this.user.userId;
      this.practica.turnoId = 0;//this.turno.id;
      this.practica.itemId = this.itemSeleccionadoP.id;
      //this.practica.estatus="cerrada";
      if(this.turno != null){
        this.practica.turnoId = this.turno.id;
        this.turnoService.addTurno(this.turno).subscribe(
          response => {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Turno', detail: 'Turno actualizado' });
          },
          (error: HttpErrorResponse) => {
            if(error.status === 400 || error.status === 404) {
              this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
            }else{
              this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el turno' });
            }
          }
        );
      }
      this.practicaService.Add(this.practica)
      .subscribe(
        response => {
          console.log(response);
          this.ventar = new Venta;
          this.ventar = response;
          this.limpiar();
          this.display = true;
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo guardar el registro, verifica que todos los campos esten completos' });
          }
        }
        );
    }else{
      this.messageService.add({ key: 'alert', sticky:true, severity: 'alert', summary: 'Falta información', detail: 'Tienes que completar todos los campos antes de continuar' });
    }
    
  }
  getPacientes(){
    this.pacienteService.Listar().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los pacientes' });
        }
      }
    ); 
  }

  getTurnosPaciente(paciente:Paciente){
    if(this.practica.paciente != null){
      this.turnoService.getTurnosPaciente(paciente.id.toString()).subscribe(
        (data) => {
          this.turnos = data;
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los pacientes' });
          }
        }
      ); 
    }
  }

  getItems(){
    this.itemService.getItems2().subscribe(
      (data) => {
        this.itemsAll = data;
        this.itemsAll.forEach(element => {
          this.items.push(element);
          if(element.tipo.id == 1){
            this.itemsP.push(element);
          }
        });
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los productos y servicios' });
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

}
