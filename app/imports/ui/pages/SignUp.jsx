import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container,Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    idNumber: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container fluid className="bg-light" id={PageIDs.signUpPage}>
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
                        <TextField wrap="mb-4" id={ComponentIDs.signInFormFirstName} name="firstName" placeholder="First Name" />
                      </Col>
                      <Col md={6}>
                        <TextField wrap="mb-4" id={ComponentIDs.signInFormLastName} name="lastName" placeholder="Last Name" />
                      </Col>
                    </Row>
                    <TextField id={ComponentIDs.signUpFormEmail} name="email" placeholder="UH E-mail address" />
                    <TextField id={ComponentIDs.signUpFormPassword} name="password" placeholder="Password" type="password" />
                    <TextField id={ComponentIDs.signInFormID} name="idNumber" placeholder="UH ID Number" type="id" />
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

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
