import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import { Posts } from '../../api/post/Post';
import { Comments } from '../../api/comment/Comment';
import PostItem from '../components/PostItem';
import '../css/PostItem.css';
import { PageIDs } from '../utilities/ids';

const MyProfile = () => {
  const { ready, posts, comments, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Posts.userPublicationName);
    const subscription3 = Meteor.subscribe(Comments.userPublicationName);

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();

    const profileData = Profiles.collection.find({}).fetch();
    const postData = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
    const commentData = Comments.collection.find({}).fetch();

    return {
      profiles: profileData,
      posts: postData,
      comments: commentData,
      ready: rdy,
    };
  }, []);

  const userProfile = profiles.find(profile => profile.owner === Meteor.user().username);

  return ready ? (
    <div id={PageIDs.myProfilePage}>
      <Container className="mb-4">
        <Row className="mt-4">
          <Col lg={4}>
            <Card className="mb-4 rounded border border-dark card_profile antw">
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src={userProfile?.profilePicture || 'default-avatar-url'}
                    alt="avatar"
                    className="rounded-circle border border-dark"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
                <Link to="/uploadWidget"><Button className="custom-update-button">Add/Edit Profile Picture</Button></Link>
                <h3 className="mb-1 mt-3">{userProfile?.firstName || 'Insert Name'} {userProfile?.lastName || 'Insert Name'}</h3>
                <p className="text-muted mb-4">{userProfile?.idNumber}</p>
              </Card.Body>
            </Card>
            <Card className="mb-4 mt-4 border border-dark antw">
              <Card.Body>
                <Row className="mb-2">
                  <Col sm="3">
                    <Card.Text>Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{userProfile?.firstName || 'Insert Name'} {userProfile?.lastName || 'Insert Name'}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Card.Text>E-mail</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{userProfile?.owner || 'Insert Name'} </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="mb-4 border border-black antw">
              <Card.Header as="h3" className="text-center">Recent Posts</Card.Header>
            </Card>
            {posts.map((post) => {
              const relatedComments = comments.filter(comment => comment.uniqueId === post._id);
              return (
                <Col md={12} key={post._id} className="mb-4">
                  <PostItem
                    post={post}
                    comments={relatedComments || []}
                  />
                </Col>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default MyProfile;
