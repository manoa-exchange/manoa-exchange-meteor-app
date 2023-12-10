import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Random } from 'meteor/random';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { BiChat, BiHeart } from 'react-icons/bi';
import { FaFlag } from 'react-icons/fa';
import { Heart } from 'react-bootstrap-icons';
import UploadWidget from '../components/UploadWidget';
import { Posts } from '../../api/post/Post';
import { Profiles } from '../../api/profile/Profile';
import { PageIDs } from '../utilities/ids';
import { Comments } from '../../api/comment/Comment';

const AddPost = () => {
  const { profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Posts.userPublicationName);
    const subscription3 = Meteor.subscribe(Comments.userPublicationName); // Example subscription, adjust as needed

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const profileData = Profiles.collection.find({}).fetch();
    const postData = Posts.collection.find({}).fetch();
    const commentData = Comments.collection.find({}).fetch(); // Fetch comments, adjust as needed

    return {
      profiles: profileData,
      posts: postData,
      comments: commentData,
      ready: rdy,
    };
  }, []);

  const [initialValues, setInitialValues] = useState({ name: 'Name', image: '../public/images/default-profile.jpg' });
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
    const uniqueId = Random.id(8);

    Posts.collection.insert(
      {
        uniqueId,
        name,
        image: imageUrl,
        caption,
        owner,
        createdAt: new Date(), // Manually set the date
      },
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

  const userProfile = profiles.find(profile => profile.owner === Meteor.user().username);

  return (
    <div id={PageIDs.addPostPage}>
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
                      {userProfile && (
                        <Image src={userProfile.profilePicture} alt="Profile" className="profile-img" />
                      )}
                    </div>
                  </Col>
                  <Col className="profile-name">
                    <strong>{userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Unknown User'}</strong>
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
