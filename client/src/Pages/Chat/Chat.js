import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import UserContext from "../../context/UserContext";
import VideoChat from "./Video/VideoChat";
import { Col, Row, Container } from "reactstrap";
import Axios from "axios";
import "./Chat.css";

import { socket } from "../../context/Socket";

export default function Chat() {
  const [userID, setUserID] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const { connectid } = useParams();
  const { userData } = useContext(UserContext);

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
          `http://localhost:5000/messages/${connectid}`,
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
  }, [])

  useEffect(() => {
    socket.on("newMessage", (message) => {
      const msgBody = message.message;
      setMessages([...messages, msgBody]);
    });
  }, [messages]);

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <Messages messages={messages} userID={userID} />
        <Input room={connectid} userID={userID} />
      </div>
      <div >
        <VideoChat room={connectid} userID={userID}/>
      </div>
    </div>
  );
}
