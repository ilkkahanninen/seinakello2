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
  font-size: 200px;
  font-weight: 100;
`

const CalendarContainer = styled.div`
`

const DateLabel = styled.div`
  font-size: 32px;
  margin: 0 0 50px;
  font-weight: 100;
`

const CalendarLabel = styled.div`
  font-size: 16px;
  line-height: 24px;
`

export const Clock: React.FC = () => {
  const time = useClock()
  const calendar = useCalendar()

  return (
    <Container>
      <TimeLabel>{formatTime(time)}</TimeLabel>
      <CalendarContainer>
        <DateLabel>{formatDate(time)}</DateLabel>
        {calendar.map(n => <CalendarLabel key={n}>{n}</CalendarLabel>)}
      </CalendarContainer>
    </Container>
  )
}

