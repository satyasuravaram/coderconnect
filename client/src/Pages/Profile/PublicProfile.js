import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./PublicProfile.css";
import createConnection from "../../actions/CreateConnection";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { Button } from "react-bootstrap";

export default function PublicProfile() {
  const { userid } = useParams();
  const { userData, setUserData } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
  });
  const history = useHistory();

  useEffect(() => {
    const getTutor = async () => {
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

      setUserData({
        token: token,
        user: userRes.data,
      });

      if (tokenRes.data) {
        const tutor = await Axios.get(`http://localhost:5000/users/${userid}`, {
          headers: { "x-auth-token": token },
        });
        setProfileData({
          firstName: tutor.data.firstName,
          lastName: tutor.data.lastName,
          email: tutor.data.email,
          bio: tutor.data.bio,
          skills: tutor.data.skills,
          id: tutor.data._id
        });
      }
    };}
    getTutor();
  }, []);

  return (
    <div>
      <h2 className="full-name">
        {profileData.firstName} {profileData.lastName + "'s"} Profile
        <span>
          <Button
            className="edit-btn"
            variant="primary"
            size="md"
            onClick={() =>
              createConnection(profileData.id, userData.user._id, history)
            }
          >
            Connect
          </Button>
          <Button
            className="edit-btn-2"
            variant="outline-secondary"
            href="/app/dashboard"
            size="md"
          >
            Back to dashboard
          </Button>
        </span>
      </h2>
      <ListGroup>
        <ListGroupItem>
          <ListGroupItemHeading>Name</ListGroupItemHeading>
          <ListGroupItemText>
            {profileData.firstName} {profileData.lastName}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Email</ListGroupItemHeading>
          <ListGroupItemText>{profileData.email}</ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading>Bio</ListGroupItemHeading>
          <ListGroupItemText>{profileData.bio}</ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading>Skills</ListGroupItemHeading>
          <ListGroup horizontal="lg">
            {profileData.skills.map((skill, index) => (
              <ListGroupItem>{skill}</ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
