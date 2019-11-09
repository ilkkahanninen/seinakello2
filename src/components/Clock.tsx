import React from 'react';
import styled from 'styled-components'
import { useClock, formatTime, formatDate } from "../hooks/clock";

const Container = styled.div`
  display: flex;
`

const TimeLabel = styled.div`
  width: 50%;
  text-align: right;
  padding-right: 10px;
  font-size: 120px;
  line-height: 120px;
`

const DateLabel = styled.div`
  width: 50%;
  text-align: left;
  padding-left: 10px;
  font-size: 24px;
  line-height: 60px;
`

export const Clock: React.FC = () => {
  const { time, calendar } = useClock()
  return (
    <Container>
      <TimeLabel>{formatTime(time)}</TimeLabel>
      <DateLabel>{formatDate(time)}</DateLabel>
    </Container>
  )
}

