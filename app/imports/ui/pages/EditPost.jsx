import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Posts } from '../../api/post/Post';
import LoadingSpinner from '../components/LoadingSpinner';
import NavBar from '../components/NavBar';

const bridge = new SimpleSchema2Bridge(Posts.schema);

const EditPost = () => {
  const { _id } = useParams();

  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Posts.userPublicationName);
    const rdy = subscription.ready();
    const document = Posts.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { name, image, caption } = data;
    Posts.collection.update(_id, { $set: { name, image, caption } }, (outerError) => (outerError ?
      swal('Error', outerError.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

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

  useEffect(() => {
    // Optionally, you can update the ModerationPage's state or data here
    // Example: Fetch the updated list of reported posts and update the state in ModerationPage
    // This is an additional step, and it's not included in this code.
  }, [_id]);

  return ready ? (
    <div>
      <NavBar />
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Edit Post</h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Card>
                <Card.Body>
                  <TextField name="name" />
                  <TextField name="image" />
                  <TextField name="caption" />
                  <div className="d-flex justify-content-between">
                    <SubmitField value="Submit" />
                    {/* Delete Button */}
                    <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
                  </div>
                  <ErrorsField />
                  <HiddenField name="owner" />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default EditPost;
