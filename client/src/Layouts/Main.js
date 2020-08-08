import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Dashboard from "../Pages/Dashboard/Dashboard";
import Messages from "../Pages/Messages/Messages";
import Profile from "../Pages/Profile/Profile";
import EditProfile from "../Pages/Profile/EditProfile";
import PublicProfile from "../Pages/Profile/PublicProfile";
import Chat from "../Pages/Chat/Chat";
import UserContext from "../context/UserContext";
import Axios from "axios";
import MainNavbar from "../components/MainNavbar";
import "./Main.css"

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
        "/users/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
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
  }, []);

  return (
    <React.Fragment>
      <MainNavbar />
      <div className="content-container">
        <Switch>
          <Route path="/app/dashboard" component={Dashboard}></Route>
          <Route exact path="/app/messages" component={Messages}></Route>
          <Route path="/app/profile/edit" component={EditProfile}></Route>
          <Route path="/app/profile/:userid" component={PublicProfile}></Route>
          <Route exact path="/app/profile" component={Profile}></Route>
          <Route path="/app/messages/:connectid" component={Chat}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Main;
