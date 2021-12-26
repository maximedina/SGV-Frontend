import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Email } from '../Models/Shared/Email';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private baseUrl = environment.COREAPIURL + '/MasterData/';
  private sendEmailUrl = environment.COREAPIURL + "/SendEmail/";

  constructor(private http: HttpClient) {}

  getUom() {
    return this.http.get<any[]>(this.baseUrl + 'Uom/Get');
  }
  
  getDataType() {
    return this.http.get<any[]>(this.baseUrl + 'DataType/Get').pipe( // pipe para poder pegaer o retorno do post que é um método Observable()
      map((response: any) => { // Map para mapear o retorno corretamente
        if (response) {
           response.forEach(dataType => {
              if(dataType.customOptions != null) {
                let options = [{label: "", value: ""}];
                dataType.customOptions.forEach(element => {
                  options.push({label: element.name, value: element.name});
                });  
                dataType.customOptions = options;
              }
           });

           return response;
        }
      })
    );
  }

  getEntities(entity: string) {
    return this.http.get<any[]>(this.baseUrl + 'GetEntities?entity='+entity);
  }

  sendEmail(email : Email){
    return this.http.post<any>(`${this.sendEmailUrl}SendEmail`,email);
  }
}
