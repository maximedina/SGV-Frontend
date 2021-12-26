import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tipo } from '../../../../Models/Items/Tipo.model';

@Component({
  selector: 'app-tipo-modal',
  templateUrl: './tipo-modal.component.html',
  styleUrls: ['./tipo-modal.component.css']
})
export class TipoModalComponent implements OnInit {
  display: boolean = false;

  @Output() sendDataModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.display = !this.display;
  }

  addNewTipo(tipo: Tipo) {
    this.display = !this.display;
    this.sendDataModal.emit(tipo);
  }
}
