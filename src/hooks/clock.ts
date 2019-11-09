import { useState, useEffect } from "react";
import { useFetch } from "./fetch";

export const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  });

  return time;
};

export const formatISODate = (date: Date): String =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(formatNumber)
    .join("-");

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
