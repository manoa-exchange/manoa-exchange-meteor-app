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
import { PageIDs } from '../utilities/ids';

const AddPost = () => {
  const [initialValues] = useState({ name: 'John', uniqueId: '' });

  const formSchema = new SimpleSchema({
    uniqueId: { type: String, optional: true },
    name: { type: String, optional: true },
    image: { type: String, optional: true },
    caption: String,
  });

  // ... rest of your code remains the same

  let fRef = null;
  return (
    <div id={PageIDs.addPostPage}>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h2 className="text-center" style={{ color: 'white', fontWeight: 'bold' }}>Add Post</h2>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} model={initialValues} onSubmit={data => submit(data, fRef)}>
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
