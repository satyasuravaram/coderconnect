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
import DefaultImg from "../About/images/default-profile-pic.png";
import Pagination from "./Pagination";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [searchSkill, setSearchSkill] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const [currentTutors, setCurrentTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
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

      const tokenRes = await Axios.post("/users/isTokenValid", null, {
        headers: { "x-auth-token": token },
      });

      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token: token,
          user: userRes.data,
        });

        setLoading(true);

        const tutorArr = await Axios.get("/users/tutors", {
          headers: { "x-auth-token": token },
        });

        setLoading(false);

        for (let i = 0; i < tutorArr.data.length; i++) {
          setTutors((prevTutors) => [
            ...prevTutors,
            {
              id: tutorArr.data[i]._id,
              firstName: tutorArr.data[i].firstName,
              lastName: tutorArr.data[i].lastName,
              skills: tutorArr.data[i].skills,
              bio: tutorArr.data[i].bio,
              image: tutorArr.data[i].image,
            },
          ]);
          setCurrentTutors((prevTutors) => [
            ...prevTutors,
            {
              id: tutorArr.data[i]._id,
              firstName: tutorArr.data[i].firstName,
              lastName: tutorArr.data[i].lastName,
              skills: tutorArr.data[i].skills,
              bio: tutorArr.data[i].bio,
              image: tutorArr.data[i].image,
            },
          ]);
        }
      }
    };
    getTutors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchSkill !== null && Object.keys(searchSkill).length !== 0) {
      const skill = searchSkill.value;
      let currTutors = [];
      for (let i = 0; i < tutors.length; i++) {
        if (tutors[i].skills.includes(skill)) {
          currTutors.push(tutors[i]);
        }
      }
      setCurrentTutors(currTutors);
    } else {
      setCurrentTutors(tutors);
    }
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredTutors = currentTutors.slice(indexOfFirstPost, indexOfLastPost);
  const override = css`
    display: block;
    margin: auto auto;
    border-color: red;
    margin-top: 10%;
  `;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="full-container">
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
            className=""
            onClick={(e) => {
              return handleSearch(e);
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {!loading ? (
        <div>
          <h6 className="text-center">Tutors:</h6>
          <Pagination
            className="center"
            postsPerPage={postsPerPage}
            totalPosts={currentTutors.length}
            paginate={paginate}
          />

          <div className="tutor-card-container">
            {filteredTutors.length === 0 ? (
              <div className="no-tutors">
                <h2>No tutors with this skill available</h2>
              </div>
            ) : (
              filteredTutors.map((tutor, index) => (
                <div className="tutor-card">
                  <div className="tutor-card-img-container">
                    <img
                      className="tutor-card-img"
                      src={
                        tutor.image
                          ? `data:image;base64,${tutor.image}`
                          : DefaultImg
                      }
                      alt={`${tutor.firstName}-img`}
                    />
                  </div>

                  <div className="tutor-card-info">
                    <h1 className="tutor-card-name">
                      {tutor.firstName} {tutor.lastName}
                    </h1>
                    <p className="tutor-card-bio">
                      {tutor.bio.substring(0, 150)}
                      {tutor.bio.length > 150 && "..."} &nbsp;
                    </p>
                    <a
                      href={`/app/profile/${tutor.id}`}
                      className="tutor-card-readmore"
                    >
                      See Profile
                    </a>

                    {tutor.id !== userData.user._id && (
                      <Button
                        size="md"
                        variant="primary"
                        onClick={() =>
                          createConnection(tutor.id, userData.user._id, history)
                        }
                        className="connect-btn"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="load-ani">
          <ClipLoader
            css={override}
            size={150}
            color={"navy"}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
