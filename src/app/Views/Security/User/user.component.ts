import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { User } from '../../../Models/Security/User.model';
import { SecurityService } from '../../../services/security.service';
import { Profile } from '../../../Models/Security/Profile.model';
import { Permission } from '../../../Models/Security/Permission.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]

 })
 export class UserComponent implements OnInit {
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

  displayJustification: boolean = false;
  private indexDelete: number = 0;
  permissionDelete: Permission = new Permission();
  permissionCreate: Permission = new Permission();

  hasPermissionCreate: boolean = false;
  hasPermissionDelete: boolean = false;

  constructor(
    private regsUserService: SecurityService,
    private messageService: MessageService,
    private authenticate: SecurityService
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
      { field: 'profile', header: 'Perfil' },
      { field: 'fechaNacimiento', header: 'Fecha nac.' },
      { field: 'email', header: 'Email' },
      { field: 'telefono', header: 'Telefono' },
/*       { field: 'calle', header: 'Calle' },
      { field: 'altura', header: 'Nro' },
      { field: 'piso', header: 'Piso' },
      { field: 'dpto', header: 'Dpto' }, */
      { field: 'cuentaCorriente', header: 'CC' },
      { field: 'limiteCC', header: 'Lim. CC' },
    ];

  }
  buttonSearch(disabled: boolean) {
    return this.disabled = false;
  }

  // Disable Button Search
  disableButtonSearch() {
    const buttonSearch = this.search;
    if(!buttonSearch) {
    }
  }

  /* Button Search */
  search(form) {
    this.regsUserService.getUser(false, form.value.login, form.value.name, form.value.profile)
      .subscribe((result) => {
        this.users = result;
      }
    );
  }

  /* Save Modal */
  addNewUser(user: User) {
    this.regsUserService.addUser(user).subscribe((result) => {
      if (result == null) {
        this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Usuario guardado con éxito.'});
        this.regsUserService.getUsers().subscribe(
          (data) => {
            this.users = data;
          }
        );
      }
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );

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

   //Delete
  deleteUser(index: number){
    let userRemove = this.users[index];
    this.regsUserService.onRowRemove(userRemove.userId).subscribe(result => {
      this.users.splice(index, 1);
      this.messageService.add({key: 'alert', severity:'success', summary: 'Éxito', detail: 'Usuario borrado con éxito.'});
    },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }
      }
    );
  }

  onJustification(index: number){
    this.indexDelete = index;
    this.displayJustification = true;
  }

  returnJustification(ret) {
    if (ret) {
      this.deleteUser(this.indexDelete);
    }
    this.displayJustification = false;
  }

}
