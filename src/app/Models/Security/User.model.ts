import { Ciudad } from '../Localizacion/Ciudad.model';
import { Profile } from './Profile.model';

export class User {
    userId: number;
    name: string;
    login: string;
    profile: Profile;
    email : string;
    password: string;
    isDeleted: boolean;
    fechaNacimiento: Date;
    calle: string;
    altura: string;
    piso: string;
    dpto: string;
    ciudad: Ciudad;
    telefono: string;
    observaciones: string;
    cuentaCorriente: number;
    limiteCC: number;
    inactivo: boolean;
    deshabilitado: boolean;
    avisos: boolean;
    notificacionTurnos: boolean;
    notificacionProxVisita: boolean;
    identificador: string;
    domicilio: string;

}