import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ResourceCard = ({ title, link }) => (
  <Container>
    <Card>
      <Card.Header>
        <Card.Title>
          <Container className="d-flex align-items-center justify-content-center text-center pt-3">
            <h5>{title}</h5>
          </Container>
        </Card.Title>
      </Card.Header>
      <Card.Footer>
        <Link to={link}><p>Visit external site →</p></Link>
      </Card.Footer>
    </Card>
  </Container>
);

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ResourceCard;
