import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/Models/Security/User.model';
import { Venta } from 'src/app/Models/Ventas/Venta.model';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.component.html',
  styleUrls: ['./cobrar.component.css']
})
export class CobrarComponent implements OnInit {
  display:boolean=false;
  impresion:string="no";
  mpago:string="1";

  @Input() cliente:User;
  @Input() venta:Venta;

  @Output() cobrarEvent = new EventEmitter();
  
  monto:number;
  abono:number;
  vuelto:number;
  nrocomp:string;
  comentario:string;
  saldocc:number;
  saldofin:number;

  error:string;
  constructor(private ventaService: VentaService) { }

  ngOnInit(): void {
    this.calculaCC();
    this.calculaVuelto(null);
  }

  calculaVuelto(event:any){
    if(this.abono>0){
      this.vuelto = Number((this.abono - this.venta.total).toFixed(2));
    }
  }
  calculaCC(){
    this.saldofin = Number((this.cliente.cuentaCorriente - this.venta.total).toFixed(2));
  }
  showModal() {
    this.display = !this.display;
  }
  registrarVta(estatus:string){
    this.venta.tipoPagoId = this.mpago;
    this.venta.estatus = estatus;
    this.ventaService.registrar(this.venta)
      .subscribe(
        response => {
          console.log(response);
          this.cobrarEvent.emit("OK");
          this.showModal();
        },
        (error: HttpErrorResponse) => {
          if(error.status === 400 || error.status === 404) {
            this.cobrarEvent.emit(error.error);
            //this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
          }else{
            this.cobrarEvent.emit("No se pudo registrar la venta");
          }
          this.showModal();
        }
        );
  }
}
