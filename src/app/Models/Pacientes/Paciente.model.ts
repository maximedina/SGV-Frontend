import { Ciudad } from '../Localizacion/Ciudad.model';
import { Profile } from '../Security/Profile.model';
import { User } from '../Security/User.model';
import { Desparacitacion } from '../practicas/desparacitacion.model';
import { Vacuna } from '../practicas/vacuna.model';


export class Paciente {
  id: number;
  nombre: string;
  propietario: User;
  fechaNacimiento: Date;
  fechaFallecimiento: Date;
  foto: string;
  observaciones: string;
  inactivo: boolean;
  fallecido: boolean;

  vacuna:Vacuna[];
  desparacitacion:Desparacitacion[];
}
