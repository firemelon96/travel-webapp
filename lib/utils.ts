import { clsx, type ClassValue } from 'clsx';
import { parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertStringDateToDate = (date: string) => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

  return parsedDate;
};
