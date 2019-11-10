import React from 'react';
import styled from 'styled-components'
import { useClock } from "../hooks/clock";
import { useCalendar } from "../hooks/calendar";
import { formatTime, formatDate } from "../utils/dates";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`

const TimeLabel = styled.div`
  font-size: 180px;
  font-weight: 100;
  margin-bottom: 40px;
`

const CalendarContainer = styled.div`
  margin: 0 0 50px;
`

const DateLabel = styled.div`
  font-size: 32px;
  font-weight: 100;
  margin-bottom: 15px;
`

const CalendarLabel = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 200;
`

export const Clock: React.FC = () => {
  const time = useClock()
  const calendar = useCalendar()

  return (
    <Container>
      <TimeLabel>{formatTime(time)}</TimeLabel>
      <CalendarContainer>
        <DateLabel>{formatDate(time)}</DateLabel>
        {calendar.map(e => <DateLabel key={e.name}>{e.name}</DateLabel>)}
      </CalendarContainer>
    </Container>
  )
}

