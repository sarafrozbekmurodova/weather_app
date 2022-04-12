import { add, differenceInDays, startOfToday, startOfDay } from 'date-fns';

export const getDayDiff = (d: Date) => {
  const date = startOfDay(d);
  const weekFromNow = add(startOfToday(), {
    weeks: 1,
  });
  return differenceInDays(weekFromNow, date);
};
