import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, text: newComment }),
      });

      setComments([...comments, newComment]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={handleCommentSubmit}>Post Comment</button>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired, // Assuming postId is a string and is required
};

export default CommentSection;
