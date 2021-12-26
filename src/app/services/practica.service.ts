import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroPractica } from '../Models/practicas/reg-practica.model';
import { Practica } from '../Models/practicas/practica.model';

@Injectable({
  providedIn: 'root'
})
export class PracticaService {

  readonly itemUrl = environment.APIURL + '/Practicas';

  constructor(private http: HttpClient) { }
  registrar(practica: RegistroPractica): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/crear', practica);
  }

  getPracticasPaciente(id:string): Observable<any> {
    return this.http.get<RegistroPractica[]>(this.itemUrl + '/Get/'+id);
  }

  Add(practica: Practica): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Add', practica);
  }
}
