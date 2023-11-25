import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { SavedPosts } from '../../api/savepost/SavePost';
import PostItem from '../components/PostItem';
import CommentSection from '../components/CommentSection';
import LoadingSpinner from '../components/LoadingSpinner';

const ListSavedPost = () => {
  const { ready, posts } = useTracker(() => {
    const subscription = Meteor.subscribe(SavedPosts.userPublicationName);
    // Sort the posts by createdAt in descending order
    return {
      posts: SavedPosts.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
      ready: subscription.ready(),
    };
  }, []);

  return ready ? (
    <Container className="py-3">
      <Row className="text-center">
        <Col>
          <Card className="mb-4 border border-black">
            <Card.Header as="h3" className="text-center">Saved Posts</Card.Header>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12}>
          {posts.map((post) => (
            <div key={post._id} className="post-and-comments">
              <Row>
                <Col md={6}>
                  <PostItem post={post} />
                </Col>
                <Col md={6}>
                  <CommentSection postId={post._id} />
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListSavedPost;
