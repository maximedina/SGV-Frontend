import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Caja } from 'src/app/Models/cajas/Caja.model';
import { Proveedor } from 'src/app/Models/Items/Proveedor.model';
import { Movimiento } from '../../../Models/cajas/Movimiento.model';
import { TipoMovimiento } from '../../../Models/cajas/TipoMovimiento.model';
import { MovimientoService } from '../../../services/movimiento.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { User } from 'src/app/Models/Security/User.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-caja-ingreso',
  templateUrl: './caja-ingreso.component.html',
  styleUrls: ['./caja-ingreso.component.css'],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class CajaIngresoComponent implements OnInit {

  error:string;
  display:boolean = false;
  flagcc:boolean=false;
  flagpp:boolean=false;
  
  proveedores:Proveedor[];
  tipos:TipoMovimiento[];
  tiposFiltrados:any[];
  clientesFiltrados:any[];
  proveedoresFiltrados:any[];
  cliente:User;
  proveedor:Proveedor;

  @Input() caja:Caja;
  @Input() tipo:string;
  @Input() clientes: User[];
  @Output() sendDataModal = new EventEmitter();
  movimiento:Movimiento = new Movimiento();

  constructor(private movimientoService:MovimientoService,private proveedorService:ProveedorService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.limpiar();
    this.gettpos();
    this.cliente = new User();
    this.proveedor = new Proveedor();
    this.getProveedores();
  }

  filtradoTipo(event) {
    let query = event.query;
    this.tiposFiltrados = this.tipos.filter(t => t.motivo.toLowerCase().includes(query));
    //this.itemsFiltrados=this.items.filter(it => it.identificador.toLowerCase().indexOf(query.toLowerCase()) != -1 );
  }

  filtradoNombre(event){
    let query = event.query;
    this.clientesFiltrados = this.clientes.filter(c => c.name.toLowerCase().includes(query));
  }
  filtradoCodigo(event){
    let query = event.query;
    this.clientesFiltrados = this.clientes.filter(c => c.name.toLowerCase().includes(query));
  }
  filtradoDni(event){
    let query = event.query;
    this.clientesFiltrados = this.clientes.filter(c => c.userId.toString().toLowerCase().includes(query));
  }

  filtradoProveedor(event){
    let query = event.query;
    this.proveedoresFiltrados = this.proveedores.filter(p => p.nombre.toLowerCase().includes(query));
  }

  seleccionProveedor(p:Proveedor){
    this.proveedor = p;
    this.movimiento.idCliente = 0;
    this.movimiento.idProveedor = p.id;
  }

  seleccionCliente(c:User){
    this.cliente = c;
    this.movimiento.idProveedor = 0;
    this.movimiento.idCliente = c.userId;
  }
  seleccionTipo(tipo:TipoMovimiento){
    this.flagcc = false;
    this.flagpp = false;
    if(tipo.motivo.toLowerCase().includes("cuenta corriente")){
      this.flagcc = true;
    }
    if(tipo.motivo.toLowerCase().includes("pago a proveedor")){
      this.flagpp = true;
    }
  }
  getProveedores(){
    this.proveedorService.listar()
      .subscribe(
        data => {
          this.proveedores = data;
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los proveedores' });
          }
        }
        );
  }
  gettpos(){
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
            this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los motivos' });
          }
        }
      );
  }
  registrar(){
    this.movimiento.idCaja = this.caja.id;
    this.movimientoService.registrar(this.movimiento)
      .subscribe(
        response => {
          console.log(response);
          this.caja.estatus = true;
          this.showModal();
          this.limpiar();
          this.sendDataModal.emit("OK");
          this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Movimiento', detail: 'Movimiento registrado correctamente' });
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.sendDataModal.emit(`${error.error}`);
            //this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.sendDataModal.emit('No se pudo registrar el movimiento');
          }
        }
        );
  }
  showModal() {
    this.display = !this.display;
  }
  limpiar(){
    this.movimiento.Comentario = "";
    this.movimiento.Importe = 0;
    this.movimiento.idCliente = 0;
    this.movimiento.idProveedor = 0;
    this.movimiento.TipoMovimiento = this.tipo;
    this.movimiento.idCaja = this.caja.id;
    this.movimiento.idMotivo = 1;
    this.movimiento.TipoPago = "Efectivo";
    this.movimiento.NroComprobante = "";
  }
}
