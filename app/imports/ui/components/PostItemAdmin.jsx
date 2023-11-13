import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const PostItemAdmin = ({ stuff: post }) => (
  <tr>
    <td>{post.name}</td>
    <td>{post.quantity}</td>
    <td>{post.image}</td>
    <td>{post.caption}</td>
    <td>{post.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
PostItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    image: PropTypes.string,
    caption: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default PostItemAdmin;
