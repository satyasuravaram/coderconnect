import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import "./Home.css";
import Particles from "react-particles-js";

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
        history.push("/app/dashboard");
      }
    };

    checkLoggedIn();
  });
  return (
    <div className="home-container">
      
      <div className="home-contents">
        <h2>CoderConnect</h2>
        <br />
        <p>Free coding help from qualified volunteer tutors!</p>
        <Button variant="light" className="home-btn" href="/users/register">
          Sign Up
        </Button>
        <Button variant="primary" className="home-btn" href="/users/login">
          Sign In
        </Button>
      </div>
    </div>
  );
}
