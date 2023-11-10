import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PostItem = ({ post }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <tr>
      <td>{currentUser}</td>
      <td>{post.quantity}</td>
      <td><Image src={post.image} width={75} /></td>
      <td>{post.caption}</td>
      <td>
        <Link to={`/edit/${post._id}`}>Edit</Link>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
PostItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    image: PropTypes.string,
    caption: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PostItem;
