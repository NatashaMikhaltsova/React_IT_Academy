import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import Homepage from "./pages/Homepage";
import CalendarView from "./pages/CalendarView";
import DayView from "./pages/DayView";
import WeekView from "./pages/WeekView";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/calendar-month">
          <CalendarView />
        </Route>
        <Route exact path="/date/:date">
          <DayView />
        </Route>
        <Route exact path="/week/:date">
          <WeekView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;