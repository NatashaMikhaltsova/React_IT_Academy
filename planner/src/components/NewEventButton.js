import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import NewEventForm from "./NewEventForm";
import './NewEventButton.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewEventButton({ refreshEvents }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="NewEventIcon" onClick={handleClickOpen}>+</button>
            <Dialog
                fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <NewEventForm closeDialog={handleClose} refreshEvents={refreshEvents} />
            </Dialog>
        </div>
    );
}
