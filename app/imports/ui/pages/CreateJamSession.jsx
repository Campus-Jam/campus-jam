import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const CreateJamSession = () => {
  <Container>
    <h1> Create a Jam Session</h1>
    <Card>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Disabled input</Form.Label>
          <Form.Control placeholder="Disabled input" disabled />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Disabled input</Form.Label>
          <Form.Control placeholder="Disabled input" disabled />
        </Form.Group>
      </Col>
    </Card>
  </Container>;
};

export default CreateJamSession;
