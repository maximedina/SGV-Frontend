import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personal } from '../Models/personal/personal.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  readonly itemUrl = environment.APIURL + '/Personal';

  constructor(private http: HttpClient) { }
  
  Listar():Observable<any> {
    return this.http.get<Personal[]>(this.itemUrl + '/listar');
  }
}
