import React from 'react';
import { Card, Col, Container, Row, Dropdown, DropdownButton, InputGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// import { AutoForm, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
// import { pageStyle } from './pageStyles';

const EditProfile = () => (
  <Container className="justify-content-center">
    <Col>
      <Col className="justify-content-center text-center py-3"><h2>Your Profile</h2></Col>
      <Card>
        <Card.Body>
          <Row className="py-2">
            <Col xs={4}>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="Enter First Name" />
            </Col>
            <Col xs={4}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Enter Last Name" />
            </Col>
            <Col xs={4}>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="Enter Email Address" disabled />
            </Col>
          </Row>
          <Row className="py-2">
            <Col xs={6}>
              <Form.Label>Image</Form.Label>
              <Form.Control placeholder="Enter Image Link" />
            </Col>
            <Col xs={6}>
              <Form.Label>Influences</Form.Label>
              <Form.Control placeholder="Enter Influences" />
            </Col>
          </Row>
          <Row className="py-2">
            <Col xs={4}>
              <Form.Label>Instruments</Form.Label>
              <InputGroup>
                <Form.Control placeholder="Enter Instruments" />

                <DropdownButton
                  variant="outline-secondary"
                  title="Instruments"
                  align="end"
                >
                  <Dropdown.Item href="#">Guitar</Dropdown.Item>
                  <Dropdown.Item href="#">Drums</Dropdown.Item>
                  <Dropdown.Item href="#">Piano</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Col>
            <Col xs={4}>
              <Form.Label>Genres</Form.Label>
              <InputGroup>
                <Form.Control placeholder="Enter Genres" />

                <DropdownButton
                  variant="outline-secondary"
                  title="Genres"
                  align="end"
                >
                  <Dropdown.Item href="#">RnB</Dropdown.Item>
                  <Dropdown.Item href="#">Jazz</Dropdown.Item>
                  <Dropdown.Item href="#">Classical</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Col>
            <Col xs={4}>
              <Form.Label>Skill Level</Form.Label>
              <InputGroup>
                <Form.Control placeholder="Enter Skill Level" />

                <DropdownButton
                  variant="outline-secondary"
                  title="Skill Level"
                  align="end"
                >
                  <Dropdown.Item href="#">Beginner</Dropdown.Item>
                  <Dropdown.Item href="#">Intermediate</Dropdown.Item>
                  <Dropdown.Item href="#">Expert</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Label>Biography/Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Text Here" />
            </Col>
          </Row>
          <Row className="justify-content-center py-3" >
            <Button>Submit</Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Container>
);
export default EditProfile;
