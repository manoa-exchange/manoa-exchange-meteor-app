import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Twitter, Facebook, Instagram, Youtube } from 'react-bootstrap-icons';
import { FaLinkedin, FaFlickr } from 'react-icons/fa';

const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container className="px-10">
      <Row>
        <Col className="text-left col-sm-3">
          <Image src="/images/UHM_logo.png" width={200} alt="University Logo" />
          <br />
          <br />
          2444 Dole Street
          <br />
          Honolulu, HI 96822
        </Col>
        <Col className="text-left col-sm-3">
          An{' '}
          <a href="https://www.hawaii.edu/offices/eeo/policies/">
            equal opportunity/affirmative action institution.
          </a> Use of this site implies consent with our <a href="https://www.hawaii.edu/infotech/policies/itpolicy.html"> Usage Policy</a> {' '}copyright © 2023 <br /><a href="https://www.hawaii.edu"> University of Hawaiʻi </a>
        </Col>
        <Col className="text-left col-sm-3">
          <a href="https://www.hawaii.edu/calendar">
            Calendar
          </a>
          <br />
          <a href="https://www.hawaii.edu/covid19/">
            Covid-19 Updates
          </a>
          <br />
          <a href="https://www.hawaii.edu/directory">
            Directory
          </a>
          <br />
          <a href="https://www.hawaii.edu/emergency">
            Emergency Information
          </a>
          <br />
          <a href="https://myuh.hawaii.edu/">
            MyUH
          </a>
          <br />
          <a href="https://www.hawaii.edu/privacy">
            Privacy Statement
          </a>
          <br />
          <a href="https://www.governmentjobs.com/careers/hawaiiedu">
            Work at UH
          </a>
          <br />
        </Col>
        <Col className="text-left col-sm-3">
          <div>
            <a href="https://twitter.com" aria-label="Twitter"><Twitter /></a>
            <a href="https://facebook.com" aria-label="Facebook"><Facebook /></a>
            <a href="https://instagram.com" aria-label="Instagram"><Instagram /></a>
            <a href="https://youtube.com" aria-label="YouTube"><Youtube /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://flickr.com" aria-label="Flickr"><FaFlickr /></a>
          </div>
          <a href="https://www.hawaii.edu/contact">
            Contact UH
          </a>
          <br />
          <a href="https://get.adobe.com/reader/">
            Get Adobe Acrobat Reader
          </a>
          <br />
          If required, information contained on this website can be made available in an alternative format upon request.
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
