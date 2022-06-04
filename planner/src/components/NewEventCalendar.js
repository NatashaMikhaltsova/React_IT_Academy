import React from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";

import { calendarEvents, ESetDateForEvent } from '../eventEmitter';
import './NewEventCalendar.css';

const NewEventCalendar = ({ onChange, value, onClickDay }) => {

    let setDateForEvent = (event) => {
        event.preventDefault();

        let formattedDate = format(value, "EEE MMM d, y");
        calendarEvents.emit(ESetDateForEvent, formattedDate);
    }

    return (
        <div className="NewEventCalendarWrapper">
            <Calendar
                onChange={onChange}
                defaultView="month"
                value={value}
                prev2Label={null}
                next2Label={null}
                onClickDay={onClickDay}
            />
            <div className="NewEventCalendarButtonBox">
                <button className="NewEventCalendarOkButton" onClick={setDateForEvent}>Ok</button>
            </div>
        </div>
    );
};

export default NewEventCalendar;