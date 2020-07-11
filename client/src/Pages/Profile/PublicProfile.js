import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
  } from "reactstrap";
  import { Button } from "react-bootstrap";


export default function PublicProfile() {
  const { userid } = useParams();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
  });

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
        const tutor = await Axios.get(`http://localhost:5000/users/${userid}`, {
          headers: { "x-auth-token": token },
        });
        setProfileData({
          firstName: tutor.data.firstName,
          lastName: tutor.data.lastName,
          email: tutor.data.email,
          bio: tutor.data.bio,
          skills: tutor.data.skills,
        });
      }
    };
    getTutor();
  }, []);

  return (
    <div>
      <h2 style={{marginLeft: '2rem'}}>
        {profileData.firstName} {profileData.lastName + "'s"} Profile
        <span>
          <Button
            className="edit-btn"
            variant="primary"
            href="/app/profile/edit"
            size="md"
          >
            Connect
          </Button>
          <Button style={{marginLeft: '0rem'}}
            className="edit-btn"
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
