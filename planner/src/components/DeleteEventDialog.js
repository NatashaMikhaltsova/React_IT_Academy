import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { RiDeleteBinLine } from "react-icons/ri";
import { eventHandler, ERefreshDayEvents } from "../eventEmitter";
import './DeleteEventDialog.css';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteEventDialog({ eventId }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		const fetchData = async () => {
			await fetch(`http://localhost:3005/events/${eventId}`, {
				method: "DELETE",
			})
		};
		// call the function
		fetchData()
			// make sure to catch any error
			.catch((error) => {
				console.log("error!", error);
			}).then(() => eventHandler.emit(ERefreshDayEvents));
		handleClose();
	};

	return (
		<div>
			<button className="DeleteEventDialogDeleteButton" style={{ cursor: "pointer" }} onClick={handleClickOpen}>
				<RiDeleteBinLine />
			</button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">Remove event</DialogTitle>
				<DialogContent>
					Are you sure you want to remove this event?
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDelete} color="primary">
						YES
					</Button>
					<Button
						onClick={() => handleClose()}
						color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}