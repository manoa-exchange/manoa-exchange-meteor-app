import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Image } from 'react-bootstrap';
import smilingHawaiians from 'smiling-hawaiians.png'; // Adjust the path as necessary

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container>
      <Row>
        <Col>
          <Container>
            <Image src={smilingHawaiians} fluid />
          </Container>
        </Col>
        <Col>
          <Container />
        </Col>
      </Row>
    </Container>
  );
};

export default SignOut;
