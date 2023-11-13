import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ResourceCard from './ResourceCard';

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
    { title: 'NSE', description: 'National Student Exchange', link: 'https://manoa.hawaii.edu/global/study-abroad-and-exchange/', image: '' },
    { title: 'NSE', description: 'National Student Exchange', link: 'https://manoa.hawaii.edu/global/study-abroad-and-exchange/', image: '' },
  ];

  return (
    <div>
      <Slider dots={settings.dots} infinite={settings.infinite} speed={settings.speed} slidesToShow={settings.slidesToShow} slidesToScroll={settings.slidesToScroll}>
        {ResourceItems.map((item, index) => (
          <ResourceCard key={index} title={item.title} description={item.description} link={item.link} image={item.image} />
        ))}
      </Slider>
    </div>
  );
};

export default DynamicCarousel;
