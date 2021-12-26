
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../Models/Pacientes/Paciente.model';
import { Email } from '../Models/Shared/Email';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

private sendEmailUrl = environment.COREAPIURL + "/SendEmail/";

constructor(private http: HttpClient) {}

sendEmail(email : Email){
  return this.http.post<any>(`${this.sendEmailUrl}SendEmail`,email);
}
}