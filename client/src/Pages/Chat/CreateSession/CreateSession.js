import React, { useEffect, useState } from "react";
import "./CreateSession.css";
import { Button } from "reactstrap";
import { socket } from "../../../context/Socket";

const CreateSession = (props) => {
  const [myStatus, setMyStatus] = useState(false);
  const [otherUserStatus, setOtherUserStatus] = useState(false);

  useEffect(() => {
    socket.on("statusReady", (data) => {
      console.log("status ready");
      setOtherUserStatus(true);
      socket.emit("setOtherUser", {room: data.room, otherUserID: data.otherUserID})
      // console.log("other userid: ", otherUserID);
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setMyStatus(true);
    socket.emit("statusReady", { room: props.room, otherUserID: props.userID });
  };

  if (myStatus && otherUserStatus) {
    props.setSessionInProgress(true);
  }

  return (
    <div className="create-session-container">
      <div className="create-session">
        <h2>Start New Tutoring Session</h2>
        <Button color="success" onClick={(e) => handleClick(e)}>
          I'm Ready
        </Button>
        {!myStatus && otherUserStatus ? <p>Other user is ready. Click "I'm Ready" to start the session.</p> : null}
        {myStatus && !otherUserStatus ? <p>Waiting for other user...</p> : null}
      </div>
    </div>
  );
};

export default CreateSession;
