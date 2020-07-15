import React from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Chat() {
  const { connectid } = useParams();

  return (
    <div>
      <div className="container" style={{ marginTop: "2%" }}>
        <div className="row">
          <div className="column" style={{ border: "solid black" }}>
            <div className="messages-container">Messages map goes here</div>
            <form id="send-container">
              <input type="text" id="message-input"></input>
              <Button type="submit" id="send-btn">
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
