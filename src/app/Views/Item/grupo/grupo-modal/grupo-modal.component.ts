import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Grupo } from '../../../../Models/Items/Grupo.model';

@Component({
  selector: 'app-grupo-modal',
  templateUrl: './grupo-modal.component.html',
  styleUrls: ['./grupo-modal.component.css']
})
export class GrupoModalComponent implements OnInit {
  display: boolean = false;

  @Output() sendDataModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.display = !this.display;
  }

  addNewGrupo(grupo: Grupo) {
    this.display = !this.display;
    this.sendDataModal.emit(grupo);
  }
}