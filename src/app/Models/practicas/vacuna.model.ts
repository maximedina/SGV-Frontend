import { Item } from '../Items/Item.model';
import { Paciente } from '../Pacientes/Paciente.model';
export class Vacuna {
    idVacuna: number;
    idPractica:number;
    itemId:number;
    pacienteId:number;
    fecha:Date;
    item:Item;
    paciente:Paciente;
}