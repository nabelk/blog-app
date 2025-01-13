import { differenceInHours } from 'date-fns';

export function isOneHour(timeNow: string, timeBefore: string) {
  return differenceInHours(timeBefore, timeNow) >= 1;
}
