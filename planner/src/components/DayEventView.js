import React from "react";

import DeleteEventDialog from "../components/DeleteEventDialog";
// import EditEventDialog from "../Components/EditEventDialog";
import './DayEventView.css';

const DayEventView = ({ dayEvent, refreshEvents }) => {

    return (
        <div className="DayEventViewBox">
            <div className="DayEventViewRightBox">
                <div className="DayEventViewEventContentBox">
                    <div className="DayEventViewnameNdesc">
                        <div className="DayEventViewEventTitle">{dayEvent.title}</div>
                        {dayEvent.description ? (
                            <div className="DayEventViewEventDescr">{dayEvent.description}</div>
                        ) : null}
                    </div>
                </div>
                <div className="DayEventViewEventButtonBox">
                    <div className="DayEventViewEventButtons">
                        {/* <EditEventDialog
                                                    currentEvent={dayEvent}
                                                    refreshEvents={getDayEventsAfterDeleteAdd}
                                                /> */}
                    </div>
                    <div className="DayEventViewEventButtons">
                        <DeleteEventDialog eventId={dayEvent.id} refreshEvents={refreshEvents} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayEventView;