import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Container, Row, Col, Button } from 'react-bootstrap';
import '../css/PostItem.css';
import swal from 'sweetalert';
import { BiHeart, BiChat } from 'react-icons/bi'; // Importing react-icons
import { SavedPosts } from '../../api/savepost/SavePost';
import { Reports } from '../../api/report/Report';

const PostItem = ({ post }) => {
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

  const save = () => {
    const owner = Meteor.user().username;
    const postData = {
      uniqueId: post.uniqueId,
      name: post.name,
      image: post.image,
      caption: post.caption,
      owner,
    };

    SavedPosts.collection.insert(postData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
      }
    });
  };
  const report = () => {
    const owner = Meteor.user().username;

    const postData = {
      uniqueId: post.uniqueId, // Include the uniqueId from the post
      name: post.name,
      image: post.image,
      caption: post.caption,
      owner,
    };

    Reports.collection.insert(postData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
      }
    });
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
            <strong>{ post.uniqueId }</strong>
          </Col>
        </Row>
      </Card.Header>
      <Container className="post-image-container">
        <Image src={post.image} alt="Post" fluid />
      </Container>
      <Card.Body id="card-body">
        <div className="interaction-icons">
          {/* Using BiHeart and BiChat from react-icons */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span onClick={toggleLike}>
            <BiHeart className={`like-icon ${liked ? 'heart-filled' : ''}`} />
          </span>
          <span>{likeCount}</span> {/* Display the like count */}
          <BiChat className="comment-icon" />
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
        <Button type="button" onClick={report}>Report</Button>
        <Button type="button" onClick={save}>Save</Button>
      </Card.Footer>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    uniqueId: PropTypes.string,
    name: PropTypes.string,
    likeCount: PropTypes.number,
    image: PropTypes.string,
    caption: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PostItem;
