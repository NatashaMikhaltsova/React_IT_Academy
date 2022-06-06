import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import isoFetch from 'isomorphic-fetch';

import { calendarEvents, ESetDateForEvent } from '../eventEmitter';
import NewEventCalendar from "./NewEventCalendar";
import './NewEventForm.css';

const EditEventForm = ({ closeDialog, refreshEvents, currentEvent }) => {
    const [form, setForm] = useState(currentEvent);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (form.title && form.date) setButtonDisabled(false);
        let setDate = (date) => {
            document.getElementById("CalendarForm").style.visibility = "hidden";
            setDisplayDate(date);
            setForm({ ...form, date: date });
        };
        calendarEvents.addListener(ESetDateForEvent, setDate);

        return () => {
            calendarEvents.removeListener(ESetDateForEvent, setDate)
        }
    }, [form]);

    useEffect(() => {
        let date = new Date(currentEvent.date);
        let formatted = format(date, "EEE. MMM. d, y");
        setDisplayDate(formatted);
    }, []);

    const handleTitle = (value) => setForm({ ...form, title: value });
    const handleDescription = (value) => setForm({ ...form, description: value });


    const UpdateEvent = (event) => {
        event.preventDefault();

        const getLastElementID = async () => {
            const response = await isoFetch("http://localhost:3005/events");
            // convert the data to json
            let data = await response.json();
            return data[data.length - 1].id;
        }

        const fetchData = async () => {
            const lastElementID = (await getLastElementID());
            await isoFetch(`http://localhost:3005/events/${currentEvent.id}`, {
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

    /******************************* */
    /** Select date input field */
    /******************************* */

    const [date, setDisplayDate] = useState("");

    const showCalendar = () => {
        document.getElementById("CalendarForm").style.visibility = "visible";
    };

    /******************************* */
    /**CALENDAR STATES AND FUNCTIONS */
    /******************************* */
    const [CalendarDate, setCalendarDate] = useState(new Date());

    const onCalendarChange = (nextValue) => setCalendarDate(nextValue);

    const selectDate = (value) => {
        setForm({ ...form, date: value });
        setCalendarDate(value);
    };

    return (
        <div>
            <form>
                <div className="NewEventFormTop">
                    <input className="NewEventFormTitle" type="text" placeholder="Event title" value={form.title} onChange={(ev) => handleTitle(ev.target.value)} />
                    <input className="NewEventFormDescription" type="text" placeholder="What will happen?" value={form.description} onChange={(ev) => handleDescription(ev.target.value)} />
                </div>
                <div className="NewEventFormSection">
                    <label className="NewEventFormLabel">Date</label>
                    <div className="NewEventFormdateNTimeInputSection">
                        <div className="NewEventFormInputBorder">
                            <input className="NewEventFormSectionInput" readOnly placeholder="Date" onClick={showCalendar} value={form.date} />
                            <FiCalendar color="#b3b3b3" />
                        </div>
                    </div>
                    <div className="NewEventFormCalendarForm" id="CalendarForm">
                        <NewEventCalendar
                            onChange={onCalendarChange}
                            value={CalendarDate}
                            onClickDay={(value, event) => selectDate(value, event)}
                        />
                    </div>
                </div>
            </form>
            <div className="NewEventFormActionsSection">
                <button className="NewEventFormButtonClose" onClick={closeDialog}>
                    <GrClose />
                </button>
                <button className="NewEventFormButtonCreate" onClick={(ev) => UpdateEvent(ev)} disabled={buttonDisabled}>
                    {"Update event"}
                </button>
            </div>
        </div>
    );
};

export default EditEventForm;