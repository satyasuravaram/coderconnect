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

        <Switch>
          <Route path="/app" component={MainLayout}></Route>
          <Route path="/" component={LandingLayout}></Route>
        </Switch>

      </div>
    </Router>
  );
}


export default App;
