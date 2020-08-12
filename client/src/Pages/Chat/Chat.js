import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import VideoChat from "./Video/VideoChat";
import Axios from "axios";
import "./Chat.css";
import {
  makeToast,
  endSessionToast,
  feedbackToast,
} from "../../components/misc/Toaster";
import { socket } from "../../context/Socket";
import CreateSession from "./CreateSession/CreateSession";
import Whiteboard from "./Whiteboard/Whiteboard";
import CodeEditor from "./CodeEditor/CodeEditor";

export default function Chat() {
  const [userID, setUserID] = useState("");
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [isTutor, setIsTutor] = useState();
  const [sessionType, setSessionType] = useState("Video");
  const [messages, setMessages] = useState([]);
  const { connectid } = useParams();
  const videoRef = useRef();
  const whiteboardRef = useRef();
  const [leaveStatus, setLeaveStatus] = useState(false);

  useEffect(() => {
    let currentUserID;
    let currentUserIsTutor;
    let otherUserCurrID;
    const getUser = async () => {
      const token = localStorage.getItem("auth-token");
      const userRes = await Axios.get("/users/", {
        headers: { "x-auth-token": token },
      });
      setUserID(userRes.data._id);
      setIsTutor(userRes.data.tutor);
      currentUserID = userRes.data._id;
      currentUserIsTutor = userRes.data.tutor;
    };
    getUser();
    socket.emit("join", { connectid }, () => {});

    socket.on("otherUserID", (otherUserID) => {
      if (otherUserID !== currentUserID) {
        otherUserCurrID = otherUserID;
      }
    });

    socket.on("endSession", (data) => {
      setSessionInProgress(false);
      makeToast("success", "Session has been ended.");
      console.log("Other user ID", otherUserCurrID);
      if (!currentUserIsTutor) {
        setTimeout(() => {
          feedbackToast(connectid, otherUserCurrID);
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    const loadConversation = async () => {
      try {
        const loadRes = await Axios.get(`/messages/${connectid}`);
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
    endSessionToast(connectid, isTutor);
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

  return (
    <div
      className={
        sessionInProgress ? "chat-session-wrapper" : "chat-no-session-wrapper"
      }
    >
      <div className="outer-chat-container">
        {sessionInProgress && (
          <div className="call-options">
            <Button id="btn-code" color="primary" href="#code-playground">
              Code Editor
            </Button>
            <Button id="btn-whiteboard" href="#whiteboard">
              Whiteboard
            </Button>
            <Button
              id="btn-leave"
              color="danger"
              onClick={(e) => handleLeave(e)}
            >
              End Session
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
              <CreateSession
                room={connectid}
                userID={userID}
                setSessionInProgress={setSessionInProgress}
              />
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
            <h2 id="code-playground">Code Editor</h2>
            <CodeEditor room={connectid} />
            <h2 id="whiteboard">Whiteboard</h2>
            <Whiteboard />
          </>
        )}
      </div>
    </div>
  );
}
