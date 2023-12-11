import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button, Image } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams, useLocation } from 'react-router-dom';
import { BiChat, BiHeart } from 'react-icons/bi';
import { Posts } from '../../api/post/Post';

const bridge = new SimpleSchema2Bridge(Posts.schema);

const EditPost = () => {
  const { _id } = useParams();
  const location = useLocation();
  const { post } = location.state || {};

  const { doc, ready } = useTracker(() => {
    if (!post) {
      const subscription = Meteor.subscribe(Posts.userPublicationName);
      return {
        doc: Posts.collection.findOne(_id),
        ready: subscription.ready(),
      };
    }
    return { doc: post, ready: true };
  }, [_id, post]);

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Use Promise.all to ensure all delete operations are completed before showing success message
        Promise.all([
          new Promise((resolve) => {
            Meteor.call('posts.delete', _id, (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                resolve();
              }
            });
          }),
          new Promise((resolve) => {
            Meteor.call('saveposts.delete', _id, (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                resolve();
              }
            });
          }),
          new Promise((resolve) => {
            Meteor.call('reports.delete', _id, (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                resolve();
              }
            });
          }),
        ]).then(() => {
          // Delete the post from MyProfilePage (if applicable)
          const isOwner = doc && doc.owner === Meteor.user().username;
          if (isOwner) {
            Meteor.call('posts.deleteFromProfile', _id, (profileError) => {
              if (profileError) {
                console.error('Error deleting post from profile:', profileError.message);
              } else {
                console.log('Post deleted from profile');
              }
            });
          }

          Meteor.call('reports.refresh', (refreshError) => {
            if (refreshError) {
              console.error('Error refreshing reports:', refreshError.message);
            } else {
              console.log('Reports refreshed successfully');
            }
          });

          // Show success message after all operations are completed
          swal('Post deleted!', {
            icon: 'success',
          });
        });
      }
    });
  };

  const submit = (data) => {
    // Exclude createdAt from the update data
    const { caption } = data;
    Posts.collection.update(_id, { $set: { caption } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Edit Post</h2>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card className="post-card">
              <Card.Header className="manoa-white">
                {/* Profile Picture and User Information */}
              </Card.Header>
              <Container className="post-image-container">
                <Image src={doc?.image} alt="Post" fluid />
              </Container>
              <Card.Body>
                <div className="interaction-icons">
                  <BiHeart className="like-icon" />
                  <BiChat className="comment-icon" />
                </div>
                <Card.Text>
                  <TextField
                    name="caption"
                    placeholder="Enter your caption"
                    defaultValue={doc?.caption}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer className="manoa-white">
                <Container fluid> {/* Adding fluid attribute */}
                  <Row className="justify-content-around align-items-center">
                    <Col>
                      <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
                    </Col>
                    <Col className="text-center" />
                    <Col className="text-end" />
                    <Col>
                      <Button variant="primary" type="submit" className="custom-update-button">Update Post</Button>
                      <ErrorsField />
                      <HiddenField name="owner" />
                      <HiddenField name="createdAt" />
                    </Col>
                  </Row>
                </Container>
              </Card.Footer>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : (
    <div>Loading...</div>
  );
};

export default EditPost;
