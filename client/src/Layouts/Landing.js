import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import BecomeTutor from '../Pages/Become-a-Tutor';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import FAQ from '../Pages/FAQ';
import Home from '../Pages/Home'

import LandingNavbar from '../components/LandingNavbar';

function Landing() {
    return (
    <React.Fragment>
    <LandingNavbar />
    <Switch>
        <Route path="/become-a-tutor" component={BecomeTutor}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/faq" component={FAQ}></Route>
        <Route exact path="/" component={Home}></Route>
    </Switch>
    </React.Fragment>)
}

export default Landing;