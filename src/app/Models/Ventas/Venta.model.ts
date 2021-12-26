import { sortAndDeduplicateDiagnostics } from 'typescript';
import { User } from '../Security/User.model';
import { Usuario } from '../Usuarios/Usuario.model';
import { DetalleVenta } from './DetalleVenta.model';
import { TipoPago } from './TipoPago.model'

export class Venta {
  id: number;
  fechaHora:Date;
  total: number = 0;
  tipoPago: TipoPago;
  tipoPagoId: string;
  ticketTarjeta: string;
  cliente: User;
  operador: User;
  descuento: number = 0;
  detalleVenta: DetalleVenta[];
  idCaja:number;
  userId:number;
  comentario:string;
  estatus:string;
}