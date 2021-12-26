import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const HOY = new Date();

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Pili - Corte pelo',
    start: sumarDias(-1).toISOString().replace(/T.*$/, '') + 'T11:00:00',
    end: sumarDias(-1).toISOString().replace(/T.*$/, '') + 'T11:30:00',
    color: '#FF5733'
  },
  {
    id: createEventId(),
    title: 'Juana - Corte pelo',
    start: sumarDias(2).toISOString().replace(/T.*$/, '') + 'T14:00:00',
    end: sumarDias(2).toISOString().replace(/T.*$/, '') + 'T14:30:00',
    color: '#FF5733'
  },
  {
    id: createEventId(),
    title: 'Pili - Consulta',
    start: sumarDias(1).toISOString().replace(/T.*$/, '') + 'T09:00:00',
    end: sumarDias(1).toISOString().replace(/T.*$/, '') + 'T09:30:00',
    color: '#27AE60'
  },
  {
    id: createEventId(),
    title: 'Juana - Desparasitación',
    start: sumarDias(0).toISOString().replace(/T.*$/, '') + 'T13:00:00',
    end: sumarDias(0).toISOString().replace(/T.*$/, '') + 'T13:30:00',
    color: '#27AE60'
  },
  {
    id: createEventId(),
    title: 'Pili - Baño',
    start: sumarDias(0).toISOString().replace(/T.*$/, '') + 'T10:00:00',
    end: sumarDias(0).toISOString().replace(/T.*$/, '') + 'T10:30:00',
    color: '#FF5733'
  }
];

function sumarDias(dias){
  let nuevaFecha=new Date();
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  console.log(nuevaFecha)
  return nuevaFecha;
}

export function createEventId() {
  return String(eventGuid++);
}
