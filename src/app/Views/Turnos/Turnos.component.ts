import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventChangeArg } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { Turno } from 'src/app/Models/Turnos/Turno.model';
import { TurnoService } from 'src/app/services/turno.service';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ItemService } from 'src/app/services/item.service';
import { SecurityService } from 'src/app/services/security.service';
import { PersonalService } from 'src/app/services/personal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/Models/Pacientes/Paciente.model';
import { Item } from 'src/app/Models/Items/Item.model';
import { User } from 'src/app/Models/Security/User.model';
import { Personal } from 'src/app/Models/personal/personal.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  providers:[MessageService,
    DatePipe]
})
export class TurnosComponent /* implements OnInit */ {

  user = new User;

  display:boolean=false;
  fecini:string;
  fecinihra:string;
  fecfinhra:string;
  fecfin:string;

  fini:Date;
  ffin:Date;

  turnos:any[]=new Array;
  turnosc:any[]=new Array;
  turno:Turno;
  calendarVisible = true;
  calendarOptions: CalendarOptions;
  currentEvents: EventApi[] = [];
  
  clientesFiltrados: any[];
  clientes: User[];
  clienteSel:User;

  pacientes:Paciente[];
  items:Item[];
  personals:Personal[];

  pacientesfil:any[];
  itemsfil:any[];
  personalsfil:any[];

  @ViewChild(FullCalendarComponent) ucCalendar: FullCalendarComponent;
  
 constructor(private turnoService: TurnoService,private itemService:ItemService,private personalService:PersonalService,
  private pacienteService:PacienteService,private messageService:MessageService,
  private datePipe:DatePipe,
  private usuarioService: SecurityService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getTurnos();
    
    this.calendarOptions = {
      locale: esLocale,
      headerToolbar: {
       left: 'prev,next,today',
       center:'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'timeGridWeek',
      //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      events:this.turnos,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventDragStop: (eventDragStopEvent) => {
        console.log("EVENT DRAG STOP !!!");
        //alert(JSON.stringify(eventDragStopEvent));
      }
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };

    this.turno = new Turno;

    this.getClientes();
    this.getPacientes();
    this.getPersonal();
    this.getPracticas();

    this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Registro', detail: 'Registro guardado correctamente' });
  } 

  handleChange(e:EventChangeArg){
    alert("GHoa");
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    
    this.fecini=selectInfo.startStr.substring(0,10);//this.datePipe.transform(this.fini,"yyyy-MM-dd");
    this.fecinihra=selectInfo.startStr.substring(11,19);//this.datePipe.transform(this.fini,"HH:mm:ss");
    this.fecfin=selectInfo.endStr.substring(0,10);//this.datePipe.transform(this.fini,"yyyy-MM-dd");
    this.fecfinhra=selectInfo.endStr.substring(11,19);//this.datePipe.transform(this.fini,"HH:mm:ss");

    this.turno = new Turno;

    this.display=true;

    this.turno.start= new Date(this.fecini+"T"+this.fecinihra+".000Z");
    this.turno.end=new Date(this.fecfin+"T"+this.fecfinhra+".000Z");
  }

  handleEventClick(clickInfo: EventClickArg) {
    //alert(JSON.stringify(clickInfo));
    this.turnoService.Get(clickInfo.event.id).subscribe(
      (data) => {
        this.turno = data;
        
        this.fecini=clickInfo.event.startStr.substring(0,10);//this.datePipe.transform(this.fini,"yyyy-MM-dd");
        this.fecinihra=clickInfo.event.startStr.substring(11,19);//this.datePipe.transform(this.fini,"HH:mm:ss");

        this.fecfin=clickInfo.event.endStr.substring(0,10);//this.datePipe.transform(this.fini,"yyyy-MM-dd");
        this.fecfinhra=clickInfo.event.endStr.substring(11,19);//this.datePipe.transform(this.fini,"HH:mm:ss");

        this.turno.start = new Date(this.fecini+"T"+this.fecinihra+".000Z");
        this.turno.end = new Date(this.fecfin+"T"+this.fecfinhra+".000Z");
        //this.fecini=this.turno.start.toString().substring(0,10);
        //this.fecinihra=this.turno.start.toString().substring(11,19);
    
        //this.fecfin=this.turno.end.toString().substring(0,10);
        //this.fecfinhra=this.turno.end.toString().substring(11,19);
        this.display = true;
        this.clienteSel = this.turno.paciente.propietario;
      }
    ); 
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


  //Servicio traen informacion
  getPracticas(){
    this.itemService.getPracticas().subscribe(
      (data) => {
        this.items = data;
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener las practicas' });
        }
      }
    ); 
  }

  getPacientes(){
    this.pacienteService.Listar().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los pacientes' });
        }
      }
    ); 
  }

  getPersonal(){
    this.personalService.Listar().subscribe(
      (data) => {
        this.personals = data;

        /*this.personals.forEach(element => {
          element.name = element.usuario.Name;
        });*/
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo obtener el personal' });
        }
      }
    ); 
  }
  getTurnos(){
    this.turnoService.getTurnos().subscribe(
      (data) => {
        this.turnos = data;
        this.turnosc = new Array();
        this.turnos.forEach(element => {
          if(element.tomado){
            element.color = "#31D358";
          }
          this.turnosc.push(element);
        });
        this.ucCalendar.options.events =  this.turnosc;
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'Error obteniendo la agenda' });
        }
      }
    ); 
  }

  getClientes(){
    this.usuarioService.getUsers().subscribe(
      (data) => {
        this.clientes = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los clientes' });
        }
      }
  );
  }

  //Filtros listas desplegables
  filtradoClientes(event) {
    let query = event.query;
    this.clientesFiltrados = this.clientes.filter(cli => cli.identificador.toLowerCase().indexOf(query.toLowerCase()) != -1 );
  }
  filtradoPacientes(event){
    let query = event.query;
    this.pacientesfil = this.pacientes.filter(g => g.nombre.toLowerCase().includes(query) &&  g.propietario.userId == this.clienteSel.userId);
  }
  filtradoPracticas(event){
    let query = event.query;
    this.itemsfil = this.items.filter(g => g.nombre.toLowerCase().includes(query));
  }
  filtradoPersonal(event){
    let query = event.query;
    this.personalsfil = this.personals.filter(g => g.matricula.toLowerCase().includes(query));
  }

  seleccionCliente(elemento: User) {
    this.clienteSel = elemento;
    this.turno.paciente = null;
    this.pacientesfil = this.pacientes.filter(g => g.propietario.userId == this.clienteSel.userId);
  }


  crearTurno(){
    /*this.turno.start=new Date(this.fecini+"T"+this.fecinihra);
    this.turno.end=new Date(this.fecfin+"T"+this.fecfinhra);*/
    if(this.fecfinhra.length == 5){
      this.fecfinhra += ":00";
    }
    if(this.fecinihra.length == 5){
      this.fecinihra += ":00";
    }
    this.turno.UserId = this.user.userId;
    this.turno.start= new Date(this.fecini+"T"+this.fecinihra+".000Z");
    this.turno.end=new Date(this.fecfin+"T"+this.fecfinhra+".000Z");
    
    this.turno.idPaciente = 100;
    this.turno.idPaciente = this.turno.paciente.id;
    
    this.turno.idPractica = this.turno.practica.id;
    this.turno.idProfesional = this.turno.profesional.userId;
    this.turnoService.addTurno(this.turno).subscribe(
      (data) => {
        this.getTurnos();
        this.display = false;
        this.turno = new Turno;
        this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Registro', detail: 'Registro guardado correctamente' });
        /*this.turnos = data;
        this.ucCalendar.options.events =  this.turnos;*/
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo crear el turno' });
        }
      }
    ); 
  }

  eliminarTurno(){
    this.turno.UserId = this.user.userId;
    this.turnoService.deleteTurno(this.turno).subscribe(
      (data) => {
        this.getTurnos();
        this.display = false;
        this.turno = new Turno;
        this.messageService.add({ key: 'alert', sticky:true, severity: 'success', summary: 'Eliminación', detail: 'Se elimino el turno correctamente' });
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400 || error.status === 404) {
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: `${error.error}` });
        }else{
          this.messageService.add({ key: 'alert', sticky:true, severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el turno' });
        }
      }
    ); 
  }
}
