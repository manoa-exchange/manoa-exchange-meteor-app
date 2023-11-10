import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

/** Renders a post in a card layout, similar to an Instagram post. */
const PostItem = ({ post }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Card className="mb-3 border border-secondary"> {/* Added border classes */}
      <Card.Header>
        Posted by <strong>{currentUser}</strong>
      </Card.Header>
      <Image src={post.image} alt="Post" fluid />
      <Card.Body>
        <Card.Text>
          <strong>Caption:</strong> {post.caption}
        </Card.Text>
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
