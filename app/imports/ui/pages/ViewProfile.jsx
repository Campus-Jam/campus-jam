import React from 'react';
import { Button, Card, Col, Container, Image, Nav, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './ViewProfileStyle.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ComponentIDs } from '../utilities/ids';
import { isValidArtist } from '../components/ArtistCard';
import LoadingSpinner from '../components/LoadingSpinner';

const artistEntrySchema = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  image: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  instruments: PropTypes.arrayOf(PropTypes.string),
  skillLevel: PropTypes.string,
  bio: PropTypes.string,
  _id: PropTypes.string,
});

const ViewProfile = ({ artistEntry }) => ((isValidArtist(artistEntry)) ? (
  <div className="viewProfile">
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
              <Button className="editProfileButton">
                <Nav.Link
                  className="EditProfileStyle.css"
                  as={NavLink}
                  id={ComponentIDs.createJamSession}
                  to="/editProfile"
                  key="editProfile"
                >
                  Add Jam Session
                </Nav.Link>
              </Button>
            </Col>
          </Row>
        </Col>
      </Card>
    </Container>
  </div>
) :
  <LoadingSpinner />
);

ViewProfile.propTypes = {
  artistEntry: artistEntrySchema,
}.isRequired;

export default ViewProfile;
