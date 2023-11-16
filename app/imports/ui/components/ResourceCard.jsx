import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ResourceCard = ({ title, description, link, image }) => (
  <Container>
    <Card>
      <Card.Header>
        <Card.Img src={image} />
        <Card.Title>
          <Container className="d-flex align-items-center justify-content-center text-center pt-3">
            <h4>{title}</h4>
          </Container>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>{description}</p>
      </Card.Body>
      <Card.Footer>
        <Link to={link}><p>Visit external site →</p></Link>
      </Card.Footer>
    </Card>
  </Container>
);

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ResourceCard;
