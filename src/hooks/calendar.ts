import { useClock } from "./clock";
import { useFetchJSON } from "./fetch";
import { formatISODate } from "../utils/dates";

export interface CalendarEntry {
  date: string;
  name: string;
  url: string;
  source: "goodToKnow" | "holiday";
  description?: string;
  flag_day?: boolean;
}

export const useCalendar = () => {
  const time = useClock();
  const date = formatISODate(time);
  const cal = useFetchJSON<CalendarEntry[]>("/.netlify/functions/cal", date);

  return cal ? cal.filter(entry => entry.date === date) : [];
};
