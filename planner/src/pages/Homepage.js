import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { GoCalendar } from "react-icons/go";
import { BiCalendarWeek, BiTimer } from "react-icons/bi";
import { MdToday } from "react-icons/md";

import plannerLogo from "./planner_logo.png";
import NewEventButton from "../Components/NewEventButton";
import Weather from "../Components/Weather";
import NewsFeed from "../Components/NewsFeed";
import './Homepage.css';

const Homepage = () => {
    const today = new Date();

    let greeting = "";
    if (today.getHours() < 12) {
        greeting = "Good morning!";
    } else if (today.getHours() < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }

    return (
        <Router>
            <div className="Wrapper">
                <div className="TopBanner">
                    <div className="Logo"><image src={plannerLogo} /></div>
                    <div className="Greeting">
                        <div className="Welcome">{greeting}</div>
                        <div className="MainDate">It's {format(today, "EEEE, LLLL do").toLowerCase()}.</div>
                    </div>
                </div>
                <div className="SectionTitle">Explore your planner</div>
                <div className="ActionSec">
                    <NavLink to={`/date/${format(today, "y-MM-dd")}`}>
                        <div className="ActionIcon">
                            <MdToday size="40" color={`${COLORS.icon1}`} />
                            <span className="IconText">Today</span>
                        </div>
                    </NavLink>
                    <NavLink to={`/week/${format(today, "y-MM-dd")}`}>
                        <div className="ActionIcon">
                            <BiCalendarWeek size="40" color={`${COLORS.icon1}`} />
                            <span className="IconText">Week</span>
                        </div>
                    </NavLink>
                    <NavLink to="/calendar-month">
                        <div className="ActionIcon">
                            <GoCalendar size="40" color={`${COLORS.icon1}`} />
                            <span className="IconText">Month</span>
                        </div>
                    </NavLink>
                </div>
                <Weather />
                <NewsFeed today={today} />
                <NewEventButton />
            </div>
        </Router>

    );
};

export default Homepage;