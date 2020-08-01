import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import VideoChat from "./Video/VideoChat";
import Axios from "axios";
import "./Chat.css";

import { socket } from "../../context/Socket";
import CreateSession from "./CreateSession/CreateSession";
import Whiteboard from "./Whiteboard/Whiteboard";
import CodeEditor from "./CodeEditor/CodeEditor";

export default function Chat() {
  const [userID, setUserID] = useState("");
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [sessionType, setSessionType] = useState("Video");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const { connectid } = useParams();
  const videoRef = useRef();
  const whiteboardRef = useRef();
  const [leaveStatus, setLeaveStatus] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("auth-token");
      const userRes = await Axios.get("http://localhost:5000/users/", {
        headers: { "x-auth-token": token },
      });
      setUserID(userRes.data._id);
    };
    getUser();
  }, []);

  useEffect(() => {
    socket.emit("join", { connectid }, () => {});
  }, []);

  useEffect(() => {
    const loadConversation = async () => {
      try {
        const loadRes = await Axios.get(
          `http://localhost:5000/messages/${connectid}`
        );
        const existingMessages = loadRes.data;
        for (let i = 0; i < existingMessages.length; i++) {
          setMessages((oldMessages) => [...oldMessages, existingMessages[i]]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadConversation();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      const msgBody = message.message;
      setMessages([...messages, msgBody]);
    });
  }, [messages]);

  const handleLeave = (e) => {
    e.preventDefault();
    console.log(videoRef.current);
    setSessionInProgress(false);
  };

  let sessionMedia;
  if (sessionType === "Video") {
    sessionMedia = (
      <VideoChat
        ref={videoRef}
        room={connectid}
        userID={userID}
        leaveStatus={leaveStatus}
      />
    );
  } else if (sessionType === "Whiteboard") {
    sessionMedia = <Whiteboard ref={whiteboardRef} />;
  }

  const handleScreenSwitch = (type) => {
    console.log(videoRef.current);
    console.log(whiteboardRef.current);
  };

  return (
    <div className="outer-chat-container">
      {sessionInProgress && (
        <div className="call-options">
          <Button id="btn-code" color="primary" href="#code-playground">
            Code Playground
          </Button>
          <Button id="btn-whiteboard" href="#whiteboard">
            Whiteboard
          </Button>
          <Button id="btn-leave" color="danger" onClick={(e) => handleLeave(e)}>
            Leave Room
          </Button>
        </div>
      )}
      <div className="chat-container">
        <div className="messages-container">
          <Messages messages={messages} userID={userID} />
          <Input room={connectid} userID={userID} />
        </div>
        <div className="session-container">
          {!sessionInProgress ? (
            <CreateSession setSessionInProgress={setSessionInProgress} />
          ) : (
            <VideoChat
              ref={videoRef}
              room={connectid}
              userID={userID}
              leaveStatus={leaveStatus}
            />
          )}
        </div>
      </div>
      {sessionInProgress && (
        <>
          <h2 id="code-playground">Code Playground</h2>
          <CodeEditor room={connectid} />
          <h2 id="whiteboard">Whiteboard</h2>
          <Whiteboard />
        </>
      )}
    </div>
  );
}

{
  /* <VideoChat room={connectid} userID={userID} /> */
}

{
  /* <div className="outerContainer">
      <div className="innerContainer">
        <Messages messages={messages} userID={userID} />
        <Input room={connectid} userID={userID} />
      </div>
      <div >
        <VideoChat room={connectid} userID={userID}/>
      </div>
    </div> */
}
