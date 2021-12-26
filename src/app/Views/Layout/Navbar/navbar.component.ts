import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/Models/Security/User.model';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { SystemSettingService } from 'src/app/services/system-setting.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { url } from 'inspector';
//import { ReporteComponent } from '../../reporte/reporte.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  items: MenuItem[];
  items2: MenuItem[];
  display: boolean;
  displayPassChangeModal:boolean;
  user: User = new User();
  svgElement: any;
  @BlockUI() blockUI: NgBlockUI;
  iframeUrlStr: string;

  constructor(
    private settingService: SystemSettingService,
    private securityService: SecurityService,
    private router: Router,
    //private reporte: ReporteComponent
  ) { }

  ngOnInit() {
    this.items2 = [
      {
        label: 'Cambiar contraseña',
        command:  (event)=>{this.displayPassChangeModal=false; this.showPassModal()}
        //routerLink: ['password-modal']
      },
      {
        label: 'Salir',
        command: (event) => { this.logout(); }
      }
    ]
    this.buildMenu();
  }

  buildMenu() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.items = [

      {
        label: 'Ventas',
        icon: 'fa fa-fw fa-shopping-cart',
        routerLink: ['ventas'],
        visible: this.securityService.hasPermission('GESTION_VENTA')
      },
      {
        label: 'Practicas',
        icon: 'fa fa-stethoscope ',
        routerLink: ['practicas'],
        visible: this.securityService.hasPermission('PRACTICAS')
      },
      {
        label: 'Turnos',
        icon: 'fa fa-fw fa-calendar',
        routerLink: ['turnos'],
        visible: this.securityService.hasPermission('GESTION_TURNOS')
      },
      {
        label: 'Notificaciones',
        icon: 'fa fa-calendar-check-o',
        routerLink: ['avisos'],
        visible: this.securityService.hasPermission('GESTION_TURNOS')
      },
      {
        label: 'Reportes',
        icon: 'fa fa-bar-chart ',
        items: [
          { label: 'Historias clínicas', command: () => this.navReporte('http://localhost/reports/report/SGV/Historia%20Clinica?rs:embed=true'), visible: this.securityService.hasPermission('REPORTE_HC') },
          { label: 'Tablero de ventas', command: () => this.navReporte('http://localhost/reports/report/SGV/Tablero%20de%20ventas?rs:embed=true'), visible: this.securityService.hasPermission('TABLERO_VENTAS') },
          { label: 'Ventas', command: () => this.navReporte('http://localhost/reports/report/SGV/Ventas?rs:embed=true'), visible: this.securityService.hasPermission('REPORTE_VENTAS') },
          { label: 'Cajas', command: () => this.navReporte('http://localhost/reports/report/SGV/Cajas?rs:embed=true'), visible: this.securityService.hasPermission('REPORTE_CAJAS') },
          { label: 'Turnos', command: () => this.navReporte('http://localhost/reports/report/SGV/Turnos?rs:embed=true'), visible: this.securityService.hasPermission('REPORTE_TURNOS') },
          { label: 'Auditoría', command: () => this.navReporte('http://localhost/reports/report/SGV/Auditoria?rs:embed=true'), visible: this.securityService.hasPermission('REPORTE_AUDITORIA') },
          ]
      },
      {
        label: 'Gestión de actores',
        icon: 'fa fa-address-card-o',
        items: [
          { label: 'Clientes', routerLink: ['user'], visible: this.securityService.hasPermission('LEER_USUARIO') },
          { label: 'Pacientes', routerLink: ['pacientes'], visible: this.securityService.hasPermission('LEER_PACIENTE') },
        ]
      },
      {
        label: 'Datos Maestros',
        icon: 'fa fa-fw fa-edit',
        items: [
          { label: 'Profesionales', routerLink: ['#'], visible: this.securityService.hasPermission('LEER_PERSONAL') },
          { label: 'Items', routerLink: ['#'], visible: this.securityService.hasPermission('LEER_ITEM') },
          { label: 'Tipos de items', routerLink: ['tipos'], visible: this.securityService.hasPermission('LEER_TIPO') },
          { label: 'Grupos', routerLink: ['grupos'], visible: this.securityService.hasPermission('LEER_GRUPO') },
          { label: 'Rubros', routerLink: ['rubros'], visible: this.securityService.hasPermission('LEER_RUBRO') },
          { label: 'Categorías', routerLink: ['categorias'], visible: this.securityService.hasPermission('LEER_CATEGORIA') },
          { label: 'Proveedores', routerLink: ['#'], visible: this.securityService.hasPermission('LEER_PROVEEDOR') },
          { label: 'Ciudades', routerLink: ['ciudades'], visible: this.securityService.hasPermission('LEER_CIUDAD') },
          { label: 'Provincias', routerLink: ['provincias'], visible: this.securityService.hasPermission('LEER_PROVINCIA') },
          { label: 'Tipos de pago', routerLink: ['provmodal'], visible: this.securityService.hasPermission('LEER_TIPO_PAGO') },]
      },
      {
        label: 'Administración',
        icon: 'pi pi-cog',
        items: [
          { label: 'Parámetros del sistema', routerLink: ['system-settings'], visible: this.securityService.hasPermission('LEER_PARAMETRO_SISTEMA') },
          { label: 'Perfiles de acceso', routerLink: ['profile'], visible: this.securityService.hasPermission('LEER_PERFIL') },
          { label: 'Usuarios', routerLink: ['user'], visible: this.securityService.hasPermission('LEER_USUARIO') }
        ]
      },
/*      {
        label: 'Cajas',
        icon: 'pi pi-cog',
        items: [
          { label: 'Abrir', routerLink: ['caja-abrir'], visible: this.securityService.hasPermission('CAJA_ABRIR') }
        ]
      },*/
    ];
  }

  logout() {
    this.securityService.logoutKillSession().subscribe(() => {
      this.securityService.logout();
      this.router.navigate(['login']);
      this.svgElement = undefined;
    });
  }

  isLoggedIn() {
    return this.securityService.isLoggedIn();
  }

  get() {
    setTimeout(() => {

    }, 3000);
  }

  getHamburger() {
    if (this.svgElement == undefined) {
      this.svgElement = document.getElementById("svgHamburguer");
    }
  }

  toggleHamburger() {
    if (this.svgElement != undefined) { this.svgElement.classList.toggle('active') };
  }


  showPassModal() {
    this.displayPassChangeModal = !this.displayPassChangeModal;
  }

  cambiarPass(form){
    this.displayPassChangeModal = !this.displayPassChangeModal;
  }

  navReporte(urlReporte){
    //this.reporte.iframeUrlStr=urlReporte;
    //console.log(this.reporte.iframeUrlStr);
    this.iframeUrlStr=urlReporte;
    this.router.navigateByUrl('');
    this.router.navigateByUrl('reportes');
  }

}
