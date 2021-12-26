import { Rubro } from './Rubro.model';


export class Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  rubro: Rubro; 
  inactivo: boolean;
}
