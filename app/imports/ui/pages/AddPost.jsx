import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { Posts } from '../../api/post/Post';

const AddPost = () => {
  const [initialValues] = useState({ name: 'John' }); // Prefilled name

  const formSchema = new SimpleSchema({
    uniqueId: { type: String, optional: true },
    name: { type: String, optional: true },
    image: { type: String, optional: true },
    caption: String,
  });

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (data, formRef) => {
    const { name, image, caption } = data;
    if (matcher.hasMatch(caption)) {
      swal('Error', 'Caption contains obscene content', 'error');
      return; // Do not submit the form if caption is obscene
    }
    const owner = Meteor.user().username;

    // Generate a random 8-digit unique ID
    let uniqueId;
    let attempts = 0;
    do {
      uniqueId = Random.id(8); // Generate an 8-character random ID
      attempts++;
    } while (Posts.collection.findOne({ uniqueId }) && attempts < 10); // Check if the ID already exists, limit attempts to avoid an infinite loop

    if (attempts === 10) {
      swal('Error', 'Failed to generate a unique ID. Please try again.', 'error');
      return;
    }

    Posts.collection.insert(
      { uniqueId, name, image, caption, owner },
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
                <TextField name="uniqueId" readOnly />
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
