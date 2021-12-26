import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Ciudad } from '../../../../Models/Localizacion/Ciudad.model';
import { Provincia } from '../../../../Models/Localizacion/Provincia.model';

@Component({
  selector: 'app-ciudad-modal',
  templateUrl: './ciudad-modal.component.html',
  styleUrls: ['./ciudad-modal.component.css']
})
export class CiudadModalComponent implements OnInit {
  display: boolean = false;
  provincia: Provincia = new Provincia();
  ciudad: Ciudad;

  @Output() sendDataModal = new EventEmitter();
  @Input() provincias: Provincia[] =[];

  constructor() {  }

  ngOnInit() {
    this.ciudad = new Ciudad();
  }

  showDialog() {
    this.ciudad = new Ciudad();
    this.display = !this.display;
  }

  addNewCiudad() {
    this.sendDataModal.emit(this.ciudad);
    this.display = !this.display;
  }
}
