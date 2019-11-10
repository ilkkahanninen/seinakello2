import React, { ReactNode } from "react"
import styled from "styled-components"
import { useForecast, ForecastData, ForecastValue } from "../hooks/forecast"
import { useWeather, pickObservations, pickLatest, Observation } from "../hooks/weather"

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 30px;
`

export const Forecast: React.FC = () => {
  const weather = useWeather()
  const data = useForecast()
  const observations = pickObservations(weather)
  const forecast = data && data.DailyForecasts[0]

  return (
    <Container>
      <CurrentWeather data={observations["obs-obs-1-1-t2m"]} />
      {forecast && (
        <>
          <ForecastPart data={forecast.Day} temperature={forecast.Temperature.Maximum} label="Päivällä" />
          <ForecastPart data={forecast.Night} temperature={forecast.Temperature.Minimum} label="Yöllä" />
        </>
      )}
    </Container>
  )
}

// ----------

const PartContainer = styled.div`
  display: flex;
  align-items: center;
`

const ForecastLabel = styled.div`
  font-weight: 100;
  width: 15%;
`

const WeatherIconContainer = styled.div`
  width: 15%;
`

const WeatherIcon = styled.img`
  display: inline-block;
  height: 64px;
  width: auto;
  margin-top: 15px;
`

const Temperature = styled.span`
  font-size: 50px;
  width: 35%;
`

const TemperatureUnit = styled.span`
`

const Description = styled.div`
  padding-left: 10px;
`

interface ForecastPartProps {
  data: ForecastData;
  temperature: ForecastValue;
  label: string;
}

const ForecastPart = ({ data, temperature, label }: ForecastPartProps) => {
  return (
    <PartContainer>
      <ForecastLabel>{label}</ForecastLabel>
      <Temperature>
        <Measurement value={temperature.Value} threshold={0}>
          {temperature.Value}°
          <TemperatureUnit>{temperature.Unit}</TemperatureUnit>
        </Measurement>
      </Temperature>
      <WeatherIconContainer>
        <WeatherIcon src={`https://www.accuweather.com/images/weathericons/${data.Icon}.svg`} />
      </WeatherIconContainer>
      <Description>{data.LongPhrase}</Description>
    </PartContainer>
  )
}


const TemperatureNow = styled.div`
  text-align: center;
  font-size: 160px;
  margin-bottom: 50px;
  font-weight: 100;
`

interface CurrentWeatherProps {
  data?: Observation[]
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const latest = pickLatest(data)
  return (
    <TemperatureNow>
      {latest && (
        <Measurement value={latest.value} threshold={0}>
          {latest.value}°
            <TemperatureUnit>C</TemperatureUnit>
        </Measurement>
      )}
    </TemperatureNow>
  )
}

//

interface MeasurementProps {
  value: number,
  threshold: number,
  children: ReactNode
}

const MeasurementAbove = styled.span`color: #FF2255`
const MeasurementBelow = styled.span`color: rgb(40, 138, 219)`

const Measurement = ({ value, threshold, children }: MeasurementProps) =>
  value >= threshold
    ? <MeasurementAbove>{children}</MeasurementAbove>
    : <MeasurementBelow>{children}</MeasurementBelow>
