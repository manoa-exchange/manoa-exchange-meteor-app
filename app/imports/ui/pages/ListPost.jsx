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
    return {
      posts: Posts.collection.find({}).fetch(),
      ready: subscription.ready(),
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.listPostsPage} className="py-3">
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

export default ListPost;
