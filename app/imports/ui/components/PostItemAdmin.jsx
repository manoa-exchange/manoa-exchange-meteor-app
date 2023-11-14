import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Container, Row, Col } from 'react-bootstrap';
import '../css/PostItem.css';

const PostItemAdmin = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [fullCaptionVisible, setFullCaptionVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  // Check local storage for like status
  const checkLikedStatus = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    return likedPosts[post._id] === true;
  };

  const [liked, setLiked] = useState(checkLikedStatus());

  useEffect(() => {
    setLikeCount(post.likeCount || 0);
  }, [post.likeCount]);

  const toggleLike = () => {
    const methodToCall = liked ? 'posts.decrementLike' : 'posts.incrementLike';
    Meteor.call(methodToCall, post._id, (error) => {
      if (error) {
        console.error('Error updating like count:', error);
      } else {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        setLikeCount(prevCount => (newLikedStatus ? prevCount + 1 : prevCount - 1));

        // Update local storage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        likedPosts[post._id] = newLikedStatus;
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }
    });
  };

  const toggleCaption = () => {
    setFullCaptionVisible(!fullCaptionVisible);
  };

  return (
    <Card className="post-card">
      <Card.Header id="card-header" className="manoa-white">
        <Row>
          <Col xs="auto" className="profile-pic-col">
            <div className="profile-pic">
              <Image src="path_to_profile_picture.jpg" alt="Profile" className="profile-img" />
            </div>
          </Col>
          <Col>
            {/* eslint-disable-next-line react/prop-types */}
            <strong>{ post.name }</strong>
          </Col>
        </Row>
      </Card.Header>
      <Container className="post-image-container">
        <Image src={post.image} alt="Post" fluid />
      </Container>
      <Card.Body id="card-body">
        <div className="interaction-icons">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} like-icon`} onClick={toggleLike} />
          <span>{likeCount}</span> {/* Display the like count */}
          <i className="bi bi-chat comment-icon" />
        </div>
        <Card.Text
          style={{
            cursor: 'pointer',
            overflow: fullCaptionVisible ? 'visible' : 'hidden',
            textOverflow: fullCaptionVisible ? 'clip' : 'ellipsis',
            whiteSpace: fullCaptionVisible ? 'normal' : 'nowrap',
          }}
          onClick={toggleCaption}
        >
          {post.caption}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="post-footer manoa-white">
        <Link to={`/edit/${post._id}`} className="edit-link">Edit</Link>
      </Card.Footer>
    </Card>
  );
};

PostItemAdmin.propTypes = {
  post: PropTypes.shape({
    likeCount: PropTypes.number,
    image: PropTypes.string.isRequired,
    caption: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PostItemAdmin;