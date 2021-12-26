import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemSetting } from '../Models/Security/SystemSetting.model';
import { SystemModule } from '../Models/Security/SystemModule.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingService {
  readonly settingUrl = environment.COREAPIURL + '/SystemSetting';

  constructor(private http: HttpClient) { }

  /* Get ListAll SystemSetting */
  getListSystemSetting(key, moduleId, includeDeleted) {
    return this.http.get<SystemSetting[]>(this.settingUrl + '/Get?key=' + key + '&&moduleId=' + moduleId + '&&includeDeleted=' + includeDeleted);
  };

  /* GetSingleKey SystemSetting */
  getSingleKeySystemSetting(key: string) {
    return this.http.get<SystemSetting>(this.settingUrl + '/GetSingleKey?keyName=' + key);
  };

  /* Add SystemSetting */
  addSystemSetting(systemSetting: SystemSetting): Observable<any> {
    return this.http.post<any>(this.settingUrl + '/Add', systemSetting);
  };

  /* Update SystemSetting */
  updateSystemSetting(systemSetting: SystemSetting): Observable<any> {
    return this.http.post<any>(this.settingUrl + '/Update', systemSetting);
  };

  /* Delete SystemSetting */
  deleteSystemSetting(systemSetting: SystemSetting): Observable<any> {
    return this.http.post<any>(this.settingUrl + '/Delete', systemSetting.systemSettingId);
  };

  /* GetModules LisAll */
  listAllSystemModule() {
    return this.http.get<SystemModule[]>(this.settingUrl + '/GetModules');
  };

  getReportsURL() {
    return this.http.get<SystemSetting[]>(this.settingUrl + '/GetReports');
  };
}
