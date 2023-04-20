import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Card, Col, Container, Image, Nav, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './ViewProfileStyle.css';
import { NavLink, useParams } from 'react-router-dom';
import { ComponentIDs } from '../utilities/ids';
import { Artists } from '../../api/artists/Artists';
import LoadingSpinner from '../components/LoadingSpinner';

const ViewProfile = () => {
  const { id } = useParams();
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Artists.userPublicationName);
    const rdy = subscription.ready();
    return {
      ready: rdy,
    };
  }, []);
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const artistToView = Artists.collection.findOne({ email: id });
  return (ready ? (
    <div className="viewProfile">
      <Container className="py-4">
        <Card className="card">
          <Col className="px-4">
            <Row>
              <Container className="p-3">
                <h1 className="text-center"> User Profile </h1>
              </Container>
              <Col>
                <Image className="rounded mx-auto d-block" src={artistToView.image} width="300px" />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder={artistToView.firstName} disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder={artistToView.lastName} disabled />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder={id} disabled />
                    <br />
                    <Form.Label>Music Skill</Form.Label>
                    <Form.Control placeholder={artistToView.skillLevel} disabled />
                  </Form.Group>
                </Row>
              </Col>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Biography</Form.Label>
                  <Form.Control as="textarea" placeholder={artistToView.bio} disabled />
                  <br />
                  <Row>
                    <Col>
                      <Form.Label>Jam Session</Form.Label>
                      <Form.Control as="textarea" placeholder="Disabled input" disabled />
                    </Col>
                    <Col>
                      <Form.Label>Instrument Played</Form.Label>
                      <Form.Control as="textarea" placeholder={artistToView.instruments.join(', ')} disabled />
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
            </Row>
            <Row>
              <Col className="p-3">
                { currentUser === id && (
                  <Button className="editProfileButton">
                    <Nav.Link
                      className="EditProfileStyle.css"
                      as={NavLink}
                      id={ComponentIDs.createJamSession}
                      to="/editProfile"
                      key="editProfile"
                    >
                      Edit Profile
                    </Nav.Link>
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Card>
      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );
};
export default ViewProfile;
