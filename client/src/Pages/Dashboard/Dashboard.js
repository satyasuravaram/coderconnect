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
import SatyaImg from "../About/images/satya.jpeg";
import Pagination from "./Pagination";

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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  useEffect(() => {
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
    } else {
      let hasSkillArr = [];
      for (let i = 0; i < tutorsSkills.length; i++) {
        hasSkillArr.push(true);
      }
      setTutorsHaveCurrentSkill(hasSkillArr);
    }
  };
  console.log(tutorsHaveCurrentSkill);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBios = tutorsBio.slice(indexOfFirstPost, indexOfLastPost);
  const currentFirstNames = tutorsFirstName.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const currentLastNames = tutorsLastName.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const currentIDs = tutorsID.slice(indexOfFirstPost, indexOfLastPost);
  const currentSkills = tutorsHaveCurrentSkill.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      <h6 className="text-center">Tutors:</h6>
      <Pagination
        className="center"
        postsPerPage={postsPerPage}
        totalPosts={tutorsHaveCurrentSkill.filter((tutor) => tutor).length}
        paginate={paginate}
      />
      <div className="tutor-card-container">
        {currentFirstNames.map(
          (firstName, index) =>
            currentSkills[index] && (
              <div className="tutor-card">
                <div className="tutor-card-img-container">
                  <img
                    className="tutor-card-img"
                    src={SatyaImg}
                    alt="satyaimg"
                  />
                </div>

                <div className="tutor-card-info">
                  <h1 className="tutor-card-name">
                    {firstName} {currentLastNames[index]}
                  </h1>
                  <p className="tutor-card-bio">
                    {currentBios[index].substring(0, 150)}
                    {currentBios[index].length > 150 && "..."} &nbsp;
                  </p>
                  <a
                    href={`/app/profile/${currentIDs[index]}`}
                    className="tutor-card-readmore"
                  >
                    See Profile
                  </a>

                  {currentIDs[index] !== userData.user._id && (
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() =>
                        createConnection(
                          currentIDs[index],
                          userData.user._id,
                          history
                        )
                      }
                      className="connect-btn"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

{
  /* <Card
className="text-center"
key={index}
style={{
  width: "59%",
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
    {firstName} {currentLastNames[index]}
  </Card.Title>
  <Card.Text>
    {currentBios[index]}
    <Button
      variant="outline-danger"
      href={`/app/profile/${tutorsID[index]}`}
      style={{ marginLeft: ".5rem" }}
    >
      Read more
    </Button>
  </Card.Text>

  {currentIDs[index] !== userData.user._id && (
    <Button
      variant="primary"
      style={{
        position: "relative",
        left: "300px",
        bottom: "50px",
      }}
      onClick={() =>
        createConnection(
          currentIDs[index],
          userData.user._id,
          history
        )
      }
    >
      Connect
    </Button>
  )}
</Card.Body>
</Card> */
}
