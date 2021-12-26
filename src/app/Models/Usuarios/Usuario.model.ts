import { Ciudad } from '../Localizacion/Ciudad.model';
import { Profile } from '../Security/Profile.model';


export class Usuario {
  UserId: number;
  Login: string;
  Password: string;
  Name: string;
  Profile: Profile;
  IsDeleted: boolean;
  Email: string;
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
}
