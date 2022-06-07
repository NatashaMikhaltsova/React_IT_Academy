import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { format } from "date-fns";
import isoFetch from 'isomorphic-fetch';

import './DayView.css';
import NewEventDialog from "../components/NewEventDialog";
import picture from '../images/img.png';
import DayEventView from "../components/DayEventView";
import { withDataLoad } from '../components/withDataLoad';

const fetchConfig = {
    URL: "http://localhost:3005/events",
    method: 'get',
    headers: {
        "Accept": "application/json",
    },
};

const DayView = ({ initDayEvents }) => {
    const [dayEvents, setDayEvents] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const day = new Date(
        params.date.slice(0, 4),
        params.date.slice(5, 7) - 1,
        params.date.slice(8, 10)
    );
    let dayString = format(day, "EEE MMM d, y");

    useEffect(() => {
        let filteredData = initDayEvents.filter(el => dayString === el.date);
        setDayEvents(filteredData);
    }, [dayString, initDayEvents]);

    const getDayEventsAfterDeleteAdd = async () => {
        const fetchData = async () => {
            const response = await isoFetch("http://localhost:3005/events");
            // convert the data to json
            let data = await response.json();
            let filteredData = data.filter(el => dayString === el.date);
            setDayEvents(filteredData);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch((error) => {
                console.log("error!", error);
            });
    };

    const nextDay = () => {
        let nextDay = new Date().setDate(day.getDate() + 1);
        let nextDayString = format(nextDay, "y-MM-dd");
        navigate(`/date/${nextDayString}`);
    };

    const previousDay = () => {
        let previousDay = new Date().setDate(day.getDate() - 1);
        let previousDayString = format(previousDay, "y-MM-dd");
        navigate(`/date/${previousDayString}`);
    };

    return (
        <div className="DayViewWrapper">
            <NewEventDialog refreshEvents={getDayEventsAfterDeleteAdd} />
            <div className="DayViewTabs">
                <NavLink to={"/"} className="DayViewNavIcon">
                    <AiOutlineHome size={30} />
                </NavLink>
                <NavLink to={`/month/${format(day, "MMM")}`} className="DayViewTabItem" style={{ backgroundColor: "#b5cdfd" }}>
                    month
                </NavLink>
                <NavLink to={`/date/${format(day, "y-MM-dd")}`} className="DayViewTabItem">Day</NavLink>
            </div>
            <div className="DayViewHeader">
                <div className="DayViewDateDivSection">
                    <button className="DayViewArrow" style={{ cursor: "pointer" }} onClick={(ev) => previousDay()}>{"‹"}</button>
                    <div className="DayViewDateNumber">{format(day, "dd")}</div>
                    <div className="DayViewDateRightSection">
                        <div className="DayViewright">{format(day, "MMMM")}</div>
                        <div className="DayViewright">{format(day, "Y")}</div>
                    </div>
                    <button className="DayViewArrow" style={{ cursor: "pointer" }} onClick={(ev) => nextDay()}>{"›"}</button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(152,182,252,1)" />
                            <stop offset="100%" stopColor="rgba(109,231,244,1)" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="#0099ff"
                        fillOpacity="1"
                        d="M0,96L48,106.7C96,117,192,139,288,149.3C384,160,480,160,576,154.7C672,149,768,139,864,112C960,85,1056,43,1152,48C1248,53,1344,107,1392,133.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div>
            <div className="DayViewContentSection">
                {dayEvents.length === 0 ? (
                    <div className="NoEventTodayWrapper">
                        <p>You have nothing planned for the day!</p>
                        <p className="TapMsg">Tap " + " to add a task.</p>
                        <img className="NoEventTodayImg" src={picture} alt="planning event" />
                    </div>
                ) : (
                    <>
                        {dayEvents.map((dayEvent) => <DayEventView key={dayEvent.id} dayEvent={dayEvent} refreshEvents={getDayEventsAfterDeleteAdd} />)}
                    </>
                )}
            </div>
        </div>
    );
};

const DayViewWithData = withDataLoad(fetchConfig, "initDayEvents")(DayView);

export default DayViewWithData;