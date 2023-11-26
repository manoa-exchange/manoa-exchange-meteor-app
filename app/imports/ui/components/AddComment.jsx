import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Comments } from '../../api/comment/Comment';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  comment: String,
  owner: String,
  uniqueId: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddComment page for adding a comment. */
const AddComment = ({ owner, uniqueId }) => {
  console.log('AddComment props:', { owner, uniqueId });
  // On submit, insert the data.
  const submit = (data, formRef) => {
    console.log('uniqueId received in AddComment:', uniqueId);
    console.log('owner received in AddComment:', owner);
    console.log('Inserting data into CommentsCollection:', data);
    Comments.collection.insert(
      { comment: data.comment, uniqueId, createdAt: new Date(), owner },
      (error) => {
        if (error) {
          console.log('Inserting data into CommentsCollection2:', data);
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h4>Add Timestamped Comment</h4></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="comment" />
                <SubmitField />
                <ErrorsField />
                <HiddenField name="owner" value={owner} />
                <HiddenField name="uniqueId" value={uniqueId} />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  uniqueId: PropTypes.string,
};

AddComment.defaultProps = {
  uniqueId: '',
};

export default AddComment;
