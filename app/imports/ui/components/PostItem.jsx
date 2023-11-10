import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Include if not already globally imported

/** Renders a post in a card layout, similar to an Instagram post. */
const PostItem = ({ post }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Card className="mb-3">
      <Card.Header>
        Posted by <strong>{currentUser}</strong>
      </Card.Header>
      <Image src={post.image} alt="Post" fluid />
      <Card.Body>
        <Card.Text>
          <strong>Caption:</strong> {post.caption}
        </Card.Text>
        {/* Like and Comment icons */}
        <div className="mt-2">
          <i className="bi bi-heart" style={{ cursor: 'pointer', marginRight: '10px' }}></i>
          <i className="bi bi-chat" style={{ cursor: 'pointer' }}></i>
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Quantity: {post.quantity}</small>
        <Link to={`/edit/${post._id}`} className="float-right">Edit</Link>
      </Card.Footer>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    quantity: PropTypes.number,
    image: PropTypes.string,
    caption: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PostItem;
