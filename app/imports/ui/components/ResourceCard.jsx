import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ResourceCard = ({ title, link }) => (
  <Container>
    <Card className="pt-2 pb-2" style={{ height: '200px' }}>
      <Card.Body className="d-flex flex-column justify-content-center">
        <div style={{ minHeight: '100px' }}>
          <Card.Title className="mb-0 text-center">
            <Container className="d-flex align-items-center justify-content-center text-center">
              <h5>{title}</h5>
            </Container>
          </Card.Title>
        </div>
        <div style={{ minHeight: '50px' }}>
          <Container className="d-flex align-items-center justify-content-center">
            <Button href={link} className="outline-dark">Visit Site →</Button>
          </Container>
        </div>
      </Card.Body>
    </Card>
  </Container>
);

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ResourceCard;
