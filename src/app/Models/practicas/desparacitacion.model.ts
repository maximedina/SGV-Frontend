import { Item } from '../Items/Item.model';
import { Paciente } from '../Pacientes/Paciente.model';
export class Desparacitacion {
    idDesparacitacion: number;
    idPractica:number;
    itemId:number;
    pacienteId:number;
    fecha:Date;
    item:Item;
    paciente:Paciente;
}