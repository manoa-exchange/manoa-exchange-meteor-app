import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import React from 'react';

const LandingNav = () => (
  <Navbar expand="lg">
    <Container fluid className="px-5">
      <Navbar.Brand as={NavLink} to="/" key="landing">
        <Image src="../images/MElogo.png" alt="manoa-exchange-logo" height={75} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="ps-3" as={NavLink} to="#resources" key="resources">Resources</Nav.Link>
          <Nav.Link className="ps-3" as={NavLink} to="/signin" key="signin">Sign In</Nav.Link>
          <Nav.Item className="ps-3">
            <Button href="/signup" variant="outline-dark">Register</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default LandingNav;