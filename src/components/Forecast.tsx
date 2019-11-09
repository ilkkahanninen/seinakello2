import React from "react"
import styled from "styled-components"
import { useForecast, ForecastData, ForecastValue } from "../hooks/forecast"

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`

export const Forecast: React.FC = () => {
  const data = useForecast()

  const forecast = data.DailyForecasts[0]

  return (
    <Container>
      <ForecastPart data={forecast.Day} temperature={forecast.Temperature.Maximum} label="Tänään" />
      <ForecastPart data={forecast.Night} temperature={forecast.Temperature.Minimum} label="Yöllä" />
    </Container>
  )
}

// ----------

const PartContainer = styled.div`
  width: 200px;
  text-align: left;
`

const WeatherIcon = styled.img`
  display: block;
  width: 50%;
  height: auto;
  margin: 40px 0;
`

const Temperature = styled.span`
  font-size: 64px;
`

const TemperatureUnit = styled.span`
`

const Description = styled.div``

interface ForecastPartProps {
  data: ForecastData;
  temperature: ForecastValue;
  label: string;
}

const ForecastPart = ({ data, temperature, label }: ForecastPartProps) => {
  return (
    <PartContainer>
      <div>{label}</div>
      <WeatherIcon src={`https://www.accuweather.com/images/weathericons/${data.Icon}.svg`} />
      <Temperature>{temperature.Value}°</Temperature>
      <TemperatureUnit>{temperature.Unit}</TemperatureUnit>
      <Description>{data.LongPhrase}</Description>
    </PartContainer>
  )
}