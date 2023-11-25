import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post';
import PostItem from '../components/PostItem';
import CommentSection from '../components/CommentSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';

const ListPost = () => {
  const { ready, posts } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    // Sort posts by 'createdAt' field in descending order (newest first)
    return {
      posts: Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
      ready: subscription.ready(),
    };
  }, []);

  return ready ? (
    <Row id={PageIDs.listPostsPage} className="justify-content-center">
      <Container className="py-3">
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
      </Container>
    </Row>
  ) : <LoadingSpinner />;
};

export default ListPost;
