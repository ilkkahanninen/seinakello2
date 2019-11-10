import { useFetchXML } from "./fetch";

export type Observation = {
  time: string;
  value: number;
};

export type Observations = {
  [key: string]: Observation[];
};

export const useWeather = () =>
  useFetchXML(
    "https://opendata.fmi.fi/wfs?request=getFeature&storedquery_id=fmi%3A%3Aobservations%3A%3Aweather%3A%3Atimevaluepair&crs=EPSG%3A%3A3067&fmisid=100971"
  );

export const pickObservations = (data: any): Observations =>
  data && data["wfs:FeatureCollection"]
    ? data["wfs:FeatureCollection"]["wfs:member"]
        .map(
          (member: any) =>
            member["omso:PointTimeSeriesObservation"][0]["om:result"][0][
              "wml2:MeasurementTimeseries"
            ][0]
        )
        .map((result: any) => ({
          type: result["$"]["gml:id"],
          series: result["wml2:point"].map((point: any) => {
            const pt = point["wml2:MeasurementTVP"][0];
            const time = pt["wml2:time"][0];
            const value = pt["wml2:value"][0];
            return {
              time: pt["wml2:time"][0],
              value: pt["wml2:value"][0]
            };
          })
        }))
        .reduce(
          (obj: Observations, obs: any) => ({ ...obj, [obs.type]: obs.series }),
          {}
        )
    : {};

export const pickLatest = (observations?: Observation[]): Observation | null =>
  observations
    ? [...observations].sort((a, b) =>
        a.time < b.time ? 1 : a.time > b.time ? -1 : 0
      )[0]
    : null;
