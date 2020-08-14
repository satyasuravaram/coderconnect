import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ec2url from "../context/Config";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Messages from "../Pages/Messages/Messages";
import Profile from "../Pages/Profile/Profile";
import EditProfile from "../Pages/Profile/EditProfile";
import PublicProfile from "../Pages/Profile/PublicProfile";
import Chat from "../Pages/Chat/Chat";
import UserContext from "../context/UserContext";
import Axios from "axios";
import MainNavbar from "../components/MainNavbar";
import "./Main.css";

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

      let url = "";
      if (process.env.NODE_ENV === "production") {
        url = ec2url + "/users/isTokenValid";
      } else {
        url = "/users/isTokenValid";
      }
      const tokenRes = await Axios.post(url, null, {
        headers: { "x-auth-token": token },
      });

      url = "";
      if (process.env.NODE_ENV === "production") {
        url = ec2url + "/users/";
      } else {
        url = "/users/";
      }

      if (tokenRes.data) {
        const userRes = await Axios.get(url, {
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
