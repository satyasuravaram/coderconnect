import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import createConnection from "../../actions/CreateConnection";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import skillsArray from "../../components/SkillsArray";
import "./Dashboard.css";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [searchSkill, setSearchSkill] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const [tutorsBio, setTutorsBio] = useState([]);
  const [tutorsFirstName, setTutorsFirstName] = useState([]);
  const [tutorsLastName, setTutorsLastName] = useState([]);
  const [tutorsSkills, setTutorsSkills] = useState([]);
  const [tutorsID, setTutorsID] = useState([]);
  const [tutorsHaveCurrentSkill, setTutorsHaveCurrentSkill] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  useEffect(() => {
    console.log("yolo");
    const getTutors = async () => {
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

        const tutorArr = await Axios.get("http://localhost:5000/users/tutors", {
          headers: { "x-auth-token": token },
        });
        for (let i = 0; i < tutorArr.data.length; i++) {
          setTutorsSkills((prevSkills) => [
            ...prevSkills,
            tutorArr.data[i].skills,
          ]);
          setTutorsBio((oldTutors) => [...oldTutors, tutorArr.data[i].bio]);
          setTutorsFirstName((oldTutors) => [
            ...oldTutors,
            tutorArr.data[i].firstName,
          ]);
          setTutorsLastName((oldTutors) => [
            ...oldTutors,
            tutorArr.data[i].lastName,
          ]);
          setTutorsID((oldTutors) => [...oldTutors, tutorArr.data[i]._id]);
          setTutorsHaveCurrentSkill((prevSkill) => [...prevSkill, true]);
        }
      }
    };
    getTutors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchSkill !== null && Object.keys(searchSkill).length !== 0) {
      const skill = searchSkill.value;
      let hasSkillArr = [];
      for (let i = 0; i < tutorsSkills.length; i++) {
        const hasSkill = tutorsSkills[i].includes(skill);
        hasSkillArr.push(hasSkill);
      }
      setTutorsHaveCurrentSkill(hasSkillArr);
      console.log(hasSkillArr);
    } else {
      let hasSkillArr = [];
      for (let i = 0; i < tutorsSkills.length; i++) {
        hasSkillArr.push(true);
      }
      setTutorsHaveCurrentSkill(hasSkillArr);
    }
  };

  return (
    <div style={{ marginLeft: "0px", backgroundColor: "#dbe2ef" }}>
      <div className="search-container">
        <div className="searchbarParent">
          <Select
            isClearable
            className="searchbar"
            onChange={setSearchSkill}
            options={skillsArray}
            placeholder="Search for a skill..."
          ></Select>
          <Button
            variant="primary"
            onClick={(e) => {
              return handleSearch(e);
            }}
          >
            Search
          </Button>
        </div>
      </div>

      <h6
        className="text-center"
        style={{
          marginBottom: 2 + "rem",
        }}
      >
        Tutors:
      </h6>

      {tutorsFirstName.map(
        (name, index) =>
          tutorsHaveCurrentSkill[index] && (
            <Card
              className="text-center"
              key={index}
              style={{
                width: "50rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "20px",
              }}
            >
              <Card.Img
                variant="left"
                src="holder.js/100px180?text=Image cap"
              />
              <Card.Body style={{ paddingBottom: ".1rem" }}>
                <Card.Title>
                  {name} {tutorsLastName[index]}
                </Card.Title>
                <Card.Text>
                  {tutorsBio[index]}
                  <Button
                    variant="outline-danger"
                    href={`/app/profile/${tutorsID[index]}`}
                    style={{ marginLeft: ".5rem" }}
                  >
                    Read more
                  </Button>
                </Card.Text>

                {tutorsID[index] !== userData.user._id && (
                  <Button
                    variant="primary"
                    style={{
                      position: "relative",
                      left: "300px",
                      bottom: "50px",
                    }}
                    onClick={() =>
                      createConnection(
                        tutorsID[index],
                        userData.user._id,
                        history
                      )
                    }
                  >
                    Connect
                  </Button>
                )}
              </Card.Body>
            </Card>
          )
      )}
    </div>
  );
}
