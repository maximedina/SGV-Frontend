import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento } from '../Models/cajas/Movimiento.model';
import { TipoMovimiento } from '../Models/cajas/TipoMovimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  readonly itemUrl = environment.APIURL + '/Movimiento';

  constructor(private http: HttpClient) { }
  
  registrar(movimiento: Movimiento): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/registrar', movimiento);
  }

  listtpos(): Observable<any> {
    return this.http.get<any>(this.itemUrl + '/list-tipo');
    
  }
  getTipos() {
    return this.http.get<TipoMovimiento[]>(this.itemUrl + '/list-tipo');
  }
}
