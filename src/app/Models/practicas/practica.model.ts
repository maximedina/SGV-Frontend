import { Paciente } from '../Pacientes/Paciente.model';
import { User } from '../Security/User.model';
import { Turno } from '../Turnos/Turno.model';
import { Venta } from '../Ventas/Venta.model';
import { Item } from '../Items/Item.model';
export class Practica {
    id: number;
    fechaHora:Date;
    ventaId:number;
    turnoId:number;
    pacienteId:number;
    userId:number;
    itemId:number;
    clienteId:number;
    proximaPractica:Date;
    texto:string;

    venta:Venta;//Venta registrada
    turno:Turno;//Turno seleccionado 
    item:Item;//Practica seleccionada
    paciente:Paciente;
    usuario:User;
}