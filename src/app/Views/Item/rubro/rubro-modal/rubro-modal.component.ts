import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Grupo } from 'src/app/Models/Items/Grupo.model';
import { Rubro } from 'src/app/Models/Items/Rubro.model';

@Component({
  selector: 'app-rubro-modal',
  templateUrl: './rubro-modal.component.html',
  styleUrls: ['./rubro-modal.component.css']
})
export class RubroModalComponent implements OnInit {
  display: boolean = false;
  grupo: Grupo = new Grupo();
  rubro: Rubro;

  @Output() sendDataModal = new EventEmitter();
  @Input() grupos: Grupo[] =[];

  constructor() {  }

  ngOnInit() {
    this.rubro = new Rubro();
  }

  showDialog() {
    this.rubro = new Rubro();
    this.display = !this.display;
  }

  addNewRubro() {
    this.sendDataModal.emit(this.rubro);
    this.display = !this.display;
  }
}
