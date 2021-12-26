import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { Venta } from 'src/app/Models/Ventas/Venta.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
  providers: [DatePipe]
})
export class BuscarComponent implements OnInit {
  display:boolean=false;
  fecini:Date;
  fecfin:Date;
  error:string;

  fecinis:string = "2021-11-01";
  fecfins:string = "2021-11-01";

  ventas:Venta[];

  @Output() sendVtaSel = new EventEmitter();

  constructor(private ventaService:VentaService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fecini = new Date();
    this.fecfins = this.datePipe.transform(this.fecini, 'yyyy-MM-dd');
    this.fecini.setDate( this.fecini.getDate() - 2 );
    this.fecinis = this.datePipe.transform(this.fecini, 'yyyy-MM-dd');
    this.buscar();
  }
  buscar(){
    let params="";
    if(this.fecinis != null){
      params ="fecIni="+ this.fecinis +"&";
    }
    if(this.fecfins != null){
      params +="fecFin="+ this.fecfins;
    }
    this.ventaService.buscar(params)
    .subscribe(
      response => {
        this.ventas = response;
      },
      error => {
        this.error = error.message;
      });
  }
  itemSelec(venta:Venta){
    this.sendVtaSel.emit(venta);
    this.showModal();
  }
  showModal() {
    this.display = !this.display;
  }
}
