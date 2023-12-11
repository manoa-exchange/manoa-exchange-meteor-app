import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { SavedPosts } from '../../api/savepost/SavePost';
import PostItem from '../components/PostItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Comments } from '../../api/comment/Comment';
import NavBar from '../components/NavBar';

const ListSavedPost = () => {
  const { ready, posts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(SavedPosts.userPublicationName);
    const subscription2 = Meteor.subscribe(Comments.userPublicationName);

    const rdy = subscription.ready() && subscription2.ready();

    return {
      posts: SavedPosts.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
      ready: rdy,
    };
  }, []);

  return ready ? (
    <div><NavBar />
      <Container className="py-3">
        <Col md={12}> {/* Adjust the size (md={12}) as per your layout requirement */}
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
    </div>
  ) : <LoadingSpinner />;
};

export default ListSavedPost;
