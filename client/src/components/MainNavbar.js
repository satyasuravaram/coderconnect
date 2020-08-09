import React, { useContext } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import UserContext from '../context/UserContext';
import "./MainNavbar.css";

function MainNavbar () {

    
    const { setUserData } = useContext(UserContext);

    const logout = () => {        
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <Navbar className="main-navbar" variant="light" expand="lg">
            <Navbar.Brand href="/app/dashboard">CoderConnect</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/app/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/app/messages">Messages</Nav.Link>
                    <NavDropdown alignRight title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/app/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/become-a-tutor" target="_blank">Become a tutor</NavDropdown.Item>
                        <NavDropdown.Item href="/faq" target="_blank">FAQ</NavDropdown.Item>
                        <NavDropdown.Item href="/contact" target="_blank">Contact us</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout} href="/">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNavbar;