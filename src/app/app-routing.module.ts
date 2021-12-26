import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './Views/Security/Profile/profile.component';
import { UserComponent } from './Views/Security/User/user.component';
import { SystemSettingComponent } from './Views/SystemSetting/system-setting/system-setting.component';
import { ProfileModalComponent } from './Views/Security/Profile/ProfileModal/profile-modal.component';
import { LoginComponent } from './Views/Security/Login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './Views/Home/Home.component';
import { RoleGuard } from './role/role.guard';
import { VentasComponent } from './Views/ventas/ventas.component';
import { TipoComponent } from './Views/Item/tipo/tipo.component';
import { GrupoComponent } from './Views/Item/grupo/grupo.component';
import { RubroComponent } from './Views/Item/rubro/rubro.component';
import { CategoriaComponent } from './Views/Item/categoria/categoria.component';
import { ProvinciaComponent } from './Views/Localizacion/provincia/provincia.component';
import { CiudadComponent } from './Views/Localizacion/ciudad/ciudad.component';
import { TurnosComponent } from './Views/Turnos/Turnos.component';
import { AbrirComponent } from './Views/cajas/abrir/abrir.component';
import { ProvinciaModalComponent } from './Views/Localizacion/provincia/provincia-modal/provincia-modal.component';
import { PasswordModalComponent } from './Views/Security/password-modal/password-modal.component';
import { PracticaCreateComponent } from './views/practica/practica-create/practica-create.component';
import { ReporteComponent } from './Views/reporte/reporte.component';
import { AvisosComponent } from './Views/avisos/avisos.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_PERFIL'}
  },
  {
    path: 'profile-modal',
    component: ProfileModalComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'EDITAR_PERFIL'}
  },
  {
    path: 'user',
    component: UserComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_USUARIO'}
  },
  {
    path: 'system-settings',
    component: SystemSettingComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_PARAMETRO_SISTEMA'}
  },
  {
    path:'reportes',
    component: ReporteComponent,
    canActivate: [AuthGuard, RoleGuard],
    //data: {permission: 'REPORTES'}
  },
  {
    path: 'tipos',
    component: TipoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_TIPO'}
  },
  {
    path: 'grupos',
    component: GrupoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_GRUPO'}
  },
  {
    path: 'rubros',
    component: RubroComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_RUBRO'}
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_CATEGORIA'}
  },
  {
    path: 'provincias',
    component: ProvinciaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_PROVINCIA'}
  },
  {
    path: 'ciudades',
    component: CiudadComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_CIUDAD'}
  },
  {
    path: 'ventas/:id',
    component: VentasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'GESTION_VENTA'}
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'GESTION_VENTA'}
  },
  {
    path: 'turnos',
    component: TurnosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_TURNO'}
  },
  {
    path: 'avisos',
    component: AvisosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_TURNO'}
  },
  {
    path: 'caja-abrir',
    component: AbrirComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'CAJA_ABRIR'}
  },
  {
    path: 'practicas',
    //component: RegistrarPracticaComponent,
    component: PracticaCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'PRACTICAS'}
  },
  {
    path: 'password-modal',
    component: PasswordModalComponent
  }    
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
