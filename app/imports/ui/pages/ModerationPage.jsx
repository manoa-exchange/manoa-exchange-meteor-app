import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import { Reports } from '../../api/report/Report';
import PostItem from '../components/PostItem';

const ModerationPage = () => {
  const { ready, reports } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Reports.userPublicationName);

    const rdy = subscription.ready() && subscription2.ready();

    const postArr2 = Reports.collection.find({}).fetch();
    return {
      reports: postArr2,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container className="mb-4">
        <Row className="mt-4">
          <Col lg={4}>
            <Card className="mb-4 border border-black">
              <Card.Header as="h3" className="text-center">Reported Posts</Card.Header>
            </Card>
            <Container className="mt-4 d-column justify-content-center text-center">
              {reports.map((post) => (
                <Col key={post._id} lg={3} className="px-3">
                  <div className="post-and-comments mx-4 py-3">
                    <Row>
                      <Col>
                        <PostItem post={post} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ModerationPage;
