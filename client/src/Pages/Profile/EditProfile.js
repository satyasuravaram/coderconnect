import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Input, FormGroup, Label, Button } from "reactstrap";
import Axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import Select from "react-select";
import skillsArray from "../../components/SkillsArray";
import "./EditProfile.css";
import { CardGroup } from "react-bootstrap";
import SkillsDropdown from "./SkillsDropdown"

export default function Profile() {
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
    tutor: false,
  });
  const [existingSkills, setExistingSkills] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("auth-token");

        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });

        for (let i = 0; i < userRes.data.skills.length; i++) {
          setExistingSkills((prevSkills) => [
            ...prevSkills,
            { value: userRes.data.skills[i], label: userRes.data.skills[i] },
          ]);
        }

        setProfileData({
          id: userRes.data._id,
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
  }, []);

  const [newProfileData, setNewProfileData] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    bio: undefined,
    skills: undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProfileData((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const editProfile = async (e) => {
    e.preventDefault();

    try {
      const newSkillsArr = [];
      for (let i = 0; i < existingSkills.length; i++) {
        newSkillsArr.push(existingSkills[i].value)
      }
      let token = localStorage.getItem("auth-token");
      const editRes = await Axios.post(
        "http://localhost:5000/users/edit",
        {
          firstName: newProfileData.firstName,
          lastName: newProfileData.lastName,
          prevEmail: profileData.email,
          email: newProfileData.email,
          bio: newProfileData.bio,
          skills: newSkillsArr,
        },
        { headers: { "x-auth-token": token } }
      );

      if (editRes.data) {
        history.push("/app/profile");
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="editContainer">
      <h2>Edit Profile</h2>
      {error && <ErrorNotice message={error} />}
      <Form onSubmit={editProfile}>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={profileData.firstName}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={profileData.lastName}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={profileData.email}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>

        {profileData.tutor && (
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input
                  type="textarea"
                  name="bio"
                  id="bio"
                  defaultValue={profileData.bio}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        )}

        {profileData.tutor && (
          <Row form>
            <Col md={6}>
              <SkillsDropdown options={skillsArray} existingSkills={existingSkills} setExistingSkills={setExistingSkills}/>
            </Col>
          </Row>
        )}
        <Button type="submit">Save Changes</Button>
      </Form>
    </div>
  );
}
