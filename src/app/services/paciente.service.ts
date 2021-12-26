import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../Models/Pacientes/Paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  readonly itemUrl = environment.APIURL + '/Pacientes';

  constructor(private http: HttpClient) { }
  
  Listar() {
    return this.http.get<Paciente[]>(this.itemUrl + '/listar');
  }
}
