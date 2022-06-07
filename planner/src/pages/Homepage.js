import React from "react";
import { format } from "date-fns";
import { GoCalendar } from "react-icons/go";
import { MdToday } from "react-icons/md";
import { NavLink } from 'react-router-dom';

import plannerLogo from "../images/planner_logo.png";
import NewEventDialog from "../components/NewEventDialog";
import Weather from "../components/Weather";
import NewsFeed from "../components/NewsFeed";
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
        <div className="HomepageWrapper">
            <div className="HomepageTopBanner">
                <img src={plannerLogo} alt="planner logo" />
                <div className="HomepageGreeting">
                    <div className="HomepageWelcome">{greeting}</div>
                    <div className="HomepageMainDate">It's {format(today, "EEEE, LLLL do").toLowerCase()}.</div>
                </div>
            </div>
            <div className="HomepageSectionTitle">Explore your planner</div>
            <div className="HomepageActionSec">
                <NavLink to={`/date/${format(today, "y-MM-dd")}`} className="HomepageActionIcon">
                    <MdToday size="40" color={"#787ab8"} />
                    <span className="HomepageIconText">Today</span>
                </NavLink>
                <NavLink to="/calendar-month" className="HomepageActionIcon">
                    <GoCalendar size="40" color={"#787ab8"} />
                    <span className="HomepageIconText">Month</span>
                </NavLink>
            </div>
            <Weather />
            <NewsFeed today={today} />
            <NewEventDialog />
        </div>
    );
};

export default Homepage;