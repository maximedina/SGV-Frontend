import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Categoria } from 'src/app/Models/Items/Categoria.model';
import { Rubro } from 'src/app/Models/Items/Rubro.model';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css']
})
export class CategoriaModalComponent implements OnInit {
  display: boolean = false;
  grupo: Rubro = new Rubro();
  categoria: Categoria;

  @Output() sendDataModal = new EventEmitter();
  @Input() rubros: Rubro[] =[];

  constructor() {  }

  ngOnInit() {
    this.categoria = new Categoria();
  }

  showDialog() {
    this.categoria = new Categoria();
    this.display = !this.display;
  }

  addNewCategoria() {
    this.sendDataModal.emit(this.categoria);
    this.display = !this.display;
  }
}
