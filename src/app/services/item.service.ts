import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../Models/Items/Categoria.model';
import { Grupo } from '../Models/Items/Grupo.model';
import { Item } from '../Models/Items/Item.model';
import { Rubro } from '../Models/Items/Rubro.model';
import { Tipo } from '../Models/Items/Tipo.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly itemUrl = environment.APIURL + '/Item';

  constructor(private http: HttpClient) { }
  getItems() {

return [
      { id: 1, codigo:'A1', nombre: 'Ampicilina',descripcion:'', presentacion:'', identificador: 'A1 - Ampicilina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 2, codigo:'A2', nombre: 'Azlocilina',descripcion:'', presentacion:'', identificador: 'A2 - Azlocilina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 3, codigo:'A3', nombre: 'Netilmicina',descripcion:'', presentacion:'', identificador: 'A3 - Netilmicina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 4, codigo:'A4', nombre: 'Tobramicina',descripcion:'', presentacion:'', identificador: 'A4 - Tobramicina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 5, codigo:'A5', nombre: 'Cefalexina',descripcion:'', presentacion:'', identificador: 'A5 - Cefalexina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 6, codigo:'A6', nombre: 'Ceftriaxona',descripcion:'', presentacion:'', identificador: 'A6 - Ceftriaxona', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 7, codigo:'A7', nombre: 'Vancomicina',descripcion:'', presentacion:'', identificador: 'A7 - Vancomicina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 8, codigo:'A8', nombre: 'Eritromicina',descripcion:'', presentacion:'', identificador: 'A8 - Eritromicina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } },
      { id: 9, codigo:'A9', nombre: 'Penicilina',descripcion:'', presentacion:'', identificador: 'A9 - Penicilina', iva: 21, precioCosto: 10, porcentajePrecio: 0.3, stock: 10, stockMinimo:1, precioVenta: 13, inactivo:false, proveedor: {id:1, nombre:'tito'}, tipo: {id:1, nombre:'Servicio', descripcion:'', inactivo:false}, categoria: { id: 1, nombre: 'Antibioticos', descripcion:'', inactivo:false, rubro: { id: 1, nombre: 'Medicamentos', descripcion:'', inactivo:false, grupo: {id: 1, nombre: 'Veterinaria', descripcion:'', inactivo:false} } } }
    ]
  }
/*   id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  precioCosto: number;
  porcentajePrecio: number;
  iva: number;
  presentacion: string;
  stock: number;
  stockMinimo: number; 
  inactivo: boolean;
  identificador: string;
  precioVenta: number;
  categoria: Categoria; 
  tipo: Tipo;
  proveedor: Proveedor; */


  /* Service Items */
  getItems2() {
    return this.http.get<Item[]>(this.itemUrl + '/Get');
  }

  getPracticas() {
    return this.http.get<Item[]>(this.itemUrl + '/Practicas');
  }

  buscarItem(params) {
    return this.http.get<Item[]>(this.itemUrl +
      '/buscar?'+ params);
  }
  /* ------ Service Items */


  /* Service Tipo */
  getTipo(incluirInactivos, nombre, descripcion) {
    return this.http.get<Tipo[]>(this.itemUrl +
      '/Tipo/Get?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '') +
      '&&descripcion=' + ((descripcion != null) ? descripcion : '')
    );
  }

  addTipo(tipo: Tipo): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Tipo/Add', tipo);
  }

  updateTipo(tipo: Tipo): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Tipo/Update', tipo);
  }

  deleteTipo(tipo: Tipo): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Tipo/Delete', tipo.id);
  }
  /* ------ Service Tipo */

  /* Service Grupo */
  getGrupo(incluirInactivos, nombre, descripcion) {
    return this.http.get<Grupo[]>(this.itemUrl +
      '/Grupo/Get?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '') +
      '&&descripcion=' + ((descripcion != null) ? descripcion : '')
    );
  }

  getGrupos() {
    return this.http.get<Grupo[]>(this.itemUrl + '/Grupo/Get');
  }

  addGrupo(grupo: Grupo): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Grupo/Add', grupo);
  }

  updateGrupo(grupo: Grupo): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Grupo/Update', grupo);
  }

  deleteGrupo(grupo: Grupo): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Grupo/Delete', grupo.id);
  }
  /* ------ Service Grupo */

  /* Service Rubro */

  getRubro(incluirInactivos, nombre, descripcion, grupo) {
    let idGrupo = 0;
    if (grupo != null) {
      if (grupo.id > 0) {
        idGrupo = grupo.id;
      }
    }
    return this.http.get<Rubro[]>(this.itemUrl +
      '/Rubro/Get?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '') + '&&descripcion=' + ((descripcion != null) ? descripcion : '') + '&&idGrupo=' + ((idGrupo != null) ? idGrupo : 0));
  }

  getRubros() {
    return this.http.get<Rubro[]>(this.itemUrl + '/Rubro/Get');
  }

  addRubro(rubro: Rubro): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Rubro/Add', rubro);
  }

  updateRubro(rubro: Rubro): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Rubro/Update', rubro);
  }

  deleteRubro(rubro: Rubro): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Rubro/Delete', rubro.id);
  }
  /* ------ Service Rubro */

  /* Service Categoria */

  getCategoria(incluirInactivos, nombre, descripcion, rubro) {
    let idRubro = 0;
    if (rubro != null) {
      if (rubro.id > 0) {
        idRubro = rubro.id;
      }
    }
    return this.http.get<Categoria[]>(this.itemUrl +
      '/Categoria/Get?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '') + '&&descripcion=' + ((descripcion != null) ? descripcion : '') + '&&idRubro=' + ((idRubro != null) ? idRubro : 0));
  }

  getCategorias() {
    return this.http.get<Categoria[]>(this.itemUrl + '/Categoria/Get');
  }

  addCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Categoria/Add', categoria);
  }

  updateCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Categoria/Update', categoria);
  }

  deleteCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.itemUrl + '/Categoria/Delete', categoria.id);
  }
  /* ------ Service Categoria */

}