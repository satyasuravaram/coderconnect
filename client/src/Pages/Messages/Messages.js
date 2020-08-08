import React, { useEffect, useState, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import Axios from "axios";
import "./Messages.css";
import { useHistory } from "react-router-dom";
import DefaultImg from "../About/images/default-profile-pic.png";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";

export default function Messages() {
  const [connections, setConnections] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConnections = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/users/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        const loadRes = await Axios.post(
          "/messages/loadAllConnections",
          {
            userID: userRes.data._id,
          }
        );

        console.log(loadRes.data);
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

  const override = css`
    display: block;
    margin: auto auto;
    border-color: red;
    margin-top: 10%;
  `;

  return (
    <div>
      <h2>My Messages</h2>



      <div className="load-anim">
        <ClipLoader
          css={override}
          size={150}
          color={"navy"}
          loading={loading}
        />
      </div>

      <ListGroup>
        {connections.map((connection, index) => (
          <div
            className="message-connection"
            onClick={() => {
              history.push(`/app/messages/${connection.conversation}`);
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
              <ListGroupItemText>{connection.lastMessage}</ListGroupItemText>
            </div>
          </div>
        ))}
      </ListGroup>
    </div>
  );
}
