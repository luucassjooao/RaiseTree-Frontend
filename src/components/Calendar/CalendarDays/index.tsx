import { useCallback } from 'react';
import { TDay } from '../types';
import { TableContent } from './styled';

type TCalendar = {
  data: Date;
  // eslint-disable-next-line no-unused-vars
  ChangeCurrentDay(day: TDay): void;
  pickingDates: string[];
}

export default function CalendarDays({ data, ChangeCurrentDay, pickingDates }: TCalendar) {
  const firstDayOfMonth = new Date(data.getFullYear(), data.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays: TDay[] = [];

  // eslint-disable-next-line no-plusplus
  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay: TDay = {
      currentMonth: (firstDayOfMonth.getMonth() === data.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === data.toDateString()),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }
  const formatDates = pickingDates.map((date) => {
    const [d, m, y] = date.split('/');
    if (Number(m) < 10) {
      const [numberMonth] = m.slice(1);
      return `${d}/${numberMonth}/${y}`;
    }
    return date;
  });

  const findDay = useCallback(
    (year: number, month: number, day: number) => formatDates.find((i) => {
      if (day < 10) {
        return i === `0${day}/${month}/${year}`;
      }
      return i === `${day}/${month}/${year}`;
    }),
    [],
  );

  return (
    <TableContent>
      {currentDays.map((day) => (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
        <div
          className={`calendar-day${day.currentMonth ? ' current' : ' not-current'}${findDay(day.year, day.month + 1, day.number) ? ' picking-dates' : ''}`}
          role="button"
          onClick={() => ChangeCurrentDay(day)}
          key={Math.random()}
        >
          <p>{day.number}</p>
        </div>
      ))}

    </TableContent>
  );
}
