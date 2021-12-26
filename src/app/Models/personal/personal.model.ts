import { Usuario } from "../Usuarios/Usuario.model";

export class Personal {
    id: number;
    legajo:number;
    matricula:string;
    observaciones:string;
    userId:number;
    inactivo:boolean;
    usuario:Usuario;
    name:string;
}