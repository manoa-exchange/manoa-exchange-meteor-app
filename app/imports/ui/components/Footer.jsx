import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        University of Hawaii at Mānoa
        <br />
        ICS 314
        <br />
        <a href="https://github.com/manoa-exchange">
          Github Organization
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
