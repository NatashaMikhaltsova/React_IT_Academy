import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import isoFetch from 'isomorphic-fetch';
import { format } from "date-fns";

import './CalendarView.css';
import NewEventButton from "../components/NewEventButton";
import noEventToday from "../images/img.png";
import MonthCalendar from "../components/MonthCalendar";

const getSortedMonthEvents = (dataArr) => {
    let dates = [];
    let resultsSortedByDate = [];
    if (dataArr.length > 0) {
        //Get all dates
        dataArr.forEach((ev) => {
            if (!dates.includes(ev.date)) {
                dates.push(ev.date);
            }
        });
        //Sort dates
        dates.sort((a, b) => new Date(a) - new Date(b));

        dates.forEach((date) => {
            let allEvents = [];
            dataArr.forEach((ev) => {
                if (ev.date === date) {
                    allEvents.push(ev);
                }
            });
            resultsSortedByDate.push({ date: date, events: allEvents });
        });
    }
    return resultsSortedByDate;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CalendarView = () => {
    const today = new Date();
    const [status, setStatus] = useState("loading");
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [monthEvents, setMonthEvents] = useState([]);

    // Handle function to pass to Calendar
    const updateCurrentMonth = (month) => setCurrentMonth(month);
    const navigate = useNavigate();

    useEffect(() => {
        setStatus("loading");
        const fetchData = async () => {
            const response = await isoFetch("http://localhost:3005/events");
            // convert the data to json
            let data = await response.json();
            let filteredMonthData = data.filter(el => monthNames[currentMonth] === el.date.match(/ \w+? /g)[0].trim());
            setMonthEvents(getSortedMonthEvents(filteredMonthData));
            setStatus("idle");
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch((error) => {
                console.log("error!", error);
            });
    }, [currentMonth]);

    const getEventsAfterCreate = async () => {
        setStatus("loading");

        const fetchData = async () => {
            const response = await isoFetch("http://localhost:3005/events");
            // convert the data to json
            let data = await response.json();
            let filteredMonthData = data.filter(el => monthNames[currentMonth] === el.date.match(/ \w+? /g)[0].trim());
            setMonthEvents(filteredMonthData);
            setStatus("idle");
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch((error) => {
                console.log("error!", error);
            });
    };

    return (
        <div className="CalendarViewWrapper">
            <NewEventButton refreshEvents={getEventsAfterCreate} />

            <div className="CalendarViewTabs">
                <div className="CalendarViewNavIcon">
                    <AiOutlineHome onClick={() => navigate("/")} size={30} />
                </div>
                <div className="CalendarViewTabItem" onClick={() => navigate("/calendar-month")}>month</div>
                <div className="CalendarViewTabItem"
                    onClick={() => navigate(`/week/${format(new Date(), "y-MM-dd")}`)}
                    style={{ backgroundColor: "#b5cdfd" }}>
                    week
                </div>
                <div className="CalendarViewTabItem"
                    style={{ backgroundColor: "#b5cdfd" }}
                    onClick={() => navigate(`/date/${format(new Date(), "y-MM-dd")}`)}>
                    Day
                </div>
            </div>
            <MonthCalendar updateCurrentMonth={updateCurrentMonth} />

            {status === "loading" ? null : (
                <>
                    {monthEvents && monthEvents.length === 0 ? (
                        <div className="CalendarViewNoEventsSection">
                            <p>You have nothing planned!</p>
                            <p>Tap " + " to add a task.</p>
                            <img className="CalendarViewAddEventImg" src={noEventToday} alt="Add fun activities" />
                        </div>
                    ) : null}
                    <div>
                        {monthEvents && monthEvents.map((ev) => (
                            <div key={`${ev.date}`} className="CalendarViewEventBox"
                                onClick={() => navigate(`/date/${format(new Date(ev.date), "y-MM-dd")}`)}
                            >
                                <div className="CalendarViewDateBox">
                                    <div className="CalendarViewdayName">
                                        {format(new Date(ev.date), "EEE")}
                                    </div>
                                    <div className="CalendarViewdayNum">{format(new Date(ev.date), "d")}</div>
                                </div>
                                <div className="CalendarViewDayEventsBox">
                                    {ev.events.map((meeting) => (
                                        <div key={meeting.id}>
                                            <div className="CalendarViewEventTitle">
                                                {"‣ "}
                                                {meeting.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarView;