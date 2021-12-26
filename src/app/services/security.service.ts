import { OperationLog } from './../Models/Security/OperationLog.model';
import { SystemModule } from '../Models/Security/SystemModule.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../Models/Security/Profile.model';
import { Observable } from 'rxjs';
import { User } from '../Models/Security/User.model';
import { Permission } from '../Models/Security/Permission.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class SecurityService {

  loggedUser: User = new User();
  profile: Profile;
  public userAuthenticate = new EventEmitter<User>();

  readonly securityUrl = environment.COREAPIURL + '/Security';

  constructor(private http: HttpClient) { }

  authenticate(login, password) {
    const model = new FormData();
    model.append('login', login);
    model.append('password', password);
    model.append('deviceType', '');

    return this.http
    .post(`${this.securityUrl}/User/Authenticate`, model).pipe( 
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('permissions', JSON.stringify(response.permissions));
          this.loggedUser = response.user;
        }
      })
    );
  }

  isLoggedIn() {
    if(localStorage.getItem('token') == null) {
      return false;
    }

    return true;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  logoutKillSession() {
    return this.http.post<any>(`${this.securityUrl}/User/Logout/${localStorage.getItem('token')}`, null);
  }

  getUser(includeDeleted, login, name, profile) {
    let profileId = 0;
    if (profile != null){
      if (profile.profileId > 0 ) {
        profileId = profile.profileId;
      }
    }

    return this.http.get<User[]>(this.securityUrl +
       '/User/GetByValue?includeDeleted=' + includeDeleted + '&&login=' + ((login != null) ? login : '') + '&&name=' + ((name != null) ? name : '') + '&&profileId=' + ((profileId != null) ? profileId : 0));
  }

  getUsers() {
    return this.http.get<User[]>(this.securityUrl + '/User/Get');
  }

  addUser(user: User) : Observable<any> {
    return this.http.post<any>(this.securityUrl + '/User/Add', user);
  }

  updateUser(user: User) : Observable<any> {
    return this.http.post<any>(this.securityUrl + '/User/Update', user);
  }

  onRowRemove(userId: number) : Observable<any> {
    return this.http.post<any>(this.securityUrl + '/User/Delete', userId);
  }

  getProfile(name, description) {
    return this.http.get<Profile[]>(this.securityUrl + '/Profile/GetByValues?name=' + ((name != null) ? name : '') + '&&description=' + ((description != null) ? description : ''));
  }

  getProfiles() {
      return this.http.get<Profile[]>(this.securityUrl + '/Profile/Get');
  }

  getSystemModulePerProfileId (id) {
    return this.http.get<SystemModule[]>(this.securityUrl + '/SystemModule/PerProfileId?id=' + id);
  }

  getPermissionAssociated(profile) {
    return this.http.post<Permission[]>(this.securityUrl + '/Permission/PerProfile', profile);
  }

  getPermission(profileId, moduleId) {
    return this.http.get<Permission[]>(this.securityUrl + '/Permission/AvailablePermissions?profileId=' +  profileId + '&&moduleId=' + moduleId);
  }

  getSystemModules() {
    return this.http.get<SystemModule[]>(this.securityUrl + '/SystemModule/Get');
  }

  getSystemModulesByPermissionId (permissionId) {
    return this.http.get<SystemModule[]>(this.securityUrl + '/SystemModule/PerPermissionId?id=' + permissionId);
  }

  associatePermission (profile, permission) {
    let data = new FormData();
    let prof = JSON.stringify(profile);
    let perm = JSON.stringify(permission);
    data.append('profile', prof);
    data.append('permission', perm);
    return this.http.post<Profile[]>(this.securityUrl + '/Profile/AssociatePermission', data);
  }

  disassociatePermission (profile, permission) {
    let data = new FormData();
    let prof = JSON.stringify(profile);
    let perm = JSON.stringify(permission);
    data.append('profile', prof);
    data.append('permission', perm);
    return this.http.post<Profile[]>(this.securityUrl + '/Profile/DisassociatePermission', data);
  }

  addLog(log: OperationLog) : Observable<any> {
    return this.http.post<any>(this.securityUrl + '/Log/Add', log);
  }

  hasPermission(permission: string) {
      let permissions: Storage[] = JSON.parse(localStorage.getItem('permissions'));
      let hasPermission = false;
      console.log(((permissions!= undefined) && permissions.length>0 && permissions.find(x => x.name == permission) != null).toString());
      hasPermission = (permissions!= undefined) && permissions.length>0 && permissions.find(x => x.name == permission) != null
      return hasPermission;
  }

  getPermissionLS(permission: string) {
    let permissions: Permission[] = JSON.parse(localStorage.getItem('permissions'));
    return permissions.find(x => x.name == permission);
  }

}



