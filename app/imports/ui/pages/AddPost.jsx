import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { Posts } from '../../api/post/Post';
import { PageIDs } from '../utilities/ids';
import NavBar from '../components/NavBar';
import UploadWidget from '../components/UploadWidget';
import { Tags } from '../../api/tags/Tags';
import { PostTags } from '../../api/post/PostTags';

const AddPost = () => {
  const { tags } = useTracker(() => {
    const subscription4 = Meteor.subscribe(Tags.adminPublicationName);
    const rdy = subscription4.ready();
    const tagData = Tags.collection.find({}).fetch();
    return {
      tags: tagData,
      ready: rdy,
    };
  }, []);

  const [initialValues, setInitialValues] = useState({ name: 'Name', image: 'Image Filler' });
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const fRef = useRef(null);

  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      uniqueId: Random.id(8),
    }));
  }, []);

  const formSchema = new SimpleSchema({
    uniqueId: String,
    name: String,
    image: String,
    caption: {
      type: String,
      optional: true,
    },
    tag: {
      type: String,
      optional: true,
    },
  });

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const handleCloudinaryUrlUpdate = (url) => {
    setCloudinaryUrl(url);
    setIsImageUploaded(!!url);
  };

  const handleCaptionChange = (value) => {
    setCaption(value);
  };

  const submit = (data) => {
    const { name, image, caption, tag } = data;
    const imageUrl = cloudinaryUrl || image;

    if (!isImageUploaded) {
      swal('Error', 'Please upload an image before submitting', 'error');
      return;
    }

    if (matcher.hasMatch(caption)) {
      swal('Error', 'Caption contains obscene content', 'error');
      return;
    }

    const owner = Meteor.user().username;
    const uniqueId = Random.id(8);

    PostTags.collection.insert(
      {
        uniqueId,
        tag: selectedTag,
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', `${selectedTag} added successfully`, 'success');
        }
      },
    );

    Tags.collection.insert(
      {
        uniqueId,
        tag: selectedTag, // Assuming interests are associated with tags
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', `${selectedTag} added successfully`, 'success');
        }
      },
    );

    Posts.collection.insert(
      {
        uniqueId,
        name,
        image: imageUrl,
        caption,
        owner,
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Post added successfully', 'success');
          fRef.current?.reset(); // Reset the form
          setIsImageUploaded(false); // Reset the image upload state
        }
      },
    );
  };

  return (
    <div id={PageIDs.addPostPage}>
      <NavBar />
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Add Post</h2>
            <AutoForm
              ref={fRef}
              schema={bridge}
              model={initialValues}
              onSubmit={data => submit(data)}
              onChangeModel={(model) => setCaption(model.caption)}
            >
              <Card>
                <Card.Body>
                  <UploadWidget setUrl={handleCloudinaryUrlUpdate} name="image" />
                  <TextField
                    name="caption"
                    value={caption}
                    onChange={handleCaptionChange}
                  />
                  <Form.Select
                    aria-label="Default select example"
                    name="tag"
                    defaultValue=""
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Open this select menu
                    </option>
                    {tags.map((tag, index) => (
                      <option key={index} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </Form.Select>
                  <SubmitField value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>

          <Col xs={12} md={6}>
            <h3 className="text-center">Preview</h3>
            <Card className="post-card">
              <Card.Img variant="top" src={cloudinaryUrl || initialValues.image} alt="Preview" />
              <Card.Body>
                <Card.Title>{initialValues.name}</Card.Title>
                <Card.Text>{caption}</Card.Text>
                {/* Add other post details as needed */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;
