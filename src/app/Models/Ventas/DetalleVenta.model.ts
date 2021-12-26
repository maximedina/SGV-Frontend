import { Item } from '../Items/Item.model';
import { Venta } from './Venta.model';


export class DetalleVenta {
  id: number;
  item: Item;
  descuento: number=0;
  cantidad: number=1;
  precio:number=0;
  venta: Venta;
  importe: number=parseFloat(((1-(this.descuento/100))*this.cantidad*this.precio).toFixed(2));
  itemId:number;
  seleccionado:boolean=false;
}