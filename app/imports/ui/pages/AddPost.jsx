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
import NavBar from '../components/NavBar'; // Add back the Navbar component
import UploadWidget from '../components/UploadWidget';
import { Tags } from '../../api/tags/Tags';
import { Profiles } from '../../api/profile/Profile';
import { PostTags } from '../../api/post/PostTags';
import { Interests } from '../../api/interests/Interests'; // Import Interests collection

const AddPost = () => {
  const { profiles, tags, postTags } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Posts.userPublicationName);
    const subscription4 = Meteor.subscribe(Tags.adminPublicationName);
    const subscription5 = Meteor.subscribe(PostTags.adminPublicationName);

    const rdy = subscription.ready() && subscription2.ready();
    const profileData = Profiles.collection.find({}).fetch();
    const postData = Posts.collection.find({}).fetch();
    const tagData = Tags.collection.find({}).fetch();
    const postTagData = PostTags.collection.find({}).fetch();

    return {
      profiles: profileData,
      posts: postData,
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

    Interests.collection.insert(
      {
        uniqueId,
        interest: selectedInterest,
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', `${selectedInterest} added successfully`, 'success');
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

  const userProfile = profiles.find(profile => profile.owner === Meteor.user().username);

  return (
    <div id={PageIDs.addPostPage}>
      <NavBar /> {/* Add back the Navbar component */}
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

          {/* Preview Column */}
          <Col xs={12} md={6}>
            <h3 className="text-center">Preview</h3>
            <Card className="post-card">
              {/* ... (rest of the preview section similar to AddPost1.jsx) */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;
