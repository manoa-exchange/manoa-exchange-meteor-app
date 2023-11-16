import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signInPage" fluid className="bg-light text-center" style={{ minHeight: '80vh' }}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col xs={14} md={9} lg={7}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="my-4" style={{ minHeight: '500px' }}>
              <Card.Body>
                <h2 className="text-center mb-4"><strong> Welcome Back</strong></h2>
                <Row>
                  <Col md={12} className="mb-3 text-center">
                    <Image
                      src="https://clt.manoa.hawaii.edu/wp-content/uploads/2016/08/Manoa-seal-297x300.png"
                      alt="Sample photo"
                      className="rounded-start"
                      fluid
                      style={{ width: '150px', height: '150px' }}
                    />
                  </Col>
                </Row>
                <Row className="offset-md-4">
                  <Col md={6} className="g-0 text-center">
                    <TextField name="email" placeholder="UH E-mail address" style={{ marginBottom: '15px' }} label={false} />
                    <TextField name="password" placeholder="Password" type="password" style={{ marginBottom: '15px' }} label={false} />
                    <ErrorsField />
                    <p>Not a member?
                      {' '}
                      Register
                      <Link to="/signup"> here</Link>
                    </p>
                    <Col className="text-center">
                      <SubmitField />
                    </Col>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>

          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Sign in was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
