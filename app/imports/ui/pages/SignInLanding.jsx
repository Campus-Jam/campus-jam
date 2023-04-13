import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { pageStyle } from './pageStyles';
import { AutoForm, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';

const SignInLanding = () => (
  <div style={{ backgroundImage: 'url(/images/background.jpg)' }}>
    <Container className="py-4">
      <Card>
        <Col className="px-4">
          <Row>
            <Container className="p-3">
              <h1 className="text-center">User Profile</h1>
            </Container>
            <Col>
              <Image className="rounded mx-auto d-block" src="/images/headshot.jpg" width="300px" />
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
        </Col>
      </Card>
    </Container>
  </div>
);
export default SignInLanding;
