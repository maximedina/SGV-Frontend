import { Categoria } from "./Categoria.model";
import { Grupo } from "./Grupo.model";

export class Rubro {
  id: number;
  nombre: string;
  descripcion: string;
  inactivo: boolean=false;
  grupo: Grupo;
  categorias:Categoria[];
}