import { Rubro } from "./Rubro.model";

export class Grupo {
  id: number;
  nombre: string;
  descripcion: string;
  inactivo: boolean;
  rubros:Rubro[];
}