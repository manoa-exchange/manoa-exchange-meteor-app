import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import { PageIDs } from '../utilities/ids';
/** Renders a color-blocked static landing page. */
import { Posts } from '../../api/post/Post';
import { Comments } from '../../api/comment/Comment';
import PostItem from '../components/PostItem';
import '../css/PostItem.css';

const MyProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts, comments, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    const subscription2 = Meteor.subscribe(Posts.adminPublicationName);
    const subscription3 = Meteor.subscribe(Comments.adminPublicationName);

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();

    const profileData = Profiles.collection.find({}).fetch();
    const postData = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
    const commentData = Comments.collection.find({}).fetch(); // Fetch comments, adjust as needed

    return {
      profiles: profileData,
      posts: postData,
      comments: commentData,
      ready: rdy,
    };
  }, []);


  const userProfile = profiles.find(profile => profile.owner === Meteor.user().username);
  return (ready ? (
    <div id={PageIDs.myProfilePage}>
      <Container className="mb-4">
        <Row className="mt-4">
          <Col lg={4}>
            <Card className="mb-4 rounded border border-dark card_profile">
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-4">
                  <Card.Img
                    src={userProfile?.profilePicture}
                    alt="avatar"
                    className="rounded-circle border border-dark"
                    style={{ width: '150px', height: '150px' }}
                    fluid
                  />
                </div>
                <Link to="/uploadWidget">Profile Picture</Link>
                <h3 className="mb-1 mt-3">{userProfile?.firstName || 'Insert Name'} {userProfile?.lastName || 'Insert Name'}</h3>
                <div className="d-flex justify-content-center mb-2">
                  <Button>Follow</Button>
                </div>
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
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">(097) 234-5678</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Mobile</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">(098) 765-4321</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Address</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mb-4 mb-lg-0 card border border-dark red">
              <Card.Body className="p-0 card1">
                <ListGroup flush className="rounded-3 red">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3 red">
                    <Card.Text>Insert Number Of Posts Made</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3 red">
                    <Card.Text>Insert Number Of Posts Favorited</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
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
                              <PostItem
                                post={post}
                                comments={relatedComments || []} // Pass an empty array if comments are not available
                              />
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
