import { Categoria } from './Categoria.model';
import { Proveedor } from './Proveedor.model';
import { Tipo } from './Tipo.model';

export class Item {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  precioCosto: number;
  porcentajePrecio: number;
  iva: number;
  presentacion: string;
  stock: number;
  stockMinimo: number; 
  inactivo: boolean;
  identificador: string;
  precioVenta: number;
  categoria: Categoria; 
  tipo: Tipo;
  proveedor: Proveedor;
  categoriaId:number;
  tipoId:number;
}