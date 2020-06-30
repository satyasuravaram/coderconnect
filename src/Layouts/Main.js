import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Dashboard from '../Pages/Dashboard';
import Messages from '../Pages/Messages';
import Username from '../Pages/Username';

import MainNavbar from '../components/MainNavbar';

function Main() {
    return (
    <React.Fragment>
    <MainNavbar />
    <Switch>
        <Route path="/app/dashboard" component={Dashboard}></Route>
        <Route path="/app/messages" component={Messages}></Route>
        <Route path="/app/username" component={Username}></Route>
    </Switch>
    </React.Fragment>)
}

export default Main;