import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { HouseDoorFill, ChatDots, BoxArrowRight, PersonFill, PersonCircle, PersonPlusFill, Compass, Heart } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg" className="navbar-content">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image
            src="../images/MElogo.png"
            alt="MĀNOA EXCHANGE Logo"
            height="75"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser ? ([
              <Nav.Link id="Feed-nav" as={NavLink} to="/feed" key="feed">
                <HouseDoorFill size={20} />
              </Nav.Link>,
              <Nav.Link id="Direct-Messages-nav" as={NavLink} to="/directMessages" key="directMessages">
                <ChatDots size={20} />
              </Nav.Link>,
              <Nav.Link id="Explore-nav" as={NavLink} to="/explorePage" key="explorePage">
                <Compass size={20} />
              </Nav.Link>,
              <Nav.Link id="Liked-Posts-nav" as={NavLink} to="/likedPostsPage" key="likedPostsPage">
                <Heart size={20} />
              </Nav.Link>,
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</Nav.Link>,
              <Nav.Link id="posts-nav" as={NavLink} to="/posts" key="posts">Posts</Nav.Link>,
              <Nav.Link id="profile-nav" as={NavLink} to="/profile" key="profile">My Profile</Nav.Link>,
              <Nav.Link id="create-nav" as={NavLink} to="/create" key="create">Create</Nav.Link>,
              <Nav.Link id="posts-nav" as={NavLink} to="/posts" key="posts">Posts</Nav.Link>,
              <Nav.Link id="profile-nav" as={NavLink} to="/profile" key="profiles">Profile</Nav.Link>,
            ]) : ''}
            {currentUser === '' ? (
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
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
                  <PersonCircle />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
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
