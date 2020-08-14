import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./PublicProfile.css";
import createConnection from "../../actions/CreateConnection";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import DefaultImg from "../About/images/default-profile-pic.png";

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
  const [loggedInID, setLoggedInID] = useState();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
    image: "",
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
        "/users/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        setLoggedInID(userRes.data._id);
        setUserData({
          token: token,
          user: userRes.data,
        });

        if (tokenRes.data) {
          const tutor = await Axios.get(
            `/users/${userid}`,
            {
              headers: { "x-auth-token": token },
            }
          );
          setProfileData({
            firstName: tutor.data.firstName,
            lastName: tutor.data.lastName,
            email: tutor.data.email,
            bio: tutor.data.bio,
            skills: tutor.data.skills,
            id: tutor.data._id,
            image: tutor.data.image,
          });
        }
      }
    };
    getTutor();
  }, []);

  return (
    <div className="pp-whole">
      <div className="pp-both-container">
        <div className="pp-top-container">
          <div className="tutor-card-img-container">
            <img
              className="tutor-card-img"
              src={
                profileData.image
                  ? `data:image;base64,${profileData.image}`
                  : DefaultImg
              }
              alt={`${profileData.firstName}-img-public`}
            />
          </div>
          <h2 className="pp-full-name">
            {profileData.firstName} {profileData.lastName}
          </h2>
          <span>
            {profileData.id !== loggedInID && (
              <Button
                className="edit-btn"
                variant="success"
                size="md"
                onClick={() =>
                  createConnection(profileData.id, userData.user._id, history)
                }
              >
                Connect
              </Button>
            )}
            <Button
              className="edit-btn-2"
              variant="primary"
              href="/app/dashboard"
              size="md"
            >
              Back to dashboard
          </Button>
          </span>
        </div>
        <div className="pp-bottom-container">
          <ListGroup flush>
            <ListGroupItem>
              <ListGroupItemHeading>Bio</ListGroupItemHeading>
              <ListGroupItemText>{profileData.bio}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Email</ListGroupItemHeading>
              <ListGroupItemText>{profileData.email}</ListGroupItemText>
            </ListGroupItem>


            <ListGroupItem>
              <ListGroupItemHeading>Skills</ListGroupItemHeading>
              <div className="listgroup-skills">
                {profileData.skills.map((skill, index) => (
                  <div className="listgroup-skill">{skill}</div>
                ))}
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
