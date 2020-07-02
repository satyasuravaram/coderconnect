import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

function MainNavbar () {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/app/dashboard">CoderConnect</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/app/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/app/messages">Messages</Nav.Link>
                    <NavDropdown title="[username]" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/app/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/become-a-tutor" target="_blank">Become a tutor</NavDropdown.Item>
                        <NavDropdown.Item href="/faq" target="_blank">FAQ</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNavbar;