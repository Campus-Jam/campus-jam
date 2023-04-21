import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditProfileStyle.css';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { globalSelectStyle } from '../utilities/ReactSelectStyle';
import { Artists, getUniqueInstruments, getUniqueGenres, skillLevels } from '../../api/artists/Artists';
import LoadingSpinner from '../components/LoadingSpinner';

const SUBMIT_BUTTON_TIMEOUT_MS = 1000;

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

  const [submitting, setSubmitting] = useState(false);

  const { currentArtist, allArtists, isReady } = useTracker(() => {
    const artistsSub = Meteor.subscribe(Artists.userPublicationName);
    const currentUser = Meteor.user();
    const artists = Artists.collection.find().fetch();
    const rdy = artistsSub.ready();
    const curr = rdy && currentUser && Artists.collection.findOne({ email: currentUser.emails[0].address });

    return {
      currentArtist: curr,
      allArtists: artists,
      isReady: rdy,
    };
  });

  const getSkillLevelOptions = (skLvls) => skLvls.map((sl) => ({
    value: sl,
    label: sl,
  }));

  const getInstrumentOptions = (artists) => {
    const instrumentOptions = getUniqueInstruments(artists).map((instrument) => ({
      value: instrument, // Use the instrument itself as the value
      label: instrument, // Use the instrument itself as the label
    }));
    return instrumentOptions;
  };

  const getGenreOptions = (artists) => {
    const genreOptions = getUniqueGenres(artists).map((genre) => ({
      value: genre, // Use the genre itself as the value
      label: genre, // Use the genre itself as the label
    }));
    return genreOptions;
  };

  const SkillLevelOptions = getSkillLevelOptions(skillLevels);
  const InstrumentOptions = getInstrumentOptions(allArtists);
  const GenreOptions = getGenreOptions(allArtists);

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSelectChange = (selected, key, isMulti = false) => {
    if (isMulti) {
      if (Array.isArray(selected)) {
        setFormData((prevData) => ({
          ...prevData,
          [key]: selected.map((item) => item.value),
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [key]: [],
        }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [key]: selected.value }));
    }
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
    setSubmitting(true);

    const updatedArtist = {
      ...currentArtist,
      ...formData,
      instruments: formData.instruments.map((instrument) => (instrument && instrument.value ? instrument.value : instrument)),
      genres: formData.genres.map((genre) => (genre && genre.value ? genre.value : genre)),
    };

    Meteor.call('artists.update', currentArtist._id, updatedArtist, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } else {
        // eslint-disable-next-line no-console
        console.log('Artist updated successfully!');
      }
      setTimeout(() => {
        setSubmitting(false);
      }, SUBMIT_BUTTON_TIMEOUT_MS);
    });
  };

  return (isReady ? (
    <div className="createJamSession">
      <Container className="justify-content-center pb-3">
        <Col>
          <Col className="justify-content-center text-center py-2">
            <h2>Edit Profile</h2>
          </Col>

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
                      type="text"
                      required
                      isInvalid={!formData.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your first name.
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                      value={formData.lastName}
                      onChange={(event) => handleInputChange(event, 'lastName')}
                      required
                      isInvalid={!formData.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your last name.
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      value={formData.email}
                      onChange={(event) => handleInputChange(event, 'email')}
                      required
                      isInvalid={!formData.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your last email.
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                {/* SECOND ROW */}
                <Row>
                  {/* IMAGE URL */}
                  <Col>
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control
                      value={formData.image}
                      onChange={(event) => handleInputChange(event, 'image')}
                    />
                  </Col>

                  {/* SKILL LEVEL */}
                  <Col>
                    <Form.Label>Skill Level:</Form.Label>
                    <Select
                      options={SkillLevelOptions}
                      className="singleSelect"
                      styles={globalSelectStyle}
                      value={formData.skillLevel && { value: formData.skillLevel, label: formData.skillLevel }}
                      onChange={(selected) => handleSelectChange(selected, 'skillLevel', false)}
                    />
                  </Col>
                </Row> {/* End of Second Row */}

                {/* INSTRUMENTS */}
                <Row>
                  <Col xs={6}>
                    <Form.Label>Instrument(s):</Form.Label>
                    <Creatable
                      isMulti
                      name="instruments"
                      options={InstrumentOptions}
                      className="multiSelect"
                      styles={globalSelectStyle}
                      value={[...formData.instruments].map((instrument) => ({
                        value: instrument,
                        label: instrument,
                      }))}
                      onChange={(selected) => handleSelectChange(selected, 'instruments', true)}
                    />
                  </Col>

                  {/* GENRES */}
                  <Col>
                    <Form.Label>Genre(s):</Form.Label>
                    <Creatable
                      isMulti
                      name="genres"
                      options={GenreOptions}
                      className="multiSelect"
                      styles={globalSelectStyle}
                      value={formData.genres.map((genre) => ({
                        value: genre,
                        label: genre,
                      }))}
                      onChange={(selected) => handleSelectChange(selected, 'genres', true)}
                    />
                  </Col>
                </Row>

                {/* INFLUENCES */}
                <Row>
                  <Form.Label>Influences:</Form.Label>
                  <Col>
                    <Creatable
                      isMulti
                      name="influences"
                      options={[]}
                      className="multiSelect"
                      styles={globalSelectStyle}
                      value={formData.influences.map((influence) => ({
                        value: influence,
                        label: influence,
                      }))}
                      onChange={(selected) => handleSelectChange(selected, 'influences', true)}
                    />
                  </Col>
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

                {/* SUBMIT BUTTON */}
                <Row className="justify-content-end">
                  <Button type="submit" disabled={submitting} className={submitting ? 'isSubmitting' : ''}>
                    {submitting ? 'Please wait...' : 'Submit'}
                  </Button>
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
