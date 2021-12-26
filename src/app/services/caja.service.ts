import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caja } from '../Models/cajas/Caja.model';
@Injectable({
  providedIn: 'root'
})
export class CajaService {
  readonly itemUrl = environment.APIURL + '/Cajas';

  constructor(private http: HttpClient) { }
  abrir(caja: Caja): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/abrir', caja);
  }
  cerrar(caja: Caja): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/cerrar', caja);
  }
  buscar(id:any): Observable<any> {
    return this.http.get(this.itemUrl + `/buscar/${id}`);
  }
}
