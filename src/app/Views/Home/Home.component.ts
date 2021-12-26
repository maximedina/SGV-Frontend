import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  providers:[MessageService]
})
export class HomeComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('reloadURL') !== null) {
      sessionStorage.removeItem('reloadURL');
      location.reload();
    }
    if(sessionStorage.getItem('permissionDenied') !== null) {

      sessionStorage.removeItem('permissionDenied');
      setTimeout(() => {
        this.messageService.add({
          severity: "error",
          summary: "Permiso.",
          detail: "No tiene permiso para executar esta operación."
        });
      }, 1000);
    }
  }

}
