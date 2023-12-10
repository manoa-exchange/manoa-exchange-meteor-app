import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../api/report/Report';
import PostItemAdmin from '../components/PostItemAdmin'; // Assuming this component exists
import LoadingSpinner from '../components/LoadingSpinner';
import { Comments } from '../../api/comment/Comment';
import NavBar from '../components/NavBar';
import { PageIDs } from '../utilities/ids';

const ModerationPage = () => {
  const { ready, posts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Reports.userPublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);

    const rdy = subscription.ready() && subscription2.ready();

    return {
      posts: Reports.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
      comments: Comments.collection.find().fetch(), // Assuming you want to fetch comments
      ready: rdy,
    };
  }, []);

  const renderPosts = (PostComponent) => (
    posts.map((post) => {
      const relatedComments = comments.filter(comment => comment.uniqueId === post._id);
      return (
        <div key={post._id} className="mb-4">
          <PostComponent
            post={post}
            comments={relatedComments || []}
          />
        </div>
      );
    })
  );

  return (
    <div id={PageIDs.moderationPage}>
      <NavBar />
      {ready ? (
        <Container className="py-3">
          <Row className="text-center">
            <Col>
              <Card className="mb-4 border border-black">
                <Card.Header as="h3" className="text-center">Reported Posts</Card.Header>
              </Card>
            </Col>
          </Row>
          <Col md={12}>
            {renderPosts(PostItemAdmin)}
          </Col>
        </Container>
      ) : <LoadingSpinner />}
    </div>
  );
};

export default ModerationPage;
