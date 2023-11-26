import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import { PageIDs } from '../utilities/ids';
/** Renders a color-blocked static landing page. */
import { Posts } from '../../api/post/Post';
import PostItem from '../components/PostItem';
import AddComment from '../components/AddComment';

const MyProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Posts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Profile documents
    const profileI = Profiles.collection.find({}).fetch();
    const postArr = Posts.collection.find({}).fetch();
    return {
      profiles: profileI,
      posts: postArr,
      ready: rdy,
    };
  }, []);
  console.log('Posts array:', posts);

  return (ready ? (
    <div id={PageIDs.myProfilePage}>
      <Container className="mb-4">
        <Row className="mt-4">
          <Col lg={4}>
            <Card className="mb-4 rounded border border-dark">
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
                <p className="text-muted mb-4">Insert Campus/Location</p>
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
            <Card>
              <Card.Header>Insert Post Topic</Card.Header>
              <Card.Body>
                <Card.Title>Insert Post Title</Card.Title>
                <Card.Text>
                  Insert Post Text
                </Card.Text>
              </Card.Body>
            </Card>
            <Container className="mt-4">
              {/* {profiles.map((profile) => (<Col key={contact._id}><Contact contact={contact} notes={notes.filter(note => (note.contactId === contact._id))}/> </Col>))} */}
            </Container>
          </Col>
        </Row>
      </Container>

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
                <p className="text-muted mb-4">Insert Campus/Location</p>
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
            <Container className="mt-4 d-column justify-content-center text-center">
              {posts.map((post, index) => (
                index % 2 === 0 && (
                  <Row key={index / 2} className="mb-4">
                    <Col>
                      <div className="post-and-comments mx-4">
                        <Row>
                          <Col>
                            <PostItem post={post} />
                          </Col>
                        </Row>
                        <Row>
                          {post && <AddComment postId={post._id} owner={post.owner} uniqueId={post.uniqueId} />}
                        </Row>
                      </div>
                    </Col>
                    {index + 1 < posts.length && (
                      <Col>
                        <div className="post-and-comments mx-4">
                          <Row>
                            <Col>
                              <PostItem post={posts[index + 1]} />
                            </Col>
                          </Row>
                          <Row>
                            {posts[index + 1] && <AddComment postId={posts[index + 1]._id} owner={posts[index + 1].owner} uniqueId={posts[index + 1].uniqueId} />}
                          </Row>
                        </div>
                      </Col>
                    )}
                  </Row>
                )
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default MyProfile;
