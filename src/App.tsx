import React from 'react';
import { Clock } from "./components/Clock"
import { Forecast } from "./components/Forecast";

export const App: React.FC = () => {
  return (
    <div>
      <Clock />
      <Forecast />
    </div>
  );
}
