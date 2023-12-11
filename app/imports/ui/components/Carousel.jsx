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
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ResourceItems = [
    { title: 'Manoa International Exchange', link: 'http://manoa.hawaii.edu/mix/' },
    { title: 'Study Abroad Center', link: 'https://www.studyabroad.hawaii.edu' },
    { title: 'National Student Exchange', link: 'http://nse.org' },
    { title: 'Money Matters & Resources', link: 'https://www.studyabroad.hawaii.edu/students/resources/' },
    { title: 'Self-Designed Study Abroad', link: 'https://www.studyabroad.hawaii.edu/programs/independent/' },
    { title: 'Study Abroad By Major', link: 'https://www.studyabroad.hawaii.edu/study-abroad-by-major/' },
    { title: 'Summer Programs', link: 'https://www.studyabroad.hawaii.edu/programs/summer/' },
    { title: 'Study In Japan', link: 'https://manoa.hawaii.edu/japanese-studies/academic-programs/study-in-japan/' },
    { title: 'Study Abroad Applications', link: 'https://www.studyabroad.hawaii.edu/students/applications/' },
    { title: 'College of Natural Sciences Opportunities', link: 'https://natsci.manoa.hawaii.edu/sasc/study-away/' },
    { title: 'Shidler College of Business Opportunities', link: 'https://shidler.hawaii.edu/international-exchange' },
    { title: 'College of Engineering Opportunities', link: 'https://coe.hawaii.edu/international/study-away/' },
    { title: 'John A. Burns School of Medicine Opportunities', link: 'https://jabsom.hawaii.edu/education/global-health/index.html' },
    { title: 'College of Social Sciences Opportunities', link: 'https://socialsciences.manoa.hawaii.edu/study-at-css/experiential-learning/study-abroad/' },
    { title: 'Study Abroad Quick Facts', link: 'https://www.studyabroad.hawaii.edu/about/quick-facts/' },
  ];

  return (
    <div>
      <Slider dots={settings.dots} infinite={settings.infinite} speed={settings.speed} slidesToShow={settings.slidesToShow} slidesToScroll={settings.slidesToScroll} responsive={settings.responsive}>
        {ResourceItems.map((item, index) => (
          <ResourceCard key={index} title={item.title} description={item.description} link={item.link} image={item.image} />
        ))}
      </Slider>
    </div>
  );
};

export default DynamicCarousel;
