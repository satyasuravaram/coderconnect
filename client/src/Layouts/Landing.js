import React from "react";
import { Switch, Route } from "react-router-dom";

import BecomeTutor from "../Pages/Become-a-Tutor";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Faq from "../Pages/FAQ";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import "./styles.css";

import LandingNavbar from "../components/LandingNavbar";

function Landing() {
  return (
    <React.Fragment>
      <LandingNavbar />
      <div className = "content-container">
        <Switch>
          <Route path="/become-a-tutor" component={BecomeTutor}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/faq" component={Faq}></Route>
          <Route path="/users/register" component={Register}></Route>
          <Route path="/users/login" component={Login}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Landing;
