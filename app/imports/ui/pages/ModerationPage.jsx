import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../api/report/Report';
import PostItemAdmin from '../components/PostItemAdmin'; // Ensure this component exists
import LoadingSpinner from '../components/LoadingSpinner';
import { Comments } from '../../api/comment/Comment';
import NavBar from '../components/NavBar';

const ModerationPage = () => {
  const { ready, reportedPosts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Reports.userPublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);

    const rdy = subscription.ready() && subscription2.ready();

    const commentsData = Comments.collection.find({}).fetch();

    return {
      comments: commentsData,
      ready: rdy,
    };
  }, []);

  return (
    <div id="moderation-page">
      <NavBar />
      <Container className="py-3">
        <Row className="text-center">
          <Col>
            <Card className="mb-4 border border-black">
              <Card.Header as="h3" className="text-center">Reported Posts</Card.Header>
            </Card>
          </Col>
        </Row>
        {ready ? (
          <Container className="py-3">
            <Col md={12}>
              {reportedPosts.map((post) => {
                const relatedComments = comments.filter(comment => comment.uniqueId === post._id);
                return (
                  <div key={post._id} className="mb-4">
                    <PostItemAdmin
                      post={post}
                      comments={relatedComments}
                    />
                  </div>
                );
              })}
            </Col>
          </Container>
        ) : <LoadingSpinner />}
      </Container>
    </div>
  );
};

export default ModerationPage;
