import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Turno } from '../Models/Turnos/Turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  readonly itemUrl = environment.APIURL + '/Turnos';

  constructor(private http: HttpClient) { }
  
/*  getTest{
     return 
   [
      {
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        color: colors.red,
        actions: this.actions,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
        color: colors.yellow,
        actions: this.actions,
      },
      {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue,
        allDay: true,
      },
      {
        start: addHours(startOfDay(new Date()), 2),
        end: addHours(new Date(), 2),
        title: 'A draggable and resizable event',
        color: colors.yellow,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
    ]; 
  }*/

  getTurno(id, inicio, fin, practica, paciente, profesional) {
    let idPractica = 0;
    if (practica != null) {
      if (practica.id > 0) {
        idPractica = practica.id;
      }
    }
    let idPaciente = 0;
    if (paciente != null) {
      if (paciente.id > 0) {
        idPaciente = paciente.id;
      }
    }
    let idProfesional = 0;
    if (profesional != null) {
      if (profesional.id > 0) {
        idProfesional = profesional.id;
      }
    }
    return this.http.get<Turno[]>(this.itemUrl +
      '/Get?id=' + id + '&&inicio=' + inicio + '&&fin=' + fin + '&&idPractica=' + ((idPractica != null) ? idPractica : 0) + '&&idPaciente=' + ((idPaciente != null) ? idPaciente : 0)+ '&&idProfesional=' + ((idProfesional != null) ? idProfesional : 0));
      //'&&inicio=' + ((inicio != null) ? inicio : '') + '&&descripcion=' + ((descripcion != null) ? descripcion : '') + '&&idGrupo=' + ((idGrupo != null) ? idGrupo : 0));
  }

  Get(id:string) {
    return this.http.get<Turno>(this.itemUrl + '/Get/'+ id);
  }

  getTurnos() {
    return this.http.get<Turno[]>(this.itemUrl + '/listar');
  }

  getTurnosPaciente(id:string) {
    return this.http.get<Turno[]>(this.itemUrl + '/paciente/'+id);
  }

  addTurno(turno: Turno): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/crear', turno);
  }

  updateTurno(turno: Turno): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Update', turno);
  }

  deleteTurno(turno: Turno): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/eliminar', turno);
  }
  
}