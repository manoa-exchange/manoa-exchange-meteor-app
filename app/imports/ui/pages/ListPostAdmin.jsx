import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post';
import PostItem from '../components/PostItem';
import CommentSection from '../components/CommentSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';

const ListPostAdmin = () => {
  const { ready, posts } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const fetchedPosts = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();

    // Debug: Log the fetched posts to inspect the order
    console.log('Fetched posts:', fetchedPosts);

    return {
      posts: fetchedPosts,
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

export default ListPostAdmin;
