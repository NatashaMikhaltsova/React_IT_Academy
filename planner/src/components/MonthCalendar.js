import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";

import './MonthCalendar.css';

const MonthCalendar = ({ updateCurrentMonth }) => {
    /**Calendar state and functions */
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
    }

    let navigate = useNavigate();


    /** OnClick function to go to daily view*/
    const handleClickDate = (value) => {
        let formattedDate = format(value, "y-MM-dd");
        navigate(`/date/${formattedDate}`);
    };

    const tileContent = ({ date, view }) =>
        view === "month" && date.getDay() === 2 ? <p></p> : null;

    return (
        <div className="MonthCalendarWrapper">
            <Calendar
                tileContent={tileContent}
                onChange={onChange}
                defaultView="month"
                value={value}
                prev2Label={null}
                next2Label={null}
                onClickDay={(value, event) => handleClickDate(value, event)}
                onActiveStartDateChange={({ activeStartDate, value, view }) => {
                    updateCurrentMonth(activeStartDate.getMonth());
                }}
            />
        </div>
    );
};

export default MonthCalendar;