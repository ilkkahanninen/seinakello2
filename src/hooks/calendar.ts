import { useClock } from "./clock";
import { useFetchJSON } from "./fetch";
import { formatISODate } from "../utils/dates";

export interface CalendarEntry {
  date: string;
  name: string;
  url: string;
}

export const useCalendar = () => {
  const time = useClock();
  const date = formatISODate(time);
  const cal = useFetchJSON<CalendarEntry[]>("/.netlify/functions/cal", date);

  return cal
    ? cal.filter(entry => entry.date === date).map(entry => entry.name)
    : [];
};
