import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post.js';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem'; // Import the Contact component here (make sure the path is correct)
import { Comments } from '../../api/comment/Comment';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const ListPostsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts, comments } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Contact documents
    const postItems = Posts.collection.find({}).fetch();
    // Get the Note documents
    const commentItems = Comments.collection.find({}).fetch();
    return {
      posts: postItems,
      comments: commentItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {posts.map((post) => (<Col key={post._id}><PostItem post={post} comments={comments.filter(comment => (comment.uniqueId === post._id))} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListPostsAdmin;
