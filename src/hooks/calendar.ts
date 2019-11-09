import { useClock, formatISODate } from "./clock";
import { useFetch } from "./fetch";

export interface CalendarEntry {
  date: string;
  name: string;
  url: string;
}

export const useCalendar = () => {
  const time = useClock();
  const date = formatISODate(time);
  const cal = useFetch<CalendarEntry[]>("/.netlify/functions/cal");

  console.log("haettiin", { date, cal });

  return cal
    ? cal.filter(entry => entry.date === date).map(entry => entry.name)
    : [];
};
