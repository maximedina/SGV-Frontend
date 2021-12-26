import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoMovimiento } from '../Models/cajas/TipoMovimiento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {
  readonly itemUrl = environment.APIURL + '/Cajas';

  constructor(private http: HttpClient) { }
  list(): Observable<any> {
    return this.http.get<any>(this.itemUrl + '/abrir');
  }
}
