import React from 'react';
import { Col, Container } from 'react-bootstrap';
import '../pages/css/Footer.css';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer id="footer" className="mt-auto py-3 no-pad">
    <Container>
      <Col className="text-center">
        Department of Information and Computer Sciences
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
          Template Home
          Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
