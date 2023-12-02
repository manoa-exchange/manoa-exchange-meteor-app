import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { HouseDoorFill, ChatDots, BoxArrowRight, PersonFill, PersonCircle, PersonPlusFill, Compass, Heart } from 'react-bootstrap-icons';

const NavBar = () => {
  // Using useTracker to connect Meteor data to React component.
  const { username } = useTracker(() => ({
    username: Meteor.user()?.username,
  }), []);

  // Checking if the current user is an admin.
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

  return (
    <Navbar bg="light" expand="lg" className="navbar-content bg-dark text-light navbar-expand-md">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image
            src="../images/MElogo.png"
            alt="MĀNOA EXCHANGE Logo"
            height="75"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {isAdmin && (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {username ? (
              <>
                <Nav.Link id="home-nav" as={NavLink} to="/home">
                  <HouseDoorFill size={20} />
                </Nav.Link>
                <Nav.Link id="Direct-Messages-nav" as={NavLink} to="/directMessages">
                  <ChatDots size={20} />
                </Nav.Link>
                <Nav.Link id="Explore-nav" as={NavLink} to="/explorePage">
                  <Compass size={20} />
                </Nav.Link>
                <Nav.Link id="Liked-Posts-nav" as={NavLink} to="/savedposts">
                  <Heart size={20} />
                </Nav.Link>
                <Nav.Link id="create-nav" as={NavLink} to="/create">Create</Nav.Link>
                <Nav.Link id="posts-nav" as={NavLink} to="/posts">Posts</Nav.Link>
                <Nav.Link id="profile-nav" as={NavLink} to="/profile">Profile</Nav.Link>
                {isAdmin && (
                  <Nav.Link id="moderation-nav" as={NavLink} to="/moderation">Moderation</Nav.Link>
                )}
              </>
            ) : (
              <NavDropdown id="login-dropdown" title="Sign In">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {username && (
              <NavDropdown id="navbar-current-user" title={username}>
                <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
                  <PersonCircle />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  Sign out
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
