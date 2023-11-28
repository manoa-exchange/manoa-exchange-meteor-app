import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import '../css/PostItem.css';
import swal from 'sweetalert';
import { BiHeart, BiChat } from 'react-icons/bi';
import { FaFlag } from 'react-icons/fa';
import { Heart } from 'react-bootstrap-icons';
import { SavedPosts } from '../../api/savepost/SavePost';
import { Reports } from '../../api/report/Report';
import Comment from './Comment';
import AddComment from './AddComment';

const PostItem = ({ post, comments }) => {
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [fullCaptionVisible, setFullCaptionVisible] = useState(false);
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

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        likedPosts[post._id] = newLikedStatus;
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }
    });
  };

  const UnsavePost = () => {
    SavedPosts.collection.remove(post.uniqueId);
  };

  const [showComments, setShowComments] = useState(false);

  // Function to toggle comment section visibility
  const toggleComments = () => {
    setShowComments(!showComments);
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
    const postData = {
      uniqueId: post.uniqueId,
      name: post.name,
      image: post.image,
      caption: post.caption,
      owner: post.owner,
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
          <span onClick={toggleLike}>
            <BiHeart className={`like-icon ${liked ? 'heart-filled' : ''}`} />
          </span>
          <span>{likeCount}</span>
          <BiChat className="comment-icon" onClick={toggleComments} />
        </div>
        <Card.Text style={{ cursor: 'pointer', overflow: fullCaptionVisible ? 'visible' : 'hidden', textOverflow: fullCaptionVisible ? 'clip' : 'ellipsis', whiteSpace: fullCaptionVisible ? 'normal' : 'nowrap' }} onClick={toggleCaption}>
          {post.caption}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="post-footer manoa-white">
        <Container fluid> {/* Adding fluid attribute */}
          <Row className="justify-content-around align-items-center">
            <Col>
              <Link to={`/edit/${post._id}`} className="edit-link">Edit</Link>
            </Col>
            <Col className="text-center">
              <Button variant="link" onClick={report}>
                <FaFlag /> {/* Flag icon for reporting */}
              </Button>
            </Col>
            <Col className="text-end">
              <Button type="button" onClick={save}><Heart /></Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={UnsavePost}>Unsave</Button>
            </Col>
          </Row>
        </Container>
        {showComments && (
          <Row>
            <AddComment owner={post.owner} uniqueId={post._id} />
            <div className="scrollable-comments">
              <ListGroup variant="flush">
                {comments.map((comment) => <Comment key={comment._id} comment={comment} />)}
              </ListGroup>
            </div>
          </Row>
        )}
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
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string,
    uniqueId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
};

export default PostItem;
