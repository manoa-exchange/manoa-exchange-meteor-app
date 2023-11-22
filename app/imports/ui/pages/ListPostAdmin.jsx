import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Posts } from '../../api/post/Post';
import PostItemAdmin from '../components/PostItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <PostItemAdmin.jsx> to render each row. */
const ListPostAdmin = () => {
  const [deleteAdmin, setDeleteAdmin] = useState(false);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { posts, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Posts.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Posts.collection.find({}).fetch();
    return {
      posts: items,
      ready: rdy,
    };
  }, []);

  const deletePost = (postId) => {
    setDeleteAdmin(true);
    Meteor.call('posts.remove', postId, (error) => {
      setDeleteAdmin(false);
      if (error) {
        console.error('Error deleting post:', error);
      }
    });
  };
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>List Post (Admin)</h2></Col>
          <Table striped bordered hover>
            <tbody>
              {posts.map((post) => (
                <PostItemAdmin key={post.uniqueId} post={post}>
                  <td>
                    <Button variant="danger" onClick={() => deletePost(post.uniqueId)} disabled={deleteAdmin}>
                      Delete
                    </Button>
                  </td>
                </PostItemAdmin>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListPostAdmin;
