import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./LandingNavbar.css";
function LandingNavbar() {
	return (
		<Navbar className="landing-navbar" variant="dark" expand="lg">
			<Navbar.Brand href="/">CoderConnect</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link href="/become-a-tutor">Become a Tutor</Nav.Link>
					<Nav.Link href="/about">About</Nav.Link>
					<Nav.Link href="/contact">Contact</Nav.Link>
					<Nav.Link href="/faq">FAQ</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default LandingNavbar;
