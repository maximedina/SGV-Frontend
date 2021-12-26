import { utils } from 'protractor';
import { Item } from '../Items/Item.model';
import { Paciente } from '../Pacientes/Paciente.model';
import { Personal } from '../personal/personal.model';
import { User } from '../Security/User.model';
//import {EventColor} from 'calendar-utils'
//import {EventAction} from 'calendar-utils'

export class Turno {
    id: number;
    start: Date;
    end?: Date;
    title: string;
   // color?: EventColor;
    //actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
 
    paciente: Paciente;
    practica: Item;
    profesional: Personal;
    observaciones: string; 
    idPaciente:number;
    idPractica:number;
    idProfesional:number;
    inactivo:boolean;
    tomado:boolean;
    color:string="#31D358";
    UserId:number;
}