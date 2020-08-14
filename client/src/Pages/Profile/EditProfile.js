import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Input, FormGroup, CustomInput, Label, Button } from "reactstrap";
import Axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import skillsArray from "../../components/SkillsArray";
import "./EditProfile.css";
import SkillsDropdown from "./SkillsDropdown";
import DefaultImg from "../About/images/default-profile-pic.png";

export default function EditProfile() {
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
    tutor: false,
    image: "",
  });
  const [existingSkills, setExistingSkills] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();
  const [image, setImage] = useState("");
  const [profilePic, setProfilePic] = useState(DefaultImg);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("auth-token");

        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        for (let i = 0; i < userRes.data.skills.length; i++) {
          setExistingSkills((prevSkills) => [
            ...prevSkills,
            { value: userRes.data.skills[i], label: userRes.data.skills[i] },
          ]);
        }

        if (userRes.data.image) setProfilePic(userRes.data.image);
        setProfileData({
          id: userRes.data._id,
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

  const [newProfileData, setNewProfileData] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    bio: undefined,
    skills: undefined,
    image: undefined,
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
      const data = new FormData();
      for (let i = 0; i < existingSkills.length; i++) {
        newSkillsArr.push(existingSkills[i].value);
        data.append("skills", existingSkills[i].value);
      }
      let token = localStorage.getItem("auth-token");

      data.append("image", image);
      data.append("firstName", newProfileData.firstName);
      data.append("lastName", newProfileData.lastName);
      data.append("prevEmail", profileData.email);
      data.append("email", newProfileData.email);
      data.append("bio", newProfileData.bio);
      const editRes = await Axios.post(
        "/users/edit",
        data,
        { headers: { "x-auth-token": token } }
      );

      if (editRes.data) {
        history.push("/app/profile");
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState) {
        setProfilePic(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="ep-whole-container">
      <div className="ep-both-container">
        <h2 className="ep-header">Edit Profile</h2>
        {error && <ErrorNotice message={error} />}
        <Form onSubmit={editProfile} className="ep-form-container">
          <Row>
            <Col>
              <Label for="bio">Profile Picture</Label>
              <br />
              <CustomInput type="file" id="exampleCustomFileBrowser" name="image" onChange={imageHandler} />
              <div className="ep-top-container">
                <div className="tutor-card-img-container">
                  <img
                    className="tutor-card-img"
                    src={
                      !profilePic.startsWith("data")
                        ? `data:image;base64,${profileData.image}`
                        : profilePic
                    }
                    alt="profile-picture"
                  />
                </div>
              </div>
            </Col>
          </Row>

        <Row form>
          <Col>
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
          <Col>
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
          <Col>
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
            <Col>
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
            <Col>
              <Label>Skills</Label>

              <SkillsDropdown
                options={skillsArray}
                existingSkills={existingSkills}
                setExistingSkills={setExistingSkills}
              />
            </Col>
          </Row>
        )}

        <Button className="ep-button" type="submit">Save Changes</Button>
        </Form>
    </div>
    </div >
  );
}
