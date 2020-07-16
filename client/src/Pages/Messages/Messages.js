import React, { useEffect, useState, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import "./Messages.css";
import { useHistory } from "react-router-dom";

export default function Messages() {
  const { userData, setUserData } = useContext(UserContext);
  const [connections, setConnections] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [conversation, setConversation] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const loadConnections = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });

        const loadRes = await Axios.post(
          "http://localhost:5000/messages/loadAllConnections",
          {
            userID: userRes.data._id,
          }
        );

        console.log(loadRes.data);
        for (let i = 0; i < loadRes.data.length; i++) {
            setFirstName((oldFirst) => [
              ...oldFirst,
              loadRes.data[i].first,
            ]);
            setLastName((oldLast) => [
              ...oldLast,
              loadRes.data[i].last,
            ]);
            setConversation((oldConv) => [...oldConv, loadRes.data[i].conversation]);
          }

      }

    };

    loadConnections();
  }, []);

  return (
    <div>
      <h2>My Messages</h2>
      <ListGroup>
      {firstName.map((first, index) => (
        <ListGroupItem onClick={()=>{history.push(`/app/messages/${conversation[index]}`)}} className="connection-item">
          <ListGroupItemHeading>{first} {lastName[index]}</ListGroupItemHeading>
          <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
      ))}
      </ListGroup>
    </div>
  );
}
