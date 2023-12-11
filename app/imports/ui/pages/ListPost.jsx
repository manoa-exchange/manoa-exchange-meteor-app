import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Posts } from '../../api/post/Post.js';
import { Tags } from '../../api/tags/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem';
import { Comments } from '../../api/comment/Comment';

const ListPosts = () => {
  const { ready, posts, comments, tags } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.adminPublicationName);
    const subscription2 = Meteor.subscribe(Comments.adminPublicationName);
    const subscription3 = Meteor.subscribe(Tags.adminPublicationName);
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const postItems = Posts.collection.find({}, { sort: { createdAt: -1 } }).fetch();
    const tagLabel = Tags.collection.find({}).fetch();
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
          <Col key={tag._id} md={2} className="mb-3" style={{ boxShadow: '5px 5px 5px rgba(0,0,0,0.3)' }}>
            <Link to={`/filter/${tag.name}`} style={{ textDecoration: 'none' }}>
              <Button variant="success" block>{tag.name}</Button>
            </Link>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={11}> {/* Adjust the size (md={11}) as per your layout requirement */}
          {posts.map((post) => {
            const relatedComments = comments.filter(comment => comment.uniqueId === post._id);
            return (
              <div key={post._id} className="mb-4">
                <PostItem post={post} comments={relatedComments || []} />
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListPosts;
