import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';
import './SignXStyle.css';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id={PageIDs.signOutPage} className="d-flex align-items-center justify-content-center h-100 signX">
      <h2>You are signed out.</h2>
    </Col>
  );
};

export default SignOut;
