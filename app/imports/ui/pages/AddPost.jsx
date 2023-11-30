import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { BiChat, BiHeart } from 'react-icons/bi';
import { FaFlag } from 'react-icons/fa';
import { Heart } from 'react-bootstrap-icons';
import { PageIDs } from '../utilities/ids';
import UploadWidget from '../components/UploadWidget';
import { Posts } from '../../api/post/Post';
import NavBar from '../components/NavBar';

const AddPost = () => {
  const [initialValues, setInitialValues] = useState({ name: 'Name', image: 'Image Filler' });
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [caption, setCaption] = useState('');
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
    const { name, image } = data;
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
    console.log(imageUrl);
    const uniqueId = Random.id(8);

    Posts.collection.insert(
      { uniqueId, name, image: imageUrl, caption, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Post added successfully', 'success');
          fRef.current?.reset();
          setIsImageUploaded(false);
          setCaption('');
        }
      },
    );
  };

  return (
    <div id={PageIDs.addPostPage}>
      <NavBar />
      <Container className="py-3">
        <Row className="justify-content-center">
          {/* Form Column */}
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
                  <SubmitField value="Submit" />
                  <TextField id="caption-field" name="caption" />
                  <SubmitField id="submit-post" value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>

          {/* Preview Column */}
          <Col xs={12} md={6}>
            <h3 className="text-center">Preview</h3>
            <Card className="post-card">
              <Card.Header id="card-header" className="manoa-white">
                <Row>
                  <Col xs="auto" className="profile-pic-col">
                    <div className="profile-pic">
                      <Image src="path_to_profile_picture.jpg" alt="Profile" className="profile-img" />
                    </div>
                  </Col>
                  <Col>
                    <strong>Name</strong>
                  </Col>
                </Row>
              </Card.Header>
              <Container className="post-image-container">
                <Image src={cloudinaryUrl} alt="Post" fluid />
              </Container>
              <Card.Body id="card-body">
                <div className="interaction-icons">
                  <BiHeart className="like-icon" />
                  <BiChat className="comment-icon" />
                </div>
                <Card.Text>
                  {caption}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="post-footer manoa-white">
                <Container fluid>
                  <Row className="justify-content-around align-items-center">
                    <Col>
                      <strong>Edit</strong>
                    </Col>
                    <Col className="text-center">
                      <Button variant="link">
                        <FaFlag />
                      </Button>
                    </Col>
                    <Col className="text-end">
                      <Button type="button"><Heart /></Button>
                    </Col>
                    <Col>
                      <Button variant="danger">Unsave</Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;
