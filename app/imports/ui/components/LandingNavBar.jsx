import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import React from 'react';

const LandingNav = () => (
  <Navbar expand="lg" id="landing-navbar">
    <Container fluid className="px-5">
      <Navbar.Brand as={NavLink} to="/" key="landing">
        <Image src="../images/ME-logo-white.png" alt="manoa-exchange-logo" height={75} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="ps-3" as={Link} to="/#resources" id="resources" key="resources">Resources</Nav.Link>
          <Nav.Link className="ps-3" as={NavLink} to="/signin" id="signin" key="signin">Sign In</Nav.Link>
          <Nav.Item className="ps-3">
            <Button href="/signup" id="register-button" className="outline-light">Register</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default LandingNav;
