import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './SignInLandingStyle.css';

const SignInLanding = () => (
  <div className="signInLandingBackground">
    <Container className="py-4">
      <Card className="card">
        <Col className="px-4">
          <Row>
            <Container className="p-3">
              <h1 className="text-center">User Profile</h1>
            </Container>
            <Col>
              <Image className="rounded mx-auto d-block" src="/images/profileImagePlaceholder.png" width="300px" />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="User" disabled />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="User" disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control placeholder="User@hawaii.edu" disabled />
                  <br />
                  <Form.Label>Music Skill</Form.Label>
                  <Form.Control placeholder="Skill" disabled />
                </Form.Group>
              </Row>
            </Col>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>DescriptionBio</Form.Label>
                <Form.Control as="textarea" placeholder="Disabled input" disabled />
                <br />
                <Row>
                  <Col>
                    <Form.Label>Jam Session</Form.Label>
                    <Form.Control as="textarea" placeholder="Disabled input" disabled />
                  </Col>
                  <Col>
                    <Form.Label>Instrument Played</Form.Label>
                    <Form.Control as="textarea" placeholder="Disabled input" disabled />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
          </Row>
          <Row>
            <Col className="p-3">
              <Button className="editProfileButton" size="lg">Edit Profile</Button>
            </Col>
          </Row>
        </Col>
      </Card>
    </Container>
  </div>
);
export default SignInLanding;
