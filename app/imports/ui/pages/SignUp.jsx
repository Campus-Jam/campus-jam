import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import './SignUpStyle.css';

const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToRef, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    verifyPassword: {
      type: String,
      custom() {
        if (this.value !== this.field('password').value) {
          return 'passwordMismatch';
        }
        return undefined; // add this line
      },
    },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (createUserErr) => {
      if (createUserErr) {
        setError(createUserErr.reason);
      } else {
        setError('');
        Meteor.call('artists.create', email, (callErr) => {
          if (callErr) {
            setError(callErr.reason);
          } else {
            setRedirectToRef(true);
          }
        });
      }
    });
  };

  // if correct authentication, redirect to editprofile page
  if (redirectToRef) {
    return (<Navigate to="/editprofile" />);
  }
  return (
    <div id={PageIDs.signUpPage} className="signUp">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Col className="text-center">
            <h2 style={{ paddingTop: '120px' }}>Sign up for Jamb-UH-ree</h2>
            <p>Start connecting with fellow musicians today.</p>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="card">
              <Card.Body>
                <TextField id={ComponentIDs.signUpFormEmail} name="email" placeholder="E-mail address" />
                <TextField id={ComponentIDs.signUpFormPassword} name="password" placeholder="Password" type="password" />
                <TextField id={ComponentIDs.signUpFormVerifyPassword} name="verifyPassword" placeholder="Verify Password" type="password" />
                <ErrorsField />
                <SubmitField id={ComponentIDs.signUpFormSubmit} value="Sign Up" />
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
              {error === 'passwordMismatch' ? 'Passwords do not match' : error}
            </Alert>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
