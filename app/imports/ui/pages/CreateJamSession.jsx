import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { PageIDs } from '../utilities/ids';

const CreateJamSession = () => (
  <div id={PageIDs.createJamSessionPage} style={{ backgroundImage: 'url(/images/background.jpg)' }}>
    <Container>
      <br />
      <Card className="py-4">
        <div className="px-4">
          <h1 className="text-center"> Create a Jam Session</h1>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Attendees</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Attendees"/>
                <Form.Label>About</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="About"/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control placeholder="Venue"/>
                <Form.Label>Date</Form.Label>
                <Form.Control placeholder="Date"/>
                <Form.Label>Genre(s):</Form.Label>
                <Form.Control placeholder="Venue"/>
                <Form.Label>Instruments:</Form.Label>
                <Form.Control placeholder="Instruments"/>
              </Form.Group>
            </Col>
          </Row>
          <Row><Button>Submit</Button></Row>
        </div>
      </Card>
      <br />
    </Container>
  </div>
);

export default CreateJamSession;
