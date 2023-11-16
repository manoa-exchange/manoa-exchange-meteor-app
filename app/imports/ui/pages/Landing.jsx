import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Airplane, BookmarkHeart, FileRichtext, GlobeAmericas, Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AniText from '../components/AnimatedText';
import LandingNav from '../components/LandingNavBar';
import DynamicCarousel from '../components/Carousel';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid>
    <LandingNav />
    <Container className="justify-content-center align-items-center p-5">
      <Row>
        <h3>JOIN NOW TO LEARN ABOUT</h3>
      </Row>
      <Row>
        <Col md={8}>
          <h1 id="landing-text">STUDY ABROAD IN</h1>
        </Col>
        <Col md={4}>
          <AniText />
        </Col>
      </Row>
    </Container>
    <Container fluid className="p-5">
      <Row className="pt-5 ps-5">
        <h1 id="landing-header">FEATURES</h1>
      </Row>
      <Row className="justify-content-center align-items-center text-center pt-4">
        <Col md={2}>
          <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
            <div className="custom-circle">
              <FileRichtext className="custom-icons" />
            </div>
            <h6 className="pt-4">BROWSE AND CREATE POSTS</h6>
          </Container>
        </Col>
        <Col md={2}>
          <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
            <div className="custom-circle">
              <BookmarkHeart className="custom-icons" />
            </div>
            <h6 className="pt-4">SAVE YOUR FAVORITES</h6>
          </Container>
        </Col>
        <Col md={2}>
          <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
            <div className="custom-circle">
              <Search className="custom-icons" />
            </div>
            <h6 className="pt-4">SEARCH POSTS AND USERS</h6>
          </Container>
        </Col>
        <Col md={2}>
          <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
            <div className="custom-circle">
              <GlobeAmericas className="custom-icons" />
            </div>
            <h6 className="pt-4">LEARN ABOUT STUDY ABROAD</h6>
          </Container>
        </Col>
        <Col md={2}>
          <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
            <div className="custom-circle">
              <Airplane className="custom-icons" />
            </div>
            <h6 className="pt-4">PREPARE FOR YOUR EXCHANGE</h6>
          </Container>
        </Col>
      </Row>
      <Row className="p-5 text-center">
        <h4>to access these features...</h4>
        <Link to="/signup">
          <h1 id="landing-header">REGISTER NOW →</h1>
        </Link>
      </Row>
    </Container>
    <Container id="color-block" className="p-5" fluid>
      <Row className="ps-5">
        <h1 id="landing-header" style={{ color: '#242331' }}>RESOURCES</h1>
      </Row>
      <Row className="pt-3 px-5">
        <DynamicCarousel />
      </Row>
    </Container>
  </Container>
);

export default Landing;
