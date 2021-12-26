import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../Models/Items/Proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  readonly itemUrl = environment.APIURL + '/Proveedores';

  constructor(private http: HttpClient) { }
  listar(): Observable<any> {
    return this.http.get(this.itemUrl + `/listar`);
  }
}
