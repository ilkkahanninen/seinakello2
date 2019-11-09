import { useState, useEffect } from "react";
import { useFetch } from "./fetch";

export const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  });

  const calendar = useFetch(
    "http://www.webcal.fi/cal.php?id=3&format=json&start_year=current_year&end_year=current_year&tz=Europe%2FHelsinki"
  );

  return { time, calendar };
};

export const formatTime = (time: Date): String =>
  [time.getHours(), time.getMinutes()].map(formatNumber).join(".");

export const formatDate = (date: Date): String =>
  `${dayName(date)} ${date.getDate()}. ${monthName(
    date
  )} ${date.getFullYear()}`;

const formatNumber = (n: Number): String => n.toString().padStart(2, "0");

const dayName = (date: Date): String =>
  [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai"
  ][date.getDay()];

const monthName = (date: Date): String =>
  [
    "tammikuuta",
    "helmikuuta",
    "maaliskuuta",
    "huhtikuuta",
    "toukokuuta",
    "kesäkuuta",
    "heinäkuuta",
    "elokuuta",
    "syyskuuta",
    "lokakuuta",
    "marraskuuta",
    "joulukuuta"
  ][date.getMonth()];
