import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/Models/Security/User.model';
import { CajaService } from '../../../services/caja.service';
import { Caja } from '../../../Models/cajas/Caja.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-abrir',
  templateUrl: './abrir.component.html',
  styleUrls: ['./abrir.component.css'],
  providers: [MessageService]
})
export class AbrirComponent implements OnInit {

  error:string;
  display: boolean = false;
  @Input()  caja: Caja;
  @Output() sendDataModal = new EventEmitter();

  constructor(
    private cajaService: CajaService,
    private messageService: MessageService,) { 
  }

  ngOnInit(): void {
    
  }
  
  abrir(){
    this.cajaService.abrir(this.caja)
      .subscribe(
        response => {
          console.log(response);
          this.caja.estatus = true;
          this.sendDataModal.emit(this.caja);
        },
        error => {
          this.error = error.message;
        });
  }

  showModal() {
    this.display = !this.display;
  }
}
