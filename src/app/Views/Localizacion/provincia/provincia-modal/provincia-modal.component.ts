import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Provincia } from 'src/app/Models/Localizacion/Provincia.model';

@Component({
  selector: 'app-provincia-modal',
  templateUrl: './provincia-modal.component.html',
  styleUrls: ['./provincia-modal.component.css']
})
export class ProvinciaModalComponent implements OnInit {
  display: boolean = false;

  @Output() sendDataModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.display = !this.display;
  }

  addNewProvincia(provincia: Provincia) {
    this.display = !this.display;
    this.sendDataModal.emit(provincia);
  }
}

