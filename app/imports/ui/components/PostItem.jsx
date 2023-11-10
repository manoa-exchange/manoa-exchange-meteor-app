import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Container } from 'react-bootstrap';

const PostItem = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [fullCaptionVisible, setFullCaptionVisible] = useState(false);
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
        console.error("Error updating like count:", error);
      } else {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        setLikeCount(prevCount => newLikedStatus ? prevCount + 1 : prevCount - 1);

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
    <Card className="mb-3 border border-secondary" style={{ width: '350px' }}>
      <Card.Header>
        Posted by <strong>{post.name}</strong>
      </Card.Header>
      <Container style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
        <Image src={post.image} alt="Post" fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Container>
      <Card.Body>
        <div className="mb-2">
          <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={toggleLike}></i>
          <span>{likeCount}</span> {/* Display the like count */}
          <i className="bi bi-chat" style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
        </div>
        <Card.Text style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: fullCaptionVisible ? 'normal' : 'nowrap' }} onClick={toggleCaption}>
          <strong>Caption:</strong> {post.caption}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/edit/${post._id}`} className="float-right">Edit</Link>
      </Card.Footer>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    likeCount: PropTypes.number, // likeCount is now optional
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostItem;
