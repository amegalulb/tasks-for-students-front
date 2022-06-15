import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export const fDate = (date: Date) => format(new Date(date), 'dd MMMM yyyy');

export const fDateTime = (date: Date) => format(new Date(date), 'dd MMM yyyy HH:mm');

export const fDateTimeSuffix = (date: Date) => format(new Date(date), 'dd/MM/yyyy hh:mm p');

export const fToNow = (date: Date) => formatDistanceToNow(new Date(date), {
  addSuffix: true,
});
