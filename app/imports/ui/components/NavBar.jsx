import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar id="navbar" style={{ backgroundColor: '#357266' }} expand="lg">
      <Container className="navbar-color">
        <Navbar.Brand as={NavLink} to="/">
          <h2>MĀNOA EXCHANGE</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <Nav.Link as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            )}
            {currentUser && (
              <>
                <Nav.Link as={NavLink} to="/add" key="add">Add Posts</Nav.Link>
                <Nav.Link as={NavLink} to="/list" key="list">List Posts</Nav.Link>
                <Nav.Link as={NavLink} to="/posts" key="posts">Posts</Nav.Link>
                <Nav.Link as={NavLink} to="/profile" key="profile">My Profile</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser ? (
              <NavDropdown title={currentUser} id="navbar-current-user">
                <NavDropdown.Item as={NavLink} to="/signout">
                  <BoxArrowRight />
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Sign In" id="login-dropdown">
                <NavDropdown.Item as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
