import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { BiEditAlt } from "react-icons/bi";

import EventForm from "./EventForm";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditEventDialog({ currentEvent, refreshEvents }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ cursor: "pointer" }}>
            <BiEditAlt onClick={handleClickOpen} />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <EventForm event={currentEvent} closeDialog={handleClose} refreshEvents={refreshEvents} />
            </Dialog>
        </div>
    );
}