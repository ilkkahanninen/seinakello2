import React from 'react';
import styled from 'styled-components'
import { useClock } from "../hooks/clock";
import { useCalendar } from "../hooks/calendar";
import { formatTime, formatDate } from "../utils/dates";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
`

const TimeLabel = styled.div`
  width: 50%;
  text-align: right;
  padding-right: 10px;
  font-size: 120px;
  line-height: 120px;
`

const CalendarContainer = styled.div`
  width: 50%;
  text-align: left;
  padding-left: 10px;
`

const DateLabel = styled.div`
  font-size: 24px;
  line-height: 46px;
`

const CalendarLabel = styled.div`
  font-size: 16px;
  line-height: 16px;
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

