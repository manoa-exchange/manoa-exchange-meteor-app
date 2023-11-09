import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PostItem = ({ post }) => (
  <tr>
    <td>{post.name}</td>
    <td>{post.quantity}</td>
    <td>{post.image}</td>
    <td>{post.caption}</td>
    <td>
      <Link to={`/edit/${post._id}`}>Edit</Link>
    </td>
  </tr>
);

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
