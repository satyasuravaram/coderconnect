import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";

import "./Chat.css";

let socket;

export default function Chat({ location }) {
  const [userID, setUserID] = useState("");
  const [conversationID, setConversationID] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const { connectid } = useParams();

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <Messages />
        <Input />
      </div>
    </div>
  );
}
