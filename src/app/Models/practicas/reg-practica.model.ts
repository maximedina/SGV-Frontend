import { Paciente } from '../Pacientes/Paciente.model';
import { User } from '../Security/User.model';
import { DetallePractica } from '../practicas/detalle-practica.model';
import { Vacuna } from '../practicas/vacuna.model';
import { Desparacitacion } from '../practicas/desparacitacion.model';
import { Turno } from '../Turnos/Turno.model';
export class RegistroPractica {
    idPractica: number;
    userId:number;
    clienteId:number;
    pacienteId:number;
    fechaRegistro:Date;
    comentarios:string;
    estatus:string;
    total:number;
    descuento:number;

    paciente:Paciente;
    cliente:User;
    usuario:User;
    detallePractica:DetallePractica[];
    
    vacuna:Vacuna[];
    desparacitacion:Desparacitacion[];

    turnoid:number;
}