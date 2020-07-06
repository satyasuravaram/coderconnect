import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import Axios from "axios";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
    tutor: false,
  });

  const getUser = async () => {
    try {
      const token = localStorage.getItem("auth-token");

      const userRes = await Axios.get("http://localhost:5000/users/", {
        headers: { "x-auth-token": token },
      });

      setProfileData({
        firstName: userRes.data.firstName,
        lastName: userRes.data.lastName,
        email: userRes.data.email,
        bio: userRes.data.bio,
        skills: userRes.data.skills,
        tutor: userRes.data.tutor,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getUser();

  return (
    <div>
      <h2>
        {profileData.firstName} {profileData.lastName + "'s"} Profile
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

        {profileData.tutor && (
          <ListGroupItem>
            <ListGroupItemHeading>Bio</ListGroupItemHeading>
            <ListGroupItemText>{profileData.bio}</ListGroupItemText>
          </ListGroupItem>
        )}

        {profileData.tutor && (           
        <ListGroupItem>
            <ListGroupItemHeading>Skills</ListGroupItemHeading>
            <ListGroup horizontal = "lg">
                    {profileData.skills.map((skill, index) => (<ListGroupItem>{skill}</ListGroupItem>))}
            </ListGroup>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}
