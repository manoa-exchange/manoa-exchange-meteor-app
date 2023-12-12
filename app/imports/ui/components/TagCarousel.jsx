import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { Meteor } from 'meteor/meteor';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Tags } from '../../api/tags/Tags';
import LoadingSpinner from './LoadingSpinner';

const TagCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 8,
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
    ],
  };

  const { tags, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Tags.adminPublicationName);
    const rdy = subscription.ready();
    const tagLabel = Tags.collection.find({}).fetch();
    return {
      tags: tagLabel,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <div>
      <Slider dots={settings.dots} infinite={settings.infinite} speed={settings.speed} slidesToShow={settings.slidesToShow} slidesToScroll={settings.slidesToScroll} responsive={settings.responsive}>
        {tags.map((tag) => (
          <Col key={tag._id} md={2} className="mb-3">
            <Container className="pt-3 justify-content-center align-items-center d-flex">
              <Link to={`/filter/${tag.name}`} style={{ textDecoration: 'none' }}>
                {postLinkedTag && <Button variant="success" disabled>{postLinkedTag.tag}</Button>}
              </Link>
            </Container>
          </Col>
        ))}
      </Slider>
    </div>
  ) : <LoadingSpinner />;
};

export default TagCarousel;
