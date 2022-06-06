import React from "react";
import Calendar from "react-calendar";

import './EventCalendar.css';

const EventCalendar = ({ onClickDay }) => {
    return (
        <div className="EventCalendarWrapper">
            <Calendar 
                defaultView="month"
                prev2Label={null}
                next2Label={null}
                onClickDay={onClickDay}
            />
        </div>
    );
};

export default EventCalendar;