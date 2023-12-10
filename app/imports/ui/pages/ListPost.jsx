import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/post/Post.js';
import LoadingSpinner from '../components/LoadingSpinner';
import NavBar from '../components/NavBar';
import PostItem from '../components/PostItem'; // Import the Contact component here (make sure the path is correct)
import { Comments } from '../../api/comment/Comment';
import { PageIDs } from '../utilities/ids';
import Search from '../components/Search';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const ListPosts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, posts, comments } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Contact documents
    const postItems = Posts.collection.find({}).fetch();
    // Get the Note documents
    const commentItems = Comments.collection.find({}).fetch();
    return {
      posts: postItems,
      comments: commentItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <div> <NavBar />
      <div id={PageIDs.homePage}>
        <Search />
        <Container className="py-3">
          <Col md={12}>
            {posts.map((post) => {
              const relatedComments = comments && comments.filter(comment => comment.uniqueId === post._id);
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
      </div>
    </div>
  ) : <LoadingSpinner />;
};

export default ListPosts;
