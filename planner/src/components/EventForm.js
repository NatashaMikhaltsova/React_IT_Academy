import React, { useEffect, useState, useRef } from "react";
import { FiCalendar } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import isoFetch from 'isomorphic-fetch';
import { format } from "date-fns";

import EventCalendar from "./EventCalendar";
import './EventForm.css';

const EventForm = ({ event, closeDialog, refreshEvents }) => {
    const [form, setForm] = useState(event);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const calendarFormRef = useRef(null);

    useEffect(() => {
        if (form.title && form.date) setButtonDisabled(false);
    }, [form]);

    const handleTitle = (value) => setForm({ ...form, title: value });
    const handleDescription = (value) => setForm({ ...form, description: value });

    const setCalendarVisibility = (state) => {
        if (calendarFormRef.current) calendarFormRef.current.style.visibility = state;
    }

    const showCalendar = () => setCalendarVisibility("visible");
    const hideCalendar = () => setCalendarVisibility("hidden");

    let setDate = (date, event) => {
        event.preventDefault();
        hideCalendar();
        let formattedDate = format(date, "EEE MMM d, y");
        setForm({ ...form, date: formattedDate });
    };

    const CreateEvent = (event) => {
        event.preventDefault();

        const getLastElementID = async () => {
            const response = await isoFetch("http://localhost:3005/events");
            // convert the data to json
            let data = await response.json();
            return data[data.length - 1].id;
        }

        const fetchData = async () => {
            const lastElementID = (await getLastElementID());
            await isoFetch("http://localhost:3005/events", {
                method: "POST",
                body: JSON.stringify({ id: lastElementID + 1, ...form }),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            setButtonDisabled(true);
            refreshEvents();
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch((error) => {
                console.log("error!", error);
                setButtonDisabled(true);
            });
    };

    const UpdateEvent = (ev) => {
        ev.preventDefault();

        const fetchData = async () => {
            await isoFetch(`http://localhost:3005/events/${event.id}`, {
                method: "PUT",
                body: JSON.stringify(form),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            setButtonDisabled(true);
            refreshEvents();
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch((error) => {
                console.log("error!", error);
                setButtonDisabled(true);
            });
    };

    return (
        <div>
            <form>
                <div className="EventFormTop">
                    <input className="EventFormTitle" type="text" placeholder="Event title" value={form.title} onChange={(ev) => handleTitle(ev.target.value)} />
                    <input className="EventFormDescription" type="text" placeholder="What will happen?" value={form.description} onChange={(ev) => handleDescription(ev.target.value)} />
                </div>
                <div className="EventFormSection">
                    <label className="EventFormLabel">Date</label>
                    <div className="EventFormdateNTimeInputSection">
                        <div className="EventFormInputBorder">
                            <input className="EventFormSectionInput" readOnly placeholder="Date" onClick={showCalendar} value={form.date} />
                            <FiCalendar color="#b3b3b3" />
                        </div>
                    </div>
                    <div className="EventFormCalendarForm" ref={calendarFormRef}>
                        <EventCalendar onClickDay={(value, event) => setDate(value, event)} />
                    </div>
                </div>
            </form>
            <div className="EventFormActionsSection">
                <button className="EventFormButtonClose" onClick={closeDialog}>
                    <GrClose />
                </button>
                <button className="EventFormButtonCreate" onClick={event.title ? (ev) => UpdateEvent(ev) : (ev) => CreateEvent(ev)} disabled={buttonDisabled}>
                    {event.title ? "Update event" : "Create event"}
                </button>
            </div>
        </div>
    );
};

export default EventForm;