import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import "./App.css";

//Context
import UserContext from "./context/UserContext";

// Layouts
import LandingLayout from "./Layouts/Landing";
import MainLayout from "./Layouts/Main";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="App">
          <Switch>
            <Route path="/app" component={MainLayout}></Route>
            <Route path="/" component={LandingLayout}></Route>
          </Switch>
        </div>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
