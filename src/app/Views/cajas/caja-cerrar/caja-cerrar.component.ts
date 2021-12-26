import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CajaService } from 'src/app/services/caja.service';

@Component({
  selector: 'app-caja-cerrar',
  templateUrl: './caja-cerrar.component.html',
  styleUrls: ['./caja-cerrar.component.css']
})
export class CajaCerrarComponent implements OnInit {

  display:Boolean=false;
  total:number=0;

  error:any;

  @Input()  idCaja: number;
  @Input()  caja: any;
  @Output() sendDataModal = new EventEmitter();
  constructor(private cajaService:CajaService) { }

  ngOnInit(): void {
    
  }
  showModal() {
    this.total = (this.caja.saldoInicial + this.caja.ingresos) - this.caja.egresos;
    this.display = !this.display;
  }
  cerrarCaja(){
    this.cajaService.cerrar(this.caja)
      .subscribe(
        response => {
          console.log(response);
          this.caja.estatus = false;
          this.sendDataModal.emit(this.caja);
        },
        error => {
          this.error = error.message;
        });
  }
}
