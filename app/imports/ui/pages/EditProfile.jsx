import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Dropdown, DropdownButton, InputGroup, Button, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditProfileStyle.css';
import { useTracker } from 'meteor/react-meteor-data';
import { Artists } from '../../api/artists/Artists';

import LoadingSpinner from '../components/LoadingSpinner';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    influences: [],
    instruments: [],
    genres: [],
    skillLevel: '',
    bio: '',
  });

  const { currentArtist, isReady } = useTracker(() => {
    const currentUser = Meteor.user();
    const subscription = Meteor.subscribe(Artists.userPublicationName);
    const rdy = subscription.ready();
    const curr = rdy && currentUser && Artists.collection.findOne({ email: currentUser.emails[0].address });

    return {
      currentArtist: curr,
      isReady: rdy,
    };
  });

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleArrayInputChange = (event, key) => {
    const { value } = event.target;
    const arr = value.split(',').map(v => v.trim());
    setFormData((prevData) => ({ ...prevData, [key]: arr }));
  };

  useEffect(() => {
    if (isReady && currentArtist) {
      setFormData({
        firstName: currentArtist.firstName || '',
        lastName: currentArtist.lastName || '',
        email: currentArtist.email || '',
        image: currentArtist.image || '',
        influences: currentArtist.influences || [],
        instruments: currentArtist.instruments || [],
        genres: currentArtist.genres || [],
        skillLevel: currentArtist.skillLevel || '',
        bio: currentArtist.bio || '',
      });
    }
  }, [isReady, currentArtist?._id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedArtist = {
      ...currentArtist,
      ...formData,
    };

    Meteor.call('artists.update', currentArtist._id, updatedArtist, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } else {
        // eslint-disable-next-line no-console
        console.log('Artist updated successfully!');
      }
    });
  };

  return (isReady ? (
    <div className="editProfile">
      <Container className="justify-content-center">
        <Col>
          <Col className="justify-content-center text-center py-2"><h2>Edit Profile</h2></Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>

                {/* FIRST ROW */}
                <Row>
                  <Col xs={4}>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                      value={formData.firstName}
                      onChange={(event) => handleInputChange(event, 'firstName')}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                      value={formData.lastName}
                      onChange={(event) => handleInputChange(event, 'lastName')}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      value={formData.email}
                      onChange={(event) => handleInputChange(event, 'email')}
                    />
                  </Col>
                </Row>

                {/* SECOND ROW */}
                <Row>
                  <Col xs={6}>
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control
                      value={formData.image}
                      onChange={(event) => handleInputChange(event, 'image')}
                    />
                  </Col>

                  {/* SKILL LEVEL */}
                  <Col xs={4}>
                    <Form.Label>Skill Level:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={formData.skillLevel}
                        onChange={(event) => handleInputChange(event, 'skillLevel')}
                        disabled
                      />
                      <DropdownButton
                        variant="outline-secondary"
                        title={formData.skillLevel || 'Skill Level'}
                        align="end"
                      >
                        <Dropdown.Item onClick={() => handleInputChange({ target: { value: 'Beginner' } }, 'skillLevel')}>Beginner</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleInputChange({ target: { value: 'Intermediate' } }, 'skillLevel')}>Intermediate</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleInputChange({ target: { value: 'Advanced' } }, 'skillLevel')}>Advanced</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Col>
                </Row>

                {/* INSTRUMENTS */}
                <Row>
                  <Form.Label>Instrument(s):</Form.Label>
                  <InputGroup>
                    <FormControl
                      value={formData.instruments.join(', ')}
                      onChange={(event) => handleArrayInputChange(event, 'instruments')}
                    />
                  </InputGroup>
                </Row>

                {/* GENRES */}
                <Row>
                  <Form.Label>Genre(s):</Form.Label>
                  <InputGroup>
                    <FormControl
                      value={formData.genres.join(', ')}
                      onChange={(event) => handleArrayInputChange(event, 'genres')}
                    />
                  </InputGroup>
                </Row>

                {/* INFLUENCES */}
                <Row>
                  <Form.Label>Influences:</Form.Label>
                  <InputGroup>
                    <FormControl
                      value={formData.influences.join(', ')}
                      onChange={(event) => handleArrayInputChange(event, 'influences')}
                    />
                  </InputGroup>
                </Row>

                {/* BIO */}
                <Row>
                  <Col xs={12}>
                    <Form.Label>Biography:</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Text Here"
                      value={formData.bio}
                      onChange={(event) => handleInputChange(event, 'bio')}
                    />
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Button type="submit">Submit</Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );
};

export default EditProfile;
