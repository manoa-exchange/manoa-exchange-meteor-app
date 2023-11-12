import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col className="text-center">
          <Image src="/images/UH_Logo.png" width={100} alt="University Logo" />
          2500 Campus Rd.
          Honolulu, Hi 96822
        </Col>
        <Col className="text-center">
          ICS 314
        </Col>
        <Col className="text-center">
          <a href="https://github.com/manoa-exchange">
            Github Organization
          </a>
        </Col>
        <Col className="text-center">
          {/* Add content for the fourth column here */}
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
