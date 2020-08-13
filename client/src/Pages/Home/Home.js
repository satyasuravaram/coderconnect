import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import "./Home.css";

export default function Home() {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const checkLoggedIn = async () => {
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
        history.push("/app/dashboard");
      }
    };

    checkLoggedIn();
  });
  return (
    <div className="home-main-wrapper">
      <div className="home-container">
        <div className="left-home-col">
          <h1>CoderConnect</h1>
          <br />
          <p>Free coding help from qualified volunteer tutors!</p>
          <Button
            className="home-btn-signup"
            onClick={() => history.push("/users/register")}
          >
            Sign Up
          </Button>
          <Button
            className="home-btn-signin"
            onClick={() => history.push("/users/login")}
          >
            Sign In
          </Button>
        </div>
        <div className="right-home-col">
          <div className="feature">
            <img
              className="feature-img"
              src={require("./images/conference-video-call.svg")}
              alt="Video call img"
            />
            <div className="feature-text">
              <h5>Video Chat</h5>
              <p>Have a video call with your tutor.</p>
            </div>
          </div>
          <div className="feature">
            <img
              className="feature-img"
              src={require("./images/web-code.svg")}
              alt="Collaborative Coding Environment img"
            />
            <div className="feature-text">
              <h5>Collaborative Coding Environment</h5>
              <p>
                A real-time shared coding environment during your tutoring
                sessions.
              </p>
            </div>
          </div>
          <div className="feature">
            <img
              className="feature-img"
              src={require("./images/speaking-bubbles.svg")}
              alt="Live Chat img"
            />
            <div className="feature-text">
              <h5>Chat</h5>
              <p>Chat anytime, from any device.</p>
            </div>
          </div>
          <div className="feature">
            <img
              className="feature-img"
              src={require("./images/whiteboard.svg")}
              alt="Shared Whiteboard img"
            />
            <div className="feature-text">
              <h5>Shared Whiteboard</h5>
              <p>
                Chart out your flow charts, pseudo code, logic, or whatever you
                need to.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="how-it-works">
        <h2 className="how-it-works-main-header">How it Works</h2>
        <div className="how-it-works-row">
          <div className="how-it-works-item">
            <div className="how-it-works-img-container">
              <img
                src={require("./images/search.svg")}
                alt=""
                className="how-it-works__img"
              />
            </div>
            <h4 className="how-it-works-header">Search by Topic</h4>
            <p className="how-it-works-paragraph">
              Filter through a wide range of programming skills and find the
              perfect tutor just for you
            </p>
          </div>
          <div className="how-it-works-item">
            <div className="how-it-works-img-container">
              <img
                src={require("./images/daily-schedule.svg")}
                alt=""
                className="how-it-works__img"
              />
            </div>
            <h4 className="how-it-works-header">Schedule a Lesson</h4>
            <p className="how-it-works-paragraph">
              Simply communicate through live chat with our team of qualified
              tutors to secure meeting dates
            </p>
          </div>
          <div className="how-it-works-item">
            <div className="how-it-works-img-container">
              <img
                src={require("./images/video-call.svg")}
                alt=""
                className="how-it-works__img"
              />
            </div>
            <h4 className="how-it-works-header">Learn with Ease</h4>
            <p className="how-it-works-paragraph">
              Work in real time online tutoring with video chat, a collaborative
              code editor, and whiteboard - the perfect learning environment{" "}
            </p>
          </div>
          <div className="how-it-works-item">
            <div className="how-it-works-img-container">
              <img
                src={require("./images/feedback.svg")}
                alt=""
                className="how-it-works__img"
              />
            </div>
            <h4 className="how-it-works-header">Leave Feedback</h4>
            <p className="how-it-works-paragraph">
              Send us anonymous feedback about your lesson to improve future
              experiences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
