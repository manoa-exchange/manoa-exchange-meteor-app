import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { SavedPosts } from '../../api/savepost/SavePost';
import PostItem from '../components/PostItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import { Posts } from '../../api/post/Post';
import { Comments } from '../../api/comment/Comment';

const ListSavedPost = () => {
  const { ready, posts, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const subscription2 = Meteor.subscribe(SavedPosts.userPublicationName);
    const subscription3 = Meteor.subscribe(Comments.userPublicationName); // Example subscription, adjust as needed

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const profileData = Profiles.collection.find({}).fetch();
    const savePostData = SavedPosts.collection.find({}).fetch();
    const postData = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
    const commentData = Comments.collection.find({}).fetch(); // Fetch comments, adjust as needed

    return {
      profiles: profileData,
      savedPosts: savePostData,
      posts: postData,
      comments: commentData,
      ready: rdy,
    };
  }, []);

  return ready ? (
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
  ) : <LoadingSpinner />;
};

export default ListSavedPost;
