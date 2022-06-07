import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Homepage from "./pages/Homepage";
import CalendarView from "./pages/CalendarView";
import DayViewWithData from "./pages/DayView";

function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/calendar-month" element={<CalendarView />} />
					<Route path="/date/:date" element={<DayViewWithData />} />
				</Routes>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;