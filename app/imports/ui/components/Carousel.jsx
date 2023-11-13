import React from 'react';
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
    { title: 'MIX', description: 'Manoa International Exchange', link: 'http://manoa.hawaii.edu/mix/', image: '' },
    { title: 'SAC', description: 'Study Abroad Center', link: 'http://www.studyabroad.hawaii.edu/', image: '' },
    { title: 'NSE', description: 'National Student Exchange', link: 'http://www.studyabroad.hawaii.edu/', image: '' },
    { title: 'Study Abroad and Exchange', description: 'UHM overseas options for current students and post-graduates', link: 'https://manoa.hawaii.edu/global/study-abroad-and-exchange/', image: '' },
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
