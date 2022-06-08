import React from "react";

import DeleteEventDialog from "../components/DeleteEventDialog";
import EditEventDialog from "../components/EditEventDialog";
import './DayEventView.css';

const DayEventView = ({ dayEvent }) => {

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
                        <EditEventDialog currentEvent={dayEvent} />
                    </div>
                    <div className="DayEventViewEventButtons">
                        <DeleteEventDialog eventId={dayEvent.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayEventView;