import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import './css/SignOut.css';
import NavBar from '../components/NavBar';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <div id="signout-page">
      <NavBar />
      <Container id="signout" fluid>
        <Row className="no-pad">
          <Col id="left-column-signout">
            <h2 id="signout-text" className="strong-white-text">Come visit your friends on</h2>
            <h2 id="signout-text2" className="strong-white-text">Manoa Exchange</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignOut;
