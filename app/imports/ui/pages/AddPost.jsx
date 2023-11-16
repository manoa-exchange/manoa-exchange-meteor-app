import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Posts } from '../../api/post/Post';

const AddPost = () => {
  const [initialValues] = useState({ name: 'John' }); // Prefilled name

  const formSchema = new SimpleSchema({
    name: String,
    image: String,
    caption: String,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (data, formRef) => {
    const { name, image, caption } = data;
    const owner = Meteor.user().username;
    Posts.collection.insert(
      { name, image, caption, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <h2 className="text-center">Add Post</h2>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} model={initialValues} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" readOnly />
                <TextField name="image" />
                <TextField name="caption" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
