import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post';
import { Comments } from '../../api/comment/Comment';
import PostItem from '../components/PostItem';
import AddComment from '../components/AddComment';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';

const ListPostAdmin = () => {
  const { ready, posts } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    // Sort posts by 'createdAt' field in descending order (newest first)
    const rdy = subscription.ready();

    const postItems = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();

    const commentItems = Comments.collection.find({}).fetch();
    return {
      posts: postItems,
      comments: commentItems,
      ready: rdy,
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
                  <Col key={post._id}>
                    <AddComment owner={post.owner} uniqueId={post.uniqueId} />
                  </Col>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Container>
    </Row>
  ) : <LoadingSpinner />;
};

export default ListPostAdmin;
