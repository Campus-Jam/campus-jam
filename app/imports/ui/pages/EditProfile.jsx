import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Dropdown, DropdownButton, InputGroup, Button, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditProfileStyle.css';
import { useTracker } from 'meteor/react-meteor-data';
import { Artists } from '../../api/artists/Artists';

import LoadingSpinner from '../components/LoadingSpinner';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);
  const [influences, setInfluences] = useState([]);
  const [bio, setBio] = useState('');

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

  const handleInputChange = (event, setValue) => {
    const { value } = event.target;
    const arr = value.split(',').map(v => v.trim());
    setValue(arr);
  };

  useEffect(() => {
    if (isReady && currentArtist) {
      setFirstName(currentArtist.firstName || '');
      setLastName(currentArtist.lastName || '');
      setEmail(currentArtist.email || '');
      setImage(currentArtist.image || '');
      setInfluences(currentArtist.influences || []);
      setInstruments(currentArtist.instruments || []);
      setGenres(currentArtist.genres || []);
      setSkillLevel(currentArtist.skillLevel || '');
      setBio(currentArtist.bio || '');
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const artist = {
      firstName,
      lastName,
      email,
      image,
      influences,
      instruments,
      genres,
      skillLevel,
      bio,
    };

    Meteor.call('artists.update', currentArtist._id, artist, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } else {
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
                      value={firstName || currentArtist?.firstName || ''}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                      value={lastName || currentArtist?.lastName || ''}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      value={email || currentArtist?.email || ''}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Col>
                </Row>

                {/* SECOND ROW */}
                <Row>
                  <Col xs={6}>
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control
                      value={image || currentArtist?.image || ''}
                      onChange={(event) => setImage(event.target.value)}
                    />
                  </Col>

                  {/* SKILL LEVEL */}
                  <Col xs={4}>
                    <Form.Label>Skill Level:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={skillLevel || currentArtist?.skillLevel || ''}
                        onChange={(event) => setSkillLevel(event.target.value)}
                        disabled
                      />
                      <DropdownButton
                        variant="outline-secondary"
                        title={skillLevel || currentArtist?.skillLevel || 'Skill Level'}
                        align="end"
                      >
                        <Dropdown.Item onClick={() => setSkillLevel('Beginner')}>Beginner</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSkillLevel('Intermediate')}>Intermediate</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSkillLevel('Advanced')}>Advanced</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Col>
                </Row>

                {/* INSTRUMENTS */}
                <Row>
                  <Form.Label>Instrument(s):</Form.Label>
                  <InputGroup>
                    <FormControl
                      value={instruments.join(', ') || currentArtist?.instruments.join(', ') || ''}
                      onChange={(event) => handleInputChange(event, setInstruments)}
                    />
                  </InputGroup>
                </Row>

                {/* GENRES */}
                <Row>
                  <Form.Label>Genre(s):</Form.Label>
                  <InputGroup>
                    <FormControl
                      value={genres.join(', ') || currentArtist?.genres.join(', ') || ''}
                      onChange={(event) => handleInputChange(event, setGenres)}
                    />
                  </InputGroup>
                </Row>

                {/* INFLUENCES */}
                <Row>
                  <Form.Label>Influences:</Form.Label>
                  <InputGroup>
                    <FormControl
                      value={influences.join(', ') || currentArtist?.influences.join(', ') || ''}
                      onChange={(event) => handleInputChange(event, setInfluences)}
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
                      value={bio || currentArtist?.bio || ''}
                      onChange={(event) => setBio(event.target.value)}
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
