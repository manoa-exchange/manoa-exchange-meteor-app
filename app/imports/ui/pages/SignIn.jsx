import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
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

    <Container fluid className="bg-light text-center" id={PageIDs.signUpPage}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="my-4">
              <Card.Body>
                <Row>
                  <Col md={5} className="d-none d-md-block">
                    <Image
                      src="https://clt.manoa.hawaii.edu/wp-content/uploads/2016/08/Manoa-seal-297x300.png"
                      alt="Sample photo"
                      className="rounded-start"
                      fluid
                    />
                  </Col>
                  <Col md={6} className="g-0">
                    <h2>Register your account</h2>
                    <Row>
                      <Col md={6}>
                        <TextField wrap="mb-4" id={ComponentIDs.signUpFormFirstName} name="firstName" placeholder="First Name" label={false} />
                      </Col>
                      <Col md={6}>
                        <TextField wrap="mb-4" id={ComponentIDs.signUpFormLastName} name="lastName" placeholder="Last Name" label={false} />
                      </Col>
                    </Row>
                    <TextField id={ComponentIDs.signUpFormEmail} name="email" placeholder="UH E-mail address" label={false} />
                    <TextField id={ComponentIDs.signUpFormPassword} name="password" placeholder="Password" type="password" label={false} />
                    <TextField id={ComponentIDs.signUpFormID} name="idNumber" placeholder="UH ID Number" type="id" label={false} />
                    <ErrorsField />
                    <SubmitField id={ComponentIDs.signUpFormSubmit} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
