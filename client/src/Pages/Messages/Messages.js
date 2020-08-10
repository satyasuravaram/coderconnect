import React, { useEffect, useState, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
} from "reactstrap";
import Axios from "axios";
import "./Messages.css";
import { useHistory } from "react-router-dom";
import DefaultImg from "../About/images/default-profile-pic.png";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";
import ScrollToBottom from "react-scroll-to-bottom";
import Messages from "../Chat/Messages/Messages";
import Message from "../Chat/Message/Message";
import Input from "../Chat/Input/Input";
import { socket } from "../../context/Socket";

export default function MessagesPage() {
  const [connections, setConnections] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currConnection, setCurrConnection] = useState();
  const [currConnectionName, setCurrConnectionName] = useState();
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const loadConnections = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("/users/isTokenValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        const loadRes = await Axios.post("/messages/loadAllConnections", {
          userID: userRes.data._id,
        });
        setUserID(userRes.data._id);
        setCurrConnection(loadRes.data[0].conversation);
        setCurrConnectionName(
          `${loadRes.data[0].first} ${loadRes.data[0].last}`
        );
        loadConversation(
          loadRes.data[0].conversation,
          loadRes.data[0].first,
          loadRes.data[0].last
        );
        for (let i = 0; i < loadRes.data.length; i++) {
          console.log(loadRes.data[i].image);
          setConnections((prevConnections) => [
            ...prevConnections,
            {
              firstName: loadRes.data[i].first,
              lastName: loadRes.data[i].last,
              image: loadRes.data[i].image,
              conversation: loadRes.data[i].conversation,
              lastMessage: loadRes.data[i].lastMessage.data,
            },
          ]);
        }
      }
      setLoading(false);
    };
    loadConnections();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      const msgBody = message.message;
      setMessages([...messages, msgBody]);
    });
  }, [messages]);

  const override = css`
    display: block;
    margin: auto auto;
    border-color: red;
    margin-top: 10%;
  `;

  const loadConversation = async (connectid, firstName, lastName) => {
    try {
      setCurrConnectionName(`${firstName} ${lastName}`);
      socket.emit("join", { connectid }, () => {});
      setMessages([]);
      setCurrConnection(connectid);
      const loadRes = await Axios.get(`/messages/${connectid}`);
      const existingMessages = loadRes.data;
      for (let i = 0; i < existingMessages.length; i++) {
        setMessages((oldMessages) => [...oldMessages, existingMessages[i]]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messages-page-outer-container">
      {loading ? (
        <div className="load-anim">
          <ClipLoader
            css={override}
            size={150}
            color={"navy"}
            loading={loading}
          />
        </div>
      ) : (
        <div className="chat-wrapper">
          <div className="current-connections">
            <ListGroup className="chat-list-group">
              {connections.map((connection, index) => (
                <div
                  className="message-connection"
                  onClick={() => {
                    loadConversation(
                      connection.conversation,
                      connection.firstName,
                      connection.lastName
                    );
                  }}
                >
                  <div className="tutor-card-img-container-messages img-messages">
                    <img
                      className="tutor-card-img mr-neg"
                      src={
                        Object.keys(connection.image).length !== 0
                          ? `data:image;base64,${Buffer.from(
                              connection.image.buffer.data
                            ).toString("base64")}`
                          : DefaultImg
                      }
                      alt={`${connection.firstName}-img-public`}
                    />
                  </div>
                  <div key={index} className="connection-item">
                    <ListGroupItemHeading>
                      {connection.firstName} {connection.lastName}
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      {connection.lastMessage}
                    </ListGroupItemText>
                  </div>
                </div>
              ))}
            </ListGroup>
          </div>
          <div className="current-chat-open">
            <div className="chat-box-header">
              {currConnectionName}
              <Button
                onClick={() => {
                  history.push(`/app/messages/${currConnection}`);
                }}
                color="success"
                className="success"
              >
                Enter Session Room
              </Button>
            </div>
            <div className="messages-chat-box">
              {messages.map((message, i) => (
                <Message message={message} userID={userID} />
              ))}
            </div>
              <Input className="input-box" room={currConnection} userID={userID} />
          </div>
        </div>
      )}
    </div>
  );
}
