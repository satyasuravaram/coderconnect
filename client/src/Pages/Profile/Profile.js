import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { Button } from "react-bootstrap";
import "./Profile.css";
import Axios from "axios";
import DefaultImg from "../About/images/default-profile-pic.png";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
    tutor: false,
    image: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("auth-token");

        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        setProfileData({
          firstName: userRes.data.firstName,
          lastName: userRes.data.lastName,
          email: userRes.data.email,
          bio: userRes.data.bio,
          skills: userRes.data.skills,
          tutor: userRes.data.tutor,
          image: userRes.data.image,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return (
    <div className="p-whole">
      <div className="p-both-container">
        <div className="p-top-container">
          <div className="tutor-card-img-container">
            <img
              className="tutor-card-img"
              src={
                profileData.image
                  ? `data:image;base64,${profileData.image}`
                  : DefaultImg
              }
              alt={`${profileData.firstName}-img`}
            />
          </div>
          <h2 className="p-full-name">
            {profileData.firstName} {profileData.lastName}
          </h2>
          <Button
            className="edit-btn"
            variant="outline-primary"
            href="/app/profile/edit"
            size="sm"
          >
            Edit Profile
          </Button>
        </div>
        <div className="p-bottom-container">
          <ListGroup flush>
            {profileData.tutor && (
              <ListGroupItem>
                <ListGroupItemHeading>Bio</ListGroupItemHeading>
                <ListGroupItemText>{profileData.bio}</ListGroupItemText>
              </ListGroupItem>
            )}

            <ListGroupItem>
              <ListGroupItemHeading>Email</ListGroupItemHeading>
              <ListGroupItemText>{profileData.email}</ListGroupItemText>
            </ListGroupItem>

            {profileData.tutor && (
              <ListGroupItem>
                <ListGroupItemHeading>Skills</ListGroupItemHeading>
                <div className="listgroup-skills">
                  {profileData.skills.map((skill, index) => (
                    <div className="listgroup-skill">{skill}</div>
                  ))}
                </div>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
