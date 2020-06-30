import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import BecomeTutor from './Pages/Become-a-Tutor';
import About from './Pages/About';
import Contact from './Pages/Contact';
import FAQ from './Pages/FAQ';
import Home from './Pages/Home';

// Layouts
import LandingLayout from './Layouts/Landing';
import MainLayout from './Layouts/Main';

import LandingNavbar from './components/LandingNavbar';
import MainNavbar from './components/MainNavbar';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/app" component={MainLayout}></Route>
          <Route path="/" component={LandingLayout}></Route>
        </Switch>
        {/* <LandingLayout />
        <MainLayout /> */}
        {/* <LandingNavbar />
        <Switch>
          <Route path="/become-a-tutor" component={BecomeTutor}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/faq" component={FAQ}></Route>
          <Route path="/" component={Home}></Route>
        </Switch> */}
      </div>
    </Router>
  );
}


export default App;
