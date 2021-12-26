import { Provincia } from './Provincia.model';

export class Ciudad {
  id: number;
  nombre: string;
  provincia: Provincia; 
  inactivo: boolean;
}
