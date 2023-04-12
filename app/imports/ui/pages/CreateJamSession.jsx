import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Form from 'react-bootstrap/Form';
import { PageIDs } from '../utilities/ids';
import { getUniqueInstruments } from './BrowseArtists';
import { Artists } from '../../api/artists/Artists';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateJamSession = () => {
  const { ready, artists } = useTracker(() => {
    const subscription = Meteor.subscribe(Artists.userPublicationName);
    const rdy = subscription.ready();
    const artistItems = Artists.collection.find().fetch();
    return {
      artists: artistItems,
      ready: rdy,
    };
  }, []);

  const uniqueInstruments = getUniqueInstruments(artists);

  return (ready ? (
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
                  <Form.Control as="textarea" rows={5} placeholder="Attendees" />
                  <Form.Label>About</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="About" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Venue</Form.Label>
                  <Form.Control placeholder="Venue" />
                  <Form.Label>Date</Form.Label>
                  <Form.Control placeholder="Date" />
                  <Form.Label>Genre(s):</Form.Label>
                  <Form.Control placeholder="Genre(s)" />
                  <Form.Label>Instruments:</Form.Label>
                  <Form.Select>
                    {uniqueInstruments.map((instrument, index) => (
                      <option key={index} value={instrument}>
                        {instrument}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row><Button>Submit</Button></Row>
          </div>
        </Card>
      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );

};

export default CreateJamSession;
