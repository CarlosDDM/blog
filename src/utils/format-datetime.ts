import {
  format,
  formatDistanceToNow as dateFnsFormatDateToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formateDateTime(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}
export function formatDateToNow(rawDate: string): string {
  const date = new Date(rawDate);

  return dateFnsFormatDateToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}
