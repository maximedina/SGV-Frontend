import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ciudad } from '../Models/Localizacion/Ciudad.model';
import { Provincia } from '../Models/Localizacion/Provincia.model';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  readonly localizacionUrl = environment.APIURL + '/Localizacion';
constructor(private http: HttpClient) { }
  /* Service Provincia */
  getProvincia(incluirInactivos, nombre) {
    return this.http.get<Provincia[]>(this.localizacionUrl +
      '/Provincia/Get?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '')
    );
  }

  getProvincias() {
    return this.http.get<Provincia[]>(this.localizacionUrl + '/Provincia/Get');
  }

  addProvincia(provincia: Provincia): Observable<any> {
    return this.http.post<any>(this.localizacionUrl + '/Provincia/Add', provincia);
  }

  updateProvincia(provincia: Provincia): Observable<any> {
    return this.http.post<any>(this.localizacionUrl + '/Provincia/Update', provincia);
  }

  deleteProvincia(provincia: Provincia): Observable<any> {
    return this.http.post<any>(this.localizacionUrl + '/Provincia/Delete', provincia.id);
  }
  /* ------ Service Provincia */
  
  /* Service Ciudad */
/*     getCiudad(incluirInactivos, nombre, provincia) {
    let idProvincia = 0;
    if (provincia != null) {
      if (provincia.id > 0) {
        idProvincia = provincia.id;
      }
    }
    return this.http.get<Ciudad[]>(this.localizacionUrl +
      '/Ciudad/Get?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '') + '&&idProvincia=' + ((idProvincia != null) ? idProvincia : 0));
  }

  getCiudades() {
    return this.http.get<Ciudad[]>(this.localizacionUrl + '/Ciudad/Get');
  } */

  getCiudad(incluirInactivos, nombre, provincia) {
    let idProvincia = 0;
    if (provincia != null){
      if (provincia.id > 0 ) {
        idProvincia = provincia.id;
      }
    }

    return this.http.get<Ciudad[]>(this.localizacionUrl +
       '/Ciudad/GetByValue?incluirInactivos=' + incluirInactivos + '&&nombre=' + ((nombre != null) ? nombre : '') + '&&idProvincia=' + ((idProvincia != null) ? idProvincia : 0));
  }

  getCiudades() {
    return this.http.get<Ciudad[]>(this.localizacionUrl + '/Ciudad/Get');
  }




  addCiudad(ciudad: Ciudad): Observable<any> {
    return this.http.post<any>(this.localizacionUrl + '/Ciudad/Add', ciudad);
  }

  updateCiudad(ciudad: Ciudad): Observable<any> {
    return this.http.post<any>(this.localizacionUrl + '/Ciudad/Update', ciudad);
  }

  deleteCiudad(ciudad: Ciudad): Observable<any> {
    return this.http.post<any>(this.localizacionUrl + '/Ciudad/Delete', ciudad.id);
  }
    /* ------ Service Ciudad */
}
