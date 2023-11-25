import React, { useState, useEffect, useRef } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { Posts } from '../../api/post/Post';
import { PageIDs } from '../utilities/ids';

const AddPost = () => {
  const [initialValues, setInitialValues] = useState({ name: 'John', uniqueId: '' });
  const fRef = useRef(null);

  useEffect(() => {
    // Generate uniqueId when the component mounts
    const generatedUniqueId = Random.id(8);
    setInitialValues(prevState => ({
      ...prevState,
      uniqueId: generatedUniqueId,
    }));
  }, []);

  const formSchema = new SimpleSchema({
    uniqueId: { type: String, optional: true },
    name: { type: String, optional: true },
    image: { type: String, optional: true },
    caption: { type: String, optional: true },
  });

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (data, formRef) => {
    const { name, image, caption } = data;
    let uniqueId = Random.id(8);
    let isUniqueId = false;
    let attempts = 0;

    // Check if the uniqueId is already in use and regenerate if necessary
    while (!isUniqueId && attempts < 10) {
      if (!Posts.collection.findOne({ uniqueId })) {
        isUniqueId = true;
      } else {
        uniqueId = Random.id(8);
        attempts++;
      }
    }

    if (!isUniqueId) {
      swal('Error', 'Unable to generate a unique ID. Please try again.', 'error');
      return;
    }

    if (matcher.hasMatch(caption)) {
      swal('Error', 'Caption contains obscene content', 'error');
      return; // Do not submit the form if caption is obscene
    }
    const owner = Meteor.user().username;

    Posts.collection.insert(
      { uniqueId, name, image, caption, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Post added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  return (
    <div id={PageIDs.addPostPage}>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h2 className="text-center" style={{ color: 'white', fontWeight: 'bold' }}>Add Post</h2>
            <AutoForm ref={fRef} schema={bridge} model={initialValues} onSubmit={data => submit(data, fRef.current)}>
              <Card>
                <Card.Body>
                  <TextField name="uniqueId" readOnly />
                  <TextField name="name" />
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
    </div>
  );
};

export default AddPost;
