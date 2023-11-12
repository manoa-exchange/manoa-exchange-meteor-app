import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col className="text-left">
          <Image src="/images/UHM_Logo.png" width={100} alt="University Logo" />
          <br />
          <br />
          2500 Campus Rd.
          <br />
          Honolulu, HI 96822
        </Col>
        <Col className="text-left">
          An{' '}
          <a href="https://www.hawaii.edu/offices/eeo/policies/">
            equal opportunity/affirmative action institution.
          </a> Use of this site implies consent with our <a href="https://www.hawaii.edu/policy/docs/temp/ep2.210.pdf"> Usage Policy</a> {' '}copyright © 2018 <a href="https://www.hawaii.edu"> University of Hawaiʻi </a>
        </Col>
        <Col className="text-left">
          <a href="https://github.com/manoa-exchange">
            Manoa Exchange Github Organization
          </a>
        </Col>
        <Col className="text-left">
          {/* Add content for the fourth column here */}
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
