import { useFetchJSON } from "./fetch";
import { buildURL } from "../utils/urls";
import { useEveryNMinutes } from "./clock";

const ACCUWEATHER_API_KEY =
  !process.env.REACT_APP_USE_TESTDATA &&
  process.env.REACT_APP_ACCUWEATHER_API_KEY;
const URL = buildURL(
  "https://dataservice.accuweather.com/forecasts/v1/daily/5day/133328",
  {
    apikey: ACCUWEATHER_API_KEY || "",
    language: "fi",
    details: "true",
    metric: "true"
  }
);

export const useForecast = ACCUWEATHER_API_KEY
  ? () => {
      const cron = useEveryNMinutes(60);
      return useFetchJSON<OneDayForecast>(URL, cron);
    }
  : () => require("../testdata/forecast.json") as OneDayForecast;

export type ForecastValue = {
  Value: number;
  Unit: string;
  UnitType: number;
};

export type ForecaseMinMax = {
  Minimum: ForecastValue;
  Maximum: ForecastValue;
};

export type ForecastRiseSet = {
  Rise: string;
  EpochRise: number;
  Set: string;
  EpochSet: number;
};

export type ForecastAirQuality = {
  Name: string;
  Value: number;
  Category: string;
  CategoryValue: number;
};

export type ForecastWind = {
  Speed: ForecastValue;
  Direction: {
    Degrees: number;
    Localized: string;
    English: string;
  };
};

export type ForecastData = {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  PrecipitationIntensity: string;
  ShortPhrase: string;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  Wind: ForecastWind;
  WindGust: ForecastWind;
  TotalLiquid: ForecastValue;
  Rain: ForecastValue;
  Snow: ForecastValue;
  Ice: ForecastValue;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  HoursOfIce: number;
  CloudCover: number;
};

export type OneDayForecast = {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: Array<{
    Date: string;
    EpochDate: number;
    Sun: ForecastRiseSet;
    Moon: ForecastRiseSet & {
      Phase: string;
      Age: number;
    };
    Temperature: ForecaseMinMax;
    RealFeelTemperature: ForecaseMinMax;
    RealFeelTemperatureShade: ForecaseMinMax;
    HoursOfSun: number;
    DegreeDaySummary: {
      Heating: ForecastValue;
      Cooling: ForecastValue;
    };
    AirAndPollen: ForecastAirQuality[];
    Day: ForecastData;
    Night: ForecastData;
    Sources: string[];
    MobileLink: string;
    Link: string;
  }>;
};
