import React from "react"
import styled from "styled-components"
import { useForecast, ForecastData, ForecastValue } from "../hooks/forecast"

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
`

export const Forecast: React.FC = () => {
  const data = useForecast()

  const forecast = data.DailyForecasts[0]

  return (
    <Container>
      <ForecastPart data={forecast.Day} temperature={forecast.Temperature.Maximum} label="Päivällä" />
      <ForecastPart data={forecast.Night} temperature={forecast.Temperature.Minimum} label="Yöllä" />
    </Container>
  )
}

// ----------

const PartContainer = styled.div`
  display: flex;
  align-items: center;
`

const ForecastLabel = styled.div`
  width: 12%;
`

const WeatherIconContainer = styled.div`
  width: 15%;
`

const WeatherIcon = styled.img`
  display: block;
  height: 64px;
  width: auto;
`

const Temperature = styled.span`
  font-size: 48px;
  width: 23%;
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
      <WeatherIconContainer>
        <WeatherIcon src={`https://www.accuweather.com/images/weathericons/${data.Icon}.svg`} />
      </WeatherIconContainer>
      <Temperature>
        {temperature.Value}°
        <TemperatureUnit>{temperature.Unit}</TemperatureUnit>
      </Temperature>
      <Description>{data.LongPhrase}</Description>
    </PartContainer>
  )
}