import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ResourceCard = ({ title, link }) => (
  <Container>
    <Card>
      <Card.Body>
    <Card style={{ height: '200px' }}>
        <Card.Title>
          <Container className="d-flex align-items-center justify-content-center text-center pt-3">
            <h5>{title}</h5>
          </Container>
        </Card.Title>
        <Button href="/signup" className="outline-light">Register</Button>
        <Link to={link}><p>Visit external site →</p></Link>
      </Card.Body>
    </Card>
  </Container>
);

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ResourceCard;
