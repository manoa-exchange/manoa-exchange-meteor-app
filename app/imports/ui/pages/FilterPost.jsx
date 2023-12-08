import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Posts } from '../../api/post/Post.js';
import { Tags } from '../../api/tags/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem'; // Import the Contact component here (make sure the path is correct)
import { Comments } from '../../api/comment/Comment';
import { PostTags } from '../../api/post/PostTags';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const FilterPosts = () => {
  const { tag1 } = useParams();

  const { ready, posts, comments, tags } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.adminPublicationName);
    const subscription2 = Meteor.subscribe(Comments.adminPublicationName);
    const subscription3 = Meteor.subscribe(Tags.adminPublicationName);
    const subscription4 = Meteor.subscribe(PostTags.adminPublicationName);

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();

    if (!rdy) {
      // Return empty data or a loading indicator when subscriptions are not ready
      return {
        posts: [],
        comments: [],
        tags: [],
        ready: rdy,
      };
    }

    const tagCol = PostTags.collection.find({ tag: tag1 });
    const uniqueIds = tagCol.map(tag => tag.uniqueId);

    const postItems = Posts.collection.find({ uniqueId: { $in: uniqueIds } }, { sort: { createdAt: -1 } }).fetch();
    const tagLabel = Tags.collection.find({}).fetch();
    const commentItems = Comments.collection.find({}).fetch();

    return {
      posts: postItems,
      comments: commentItems,
      tags: tagLabel,
      ready: rdy,
    };
  }, [tag1]); // Include tag1 in the dependency array to trigger reactivity when it changes

  return ready ? (
    <Container className="py-3">
      <Col md={1}>
        {tags.map((tag) => (
          <Link key={tag._id} to={`/filter/${tag.name}`}>
            <Button variant="success">
              {tag.name}
            </Button>
          </Link>
        ))}
      </Col>
      <Col md={11}>
        {posts.map((post) => {
          const relatedComments = comments && comments.filter(comment => comment.uniqueId === post._id);
          return (
            <div key={post._id} className="mb-4">
              <PostItem
                post={post}
                comments={relatedComments || []}
              />
            </div>
          );
        })}
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default FilterPosts;
