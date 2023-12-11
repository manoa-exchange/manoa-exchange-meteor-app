import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post.js';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem';
import { Comments } from '../../api/comment/Comment';
import TagCarousel from '../components/TagCarousel';

const ListPosts = () => {
  const { ready, posts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.adminPublicationName);
    const subscription2 = Meteor.subscribe(Comments.adminPublicationName);
    const rdy = subscription.ready() && subscription2.ready();
    const postItems = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
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
        <TagCarousel />
      </Row>
      <Row>
        <Col md={11}> {/* Adjust the size (md={11}) as per your layout requirement */}
          {posts.map((post) => {
            const relatedComments = comments.filter(comment => comment.uniqueId === post._id);
            return (
              <div key={post._id} className="mb-4">
                <PostItem post={post} comments={relatedComments || []} />
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListPosts;
