import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Twitter, Facebook, Instagram, Youtube } from 'react-bootstrap-icons';
import { FaLinkedin, FaFlickr } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer-content mt-auto bg-dark text-light">
    <Container className="footer-content">
      <Row className="footer-content">
        <Col className="text-left col-sm-3 footer-content">
          <Image src="/images/UHM_logo.png" width={200} alt="University Logo" />
          <br />
          <br />
          2444 Dole Street
          <br />
          Honolulu, HI 96822
        </Col>
        <Col className="text-left col-sm-12 col-md-3 mb-4 footer-content">
          An{' '}
          <a href="https://www.hawaii.edu/offices/eeo/policies/" className="footer-link">
            equal opportunity/affirmative action institution.
            {/* eslint-disable-next-line max-len */}
          </a> Use of this site implies consent with our <a href="https://www.hawaii.edu/infotech/policies/itpolicy.html" className="footer-link"> Usage Policy</a> {' '}copyright © 2023 <br /><a href="https://www.hawaii.edu" className="footer-link"> University of Hawaiʻi </a>
        </Col>
        <Col className="text-left col-sm-12 col-md-3 mb-4 footer-content">
          <a href="https://www.hawaii.edu/calendar" className="footer-link">
            Calendar
          </a>
          <br />
          <a href="https://www.hawaii.edu/covid19/" className="footer-link">
            Covid-19 Updates
          </a>
          <br />
          <a href="https://www.hawaii.edu/directory" className="footer-link">
            Directory
          </a>
          <br />
          <a href="https://www.hawaii.edu/emergency" className="footer-link">
            Emergency Information
          </a>
          <br />
          <a href="https://myuh.hawaii.edu/" className="footer-link">
            MyUH
          </a>
          <br />
          <a href="https://www.hawaii.edu/privacy" className="footer-link">
            Privacy Statement
          </a>
          <br />
          <a href="https://www.governmentjobs.com/careers/hawaiiedu" className="footer-link">
            Work at UH
          </a>
          <br />
        </Col>
        <Col className="text-left col-sm-12 col-md-3 mb-4">
          <div className="footer-social-icons">
            <a href="https://twitter.com" aria-label="Twitter" className="footer-link"><Twitter /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="footer-link"><Facebook /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="footer-link"><Instagram /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="footer-link"><Youtube /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="footer-link"><FaLinkedin /></a>
            <a href="https://flickr.com" aria-label="Flickr" className="footer-link"><FaFlickr /></a>
          </div>
          <a href="https://www.hawaii.edu/contact" className="footer-link">
            Contact UH
          </a>
          <br />
          <a href="https://get.adobe.com/reader/" className="footer-link">
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
