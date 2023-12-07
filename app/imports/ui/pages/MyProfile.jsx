import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import { PageIDs } from '../utilities/ids';
/** Renders a color-blocked static landing page. */
import { Posts } from '../../api/post/Post';
import { Comments } from '../../api/comment/Comment';
import PostItem from '../components/PostItem';
import NavBar from '../components/NavBar';

const MyProfile = () => {
  const { ready, posts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Posts.userPublicationName);
    const subscription3 = Meteor.subscribe(Comments.userPublicationName); // Example subscription, adjust as needed
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const profileData = Profiles.collection.find({}).fetch();
    const postData = Posts.collection.find({}).fetch();
    const commentData = Comments.collection.find({}).fetch(); // Fetch comments, adjust as needed

    return {
      profiles: profileData,
      posts: postData,
      comments: commentData,
      ready: rdy,
    };
  }, []);
  console.log('Posts array:', posts);

  return (ready ? (
    <div id={PageIDs.myProfilePage}>
      <NavBar />
      <Container className="mb-4">
        <Row className="mt-4">
          <Col lg={4}>
            <Card className="mb-4 rounded border border-dark card_profile">
              <Card.Body className="text-center">
                <Card.Img
                /* eslint-disable-next-line max-len */
                  src="https://storage.googleapis.com/pai-images/b2ba992cecf546c0aaff913199206f97.jpeg"
                  alt="avatar"
                  className="rounded-circle border border-dark"
                  style={{ width: '150px', height: '150px' }}
                  fluid
                />
                <h3 className="mb-1 mt-3">Insert User Name</h3>
                <p className="text-muted mb-4">idNumber</p>
              </Card.Body>
            </Card>
            <Card className="mb-4 mt-4 border border-dark">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">Cao Cao</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">example@example.com</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="mb-4 border border-black">
              <Card.Header as="h3" className="text-center">Recent Posts</Card.Header>
            </Card>
            <Container className="py-3">
              <Row className="justify-content-center">
                <Col>
                  <Col className="text-center">
                    <Container className="py-3">
                      <Col md={12}> {/* Adjust the size (md={12}) as per your layout requirement */}
                        {posts.map((post) => {
                          const relatedComments = comments.filter(comment => comment.uniqueId === post._id);
                          return (
                            <div key={post._id} className="mb-4">
                              <PostItem post={post} comments={relatedComments} />
                            </div>
                          );
                        })}
                      </Col>
                    </Container>
                  </Col>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default MyProfile;
