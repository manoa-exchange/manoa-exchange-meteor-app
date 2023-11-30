import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../api/report/Report';
import PostItemAdmin from '../components/PostItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/post/Post';
import { Comments } from '../../api/comment/Comment';
import { Profiles } from '../../api/profile/Profile';
import NavBar from '../components/NavBar';
import { PageIDs } from '../utilities/ids';

const ModerationPage = () => {
  const { ready, posts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const subscription2 = Meteor.subscribe(Reports.userPublicationName);
    const subscription3 = Meteor.subscribe(Comments.userPublicationName); // Example subscription, adjust as needed

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const profileData = Profiles.collection.find({}).fetch();
    const reportData = Reports.collection.find({}).fetch();
    const postData = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
    const commentData = Comments.collection.find({}).fetch(); // Fetch comments, adjust as needed

    return {
      profiles: profileData,
      reports: reportData,
      posts: postData,
      comments: commentData,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <div id={PageIDs.moderationPage}>
      <NavBar />
      <Container className="py-3">
        <Row className="text-center">
          <Col>
            <Card className="mb-4 border border-black">
              <Card.Header as="h3" className="text-center">Reported Posts</Card.Header>
            </Card>
          </Col>
        </Row>
        <Container className="py-3">
          <Col md={12}> {/* Adjust the size (md={12}) as per your layout requirement */}
            {posts.map((post) => {
              const relatedComments = comments && comments.filter(comment => comment.uniqueId === post._id);
              return (
                <div key={post._id} className="mb-4"> {/* Add margin-bottom for spacing between posts */}
                  <PostItemAdmin
                    post={post}
                    comments={relatedComments || []} // Pass an empty array if comments are not available
                  />
                </div>
              );
            })}
          </Col>
        </Container>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default ModerationPage;
