import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { description } from 'meteor-dev-bundle/packages/modules';

const ResourceCard = ({ title }) => (
  <Container>
    <Card>
      <Card.Title>
        <Container className="d-flex align-items-center justify-content-center text-center pt-3">
          <h4>{title}</h4>
        </Container>
      </Card.Title>
    </Card>
  </Container>
);

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
};

const DynamicCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  const ResourceItems = [
    { title: 'MIX', description: 'Manoa International Exchange', link: 'https://manoa.hawaii.edu/global/study-abroad-and-exchange/', image: '' },
    { title: 'SAC', description: 'Study Abroad Center', link: 'https://manoa.hawaii.edu/global/study-abroad-and-exchange/', image: '' },
    { title: 'NSE', description: 'National Student Exchange', link: 'https://manoa.hawaii.edu/global/study-abroad-and-exchange/', image: '' },
  ];

  return (
    <div>
      <Slider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
      >
        <ResourceCard title="MIX" />
        <ResourceCard title="SAC" />
        <ResourceCard title="NSE" />
        <ResourceCard title="Another Card" />
        <ResourceCard title="Another Card" />
        <ResourceCard title="Another Card" />
        <ResourceCard title="Another Card" />
        <ResourceCard title="Another Card" />
        <ResourceCard title="Another Card" />
      </Slider>
    </div>
  );
};

export default DynamicCarousel;
