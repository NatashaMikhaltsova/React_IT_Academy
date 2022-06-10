import React from "react";
import isEqual from "react-fast-compare";

import DeleteEventDialog from "../components/DeleteEventDialog";
import EditEventDialog from "../components/EditEventDialog";
import './DayEventView.css';

const DayEventView = React.memo(({ dayEvent }) => {
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
}, isEqual);

export default DayEventView;