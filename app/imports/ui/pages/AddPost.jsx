import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Image, Row, Form } from 'react-bootstrap';
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
import { Tags } from '../../api/tags/Tags';
import { PostTags } from '../../api/post/PostTags';

const AddPost = () => {
  const { profiles, tags, postTags } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Posts.userPublicationName);
    const subscription3 = Meteor.subscribe(Comments.userPublicationName); // Example subscription, adjust as needed
    const subscription4 = Meteor.subscribe(Tags.adminPublicationName);
    const subscription5 = Meteor.subscribe(PostTags.adminPublicationName);

    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const profileData = Profiles.collection.find({}).fetch();
    const postData = Posts.collection.find({}).fetch();
    const commentData = Comments.collection.find({}).fetch(); // Fetch comments, adjust as needed
    const tagData = Tags.collection.find({}).fetch();
    const postTagData = PostTags.collection.find({}).fetch();

    return {
      profiles: profileData,
      posts: postData,
      comments: commentData,
      tags: tagData,
      postTags: postTagData,
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
    const { name, image, tag } = data;
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
    console.log('Inserting Tag');
    PostTags.collection.insert(
      {
        uniqueId,
        tag: selectedTag,
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'PostTag added successfully', 'success');
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
        createdAt: new Date(), // Manually set the date
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
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
                  <Form.Select
                    aria-label="Default select example"
                    name="tag"
                    defaultValue=""
                    value={selectedTag} // Set the value to the state
                    onChange={(e) => setSelectedTag(e.target.value)} // Update the state on change
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
