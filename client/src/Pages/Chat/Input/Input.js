import React, { useState } from "react";
import io from "socket.io-client";
import "./Input.css";
import sendMessage from "../../../actions/SendMessage";
import {socket} from "../../../context/Socket";

const Input = (props) => {
  const [data, setData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    const dateString = date.toGMTString();
    if (data.length !== 0) {
      const message = {
        data: data,
        sender: props.userID,
        readBy: [props.userID],
        createdDate: dateString
      }
      socket.emit("sendMessage", {
        message: message,
        room: props.room
      });
      sendMessage(props.room, message);
  
      setData("")
      document.querySelector(".input").value = "";
    }
    
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button type="submit" className="sendButton" >
        Send
      </button>
    </form>
  );
};

export default Input;
