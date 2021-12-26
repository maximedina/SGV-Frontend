import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { User } from '../../Models/Security/User.model';
import { SecurityService } from '../../services/security.service';
import { Profile } from '../../Models/Security/Profile.model';
import { Permission } from '../../Models/Security/Permission.model';
import { AvisosService } from 'src/app/services/avisos.service';
import { Email } from 'src/app/Models/Shared/Email';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css'],
  providers: [MessageService]

 })
 export class AvisosComponent implements OnInit {
  disabled: boolean;
  cols: any;
  display: boolean = false;

  btnAddUser : MenuItem[];

  profiles: Profile[] =[];
  profile: Profile = new Profile();

  newUser: any;
  users: User[];
  user: User;
  clonedUsers: User[] = [];
  html : string = '';
  resultadoEmail: string;

  displayJustification: boolean = false;
  private indexDelete: number = 0;
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionDelete: boolean = false;

  constructor(
    private regsUserService: SecurityService,
    private messageService: MessageService,
    private authenticate: SecurityService,
    private emailService: MasterService,
  ) {

    this.users = [];
    this.newUser;

    this.profiles = [];
    this.profile = new Profile();
  }

  ngOnInit() {

    this.permissionCreate = this.authenticate.getPermissionLS('CREAR_USUARIO');
    this.permissionDelete = this.authenticate.getPermissionLS('BORRAR_USUARIO');

    if (this.authenticate.hasPermission('CREAR_USUARIO')) {
      this.hasPermissionCreate = true;
    }

    if (this.authenticate.hasPermission('BORRAR_USUARIO')) {
      this.hasPermissionDelete = true;
    }

    this.regsUserService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );

    this.regsUserService.getProfiles().subscribe(
      (data) => {
        this.profiles = data;
      }
    );

    this.user = new User();

    this.cols = [
      { field: 'login', header: 'DNI' },
      { field: 'name', header: 'Nombre' },
      { field: 'avisos', header: 'Avisos' },
      { field: 'notificacionTurnos', header: 'Turnos' },
      { field: 'notificacionProxVisita', header: 'Prox. visita' },
    ];

  }
  buttonSearch(disabled: boolean) {
    return this.disabled = false;
  }

  // Disable Button Search
/*   disableButtonSearch() {
    const buttonSearch = this.aviso;
    if(!buttonSearch) {
    }
  } */

  /* Button Search */
/*   aviso(form) {
    this.enviarAviso.enviar(form.value.mensaje)
      .subscribe((result) => {
        this.resultadoEmail = result;
      }
    );
  } */


  sendMail(form){
    //this.html = '';
/*     this.html += "<!DOCTYPE html><html><body>";
    this.html += "<div>";
    this.html += form.value.mensaje;
    this.html += "</div>";
    this.html += "<div color=\'#FF0000\'>Veterinaria La Emilia</div>" 
    this.html += "</body></html>"; */

    this.html = "<div>" + form.value.mensaje + "</div><div> &nbsp;</div>";

    var email = new Email();
    email.html = this.html;
    email.subject=form.value.asunto;

    this.emailService.sendEmail(email).subscribe(res =>{
      //console.log(res);
      if (res==null) {
       setTimeout(() => {
        console.log("Email enviado");
        this.messageService.add({key: 'alert', sticky:true, severity:'success', summary:'Éxito', detail:'Email enviado con éxito.'});
       }, 500);
       this.messageService.clear();
      }
    },(error : HttpErrorResponse)=>{
        this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
    });
  }



   // Save
   updateUser(user: User, index: number) {
    this.regsUserService.updateUser(user).subscribe(() => {
      this.users.concat(user);
      this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Usuario actualizado con éxito.'});
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.onRowEditCancel(user, index);
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );

  }

  showDialogToAdd() {
    this.display = !this.display;
  }
  // Edit
  onRowEditInit(user : User) {
    this.clonedUsers[user.userId] = {...user};
  }

  //Calcel
  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.userId];
    delete this.clonedUsers[user.userId];
  }

}
