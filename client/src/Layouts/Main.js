import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import Messages from "../Pages/Messages";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import UserContext from "../context/UserContext";
import Axios from "axios";
import "./styles.css";

import MainNavbar from "../components/MainNavbar";

function Main() {
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
      } else {
        history.push("/users/login");
      }
    };

    checkLoggedIn();
  });

  return (
    <React.Fragment>
      <MainNavbar />
      <div className="content-container">
        <Switch>
          <Route path="/app/dashboard" component={Dashboard}></Route>
          <Route path="/app/messages" component={Messages}></Route>
          <Route path="/app/profile/edit" component={EditProfile}></Route>
          <Route path="/app/profile" component={Profile}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Main;
