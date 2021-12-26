import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../Models/Ventas/Venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  readonly itemUrl = environment.APIURL + '/Ventas';

  constructor(private http: HttpClient) { }
  registrar(venta: Venta): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/registrar', venta);
  }
  buscar(params:string): Observable<any> {
    return this.http.get<Venta[]>(this.itemUrl + '/consultar?'+ params);
  }
  get(id:string): Observable<any> {
    return this.http.get<Venta>(this.itemUrl + '/Get/'+ id);
  }
}
