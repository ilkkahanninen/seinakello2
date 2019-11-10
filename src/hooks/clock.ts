import { useState, useEffect } from "react";

export const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  });

  return time;
};

export const useEveryNMinutes = (minutes: number) => {
  const time = useClock();
  return `${time.getHours()}/${Math.floor(time.getMinutes() / minutes)}`;
};
