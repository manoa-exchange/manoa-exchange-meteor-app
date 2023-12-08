import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post.js';
import { Tags } from '../../api/tags/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem'; // Import the Contact component here (make sure the path is correct)
import { Comments } from '../../api/comment/Comment';
import { Link } from 'react-router-dom';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const ListPosts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts, comments, tags } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.adminPublicationName);
    const subscription2 = Meteor.subscribe(Comments.adminPublicationName);
    const subscription3 = Meteor.subscribe(Tags.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    // Get the Contact documents
    const postItems = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
    const tagLabel = Tags.collection.find({}).fetch();
    // Get the Note documents
    const commentItems = Comments.collection.find({}).fetch();
    return {
      posts: postItems,
      comments: commentItems,
      tags: tagLabel,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        {tags.map((tag) => (
          <Col key={tag._id} md={2} className="mb-3">
            <Link to={`/filter/${tag.name}`} style={{ textDecoration: 'none' }}>
              <Button variant="success" block>
                {tag.name}
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
      <Col md={11}> {/* Adjust the size (md={12}) as per your layout requirement */}
        {posts.map((post) => {
          const relatedComments = comments && comments.filter(comment => comment.uniqueId === post._id);
          return (
            <div key={post._id} className="mb-4"> {/* Add margin-bottom for spacing between posts */}
              <PostItem
                post={post}
                comments={relatedComments || []} // Pass an empty array if comments are not available
              />
            </div>
          );
        })}
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListPosts;
