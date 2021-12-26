import { Ciudad } from '../Localizacion/Ciudad.model';

export class Proveedor {
  id: number;
  nombre: string='';
  cuentaCorriente: number=0;
  contacto: string;
  domicilio: string;
  telefono: string;
  email: string;
  ciudad: Ciudad;
  observaciones: string;
  inactivo: boolean; 
}

