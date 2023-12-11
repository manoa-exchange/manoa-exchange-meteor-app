import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams, Link } from 'react-router-dom';

import { Posts } from '../../api/post/Post.js';
import { Tags } from '../../api/tags/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem'; // Import the Contact component here (make sure the path is correct)
import { Comments } from '../../api/comment/Comment';
import { PostTags } from '../../api/post/PostTags';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const FilterPost = () => {
  const { name } = useParams();

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
    console.log(name);
    const allTags = PostTags.collection.find({}).fetch();
    console.log(allTags);
    const tagColFilter = { tag: name };
    // Find documents in the PostTags collection with a specific tag
    const tagCol = PostTags.collection.find(tagColFilter).fetch();
    console.log(tagCol);

    // Extract uniqueIds from the found documents
    const uniqueIds = tagCol.map(tag => tag.uniqueId);
    console.log(uniqueIds);

    // Fetch posts based on the uniqueIds
    const postItems = Posts.collection.find(
      { uniqueId: { $in: uniqueIds } },
      { sort: { createdAt: -1 } },
    ).fetch();
    console.log('showing posts');
    console.log(postItems);
    const tagLabel = Tags.collection.find({});
    const commentItems = Comments.collection.find({}).fetch();

    return {
      posts: postItems,
      comments: commentItems,
      tags: tagLabel,
      ready: rdy,
    };
  }, [name]); // Include tag1 in the dependency array to trigger reactivity when it changes

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

export default FilterPost;
