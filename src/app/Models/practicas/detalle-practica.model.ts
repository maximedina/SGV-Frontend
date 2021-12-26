import { Item } from '../Items/Item.model';
export class DetallePractica {
    idDetalle: number;
    idPractica:number;
    itemId:number;
    cantidad:number;
    precio:number;
    descuento:number;
    importe:number;
    item:Item;
}