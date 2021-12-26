import { Especie } from "./Especie.model";

export class Raza {
  id: number;
  nombre: string;
  descripcion: string;
  inactivo: boolean;
  especie: Especie;
}