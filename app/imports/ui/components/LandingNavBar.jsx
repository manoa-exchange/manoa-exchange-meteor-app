import React from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingNav = () => {
  const scrollToResources = (event) => {
    event.preventDefault();

    const resourcesElement = document.getElementById('resources');
    if (resourcesElement) {
      window.scrollTo({
        top: resourcesElement.offsetTop - 50, // Adjust the offset as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <Navbar expand="lg">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link} to="/" key="landing">
          <Image src="../images/ME-logo-white.png" alt="manoa-exchange-logo" height={75} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="ps-3" onClick={scrollToResources} key="resources">
              Resources
            </Nav.Link>
            <Nav.Link className="ps-3" as={Link} to="/signin" key="signin">
              Sign In
            </Nav.Link>
            <Nav.Item className="ps-3">
              <Button as={Link} to="/signup" className="outline-light">
                Register
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingNav;
