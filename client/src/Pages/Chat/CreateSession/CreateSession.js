import React from "react";
import "./CreateSession.css";
import { Button } from "reactstrap";

const CreateSession = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
        props.setSessionInProgress(true);
    }

	return (
		<div className="create-session-container">
			<div className="create-session">
				<h2>Join Session</h2>
				<Button color="success" onClick={(e) => handleClick(e)}>Join Room</Button>
			</div>
		</div>
	);
};

export default CreateSession;
