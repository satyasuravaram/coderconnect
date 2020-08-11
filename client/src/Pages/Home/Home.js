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
          <img className="feature-img" src={require("./images/conference-video-call.svg")} alt="Video call img" />
          <span>Video Chat</span>
        </div>
        <div className="feature">
        <img className="feature-img" src={require("./images/web-code.svg")} alt="Collaborative Coding Environment img" />
          <span>Collaborative Coding Environment</span>
        </div>
        <div className="feature">
        <img className="feature-img" src={require("./images/speaking-bubbles.svg")} alt="Live Chat img" />
          <span>Live Chat</span>
        </div>
        <div className="feature">
        <img className="feature-img" src={require("./images/whiteboard.svg")} alt="Shared Whiteboard img" />
          <span>Shared Whiteboard</span>
        </div>
      </div>
    </div>
  );
}
