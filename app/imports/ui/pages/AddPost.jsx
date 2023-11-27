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
import UploadWidget from './UploadWidget'; // Assuming this is the correct import for UploadWidget

const AddPost = () => {
  const [initialValues, setInitialValues] = useState({ name: 'John' }); // Initial values for the form
  const [cloudinaryUrl, setCloudinaryUrl] = useState(''); // State for cloudinary URL
  const fRef = useRef(null); // Reference to the form

  useEffect(() => {
    // Generate a unique ID for the post when the component mounts
    setInitialValues(prevValues => ({
      ...prevValues,
      uniqueId: Random.id(8),
    }));
  }, []);

  const formSchema = new SimpleSchema({
    uniqueId: String,
    name: String,
    image: String,
    caption: String,
  });

  // Create an instance of RegExpMatcher for obscenity check
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (data) => {
    const { name, image, caption } = data;
    const imageUrl = cloudinaryUrl || image; // Use cloudinaryUrl if available

    if (matcher.hasMatch(caption)) {
      swal('Error', 'Caption contains obscene content', 'error');
      return;
    }

    const owner = Meteor.user().username;
    const uniqueId = Random.id(8);

    // Insert the post into the collection
    Posts.collection.insert(
      { uniqueId, name, image: imageUrl, caption, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Post added successfully', 'success');
          fRef.current?.reset(); // Reset the form
        }
      },
    );
  };

  return (
    <div id={PageIDs.addPostPage}>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h2 className="text-center">Add Post</h2>
            <AutoForm ref={fRef} schema={bridge} model={initialValues} onSubmit={data => submit(data)}>
              <Card>
                <Card.Body>
                  <TextField name="uniqueId" readOnly />
                  <TextField name="name" />
                  <TextField name="image" />
                  <UploadWidget setUrl={setCloudinaryUrl} /> {/* Integrated UploadWidget */}
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
