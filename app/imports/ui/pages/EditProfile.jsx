import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, InputGroup, Button, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditProfileStyle.css';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import { Artists, getUniqueInstruments, getUniqueGenres, skillLevels } from '../../api/artists/Artists';
import LoadingSpinner from '../components/LoadingSpinner';

export const generalSelectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--page-background-color1)',
    color: 'black',
    borderColor: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--page-background-color1)',
    borderColor: 'black',
    borderWidth: '2px',
  }),
  option: () => ({
    color: 'var(--text-color1)',
    ':hover': {
      backgroundColor: 'var(--page-background-color1)',
      color: 'var(--text-color2)',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--page-background-color2)',
    fontsize: '16px',
    fontweight: 'bold',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--text-color1)',
  }),
  singleValue: (provided, state) => {
    let color = 'var(--text-color2)';
    if (state.isDisabled) {
      color = 'var(--text-color2)';
    } else if (state.isSelected) {
      color = 'var(--text-color2)';
    }
    return { ...provided, color };
  },
};

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
    const uniqueInstruments = getUniqueInstruments(artists);
    const instrumentOptions = uniqueInstruments.map((instrument) => ({
      value: instrument,
      label: instrument,
    }));
    return instrumentOptions;
  };

  const getGenreOptions = (artists) => {
    const uniqueGenres = getUniqueGenres(artists);
    const genreOptions = uniqueGenres.map((genre) => ({
      value: genre,
      label: genre,
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
      setFormData((prevData) => ({ ...prevData, [key]: selected }));
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
    });
  };

  const handleSubmitButtonClick = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 1500); // 1500ms
  };

  const handleArrayInputChange = (event, key) => {
    const { value } = event.target;
    const arr = value.split(',').map(v => v.trim());
    setFormData((prevData) => ({ ...prevData, [key]: arr }));
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
                      styles={generalSelectStyle}
                      value={formData.skillLevel && { value: formData.skillLevel, label: formData.skillLevel }}
                      onChange={(selected) => handleSelectChange(selected, 'skillLevel', false)}
                    />
                  </Col>

                </Row> {/* End of Second Row */}

                {/* INSTRUMENTS */}
                <Row>
                  <Form.Label>Instrument(s):</Form.Label>
                  <Select
                    isMulti
                    name="instruments"
                    options={InstrumentOptions}
                    className="multiSelect"
                    styles={generalSelectStyle}
                    value={formData.instruments.map((instrument) => ({
                      value: instrument,
                      label: instrument,
                    }))}
                    onChange={(selected) => handleSelectChange(selected, 'instruments', true)}
                  />
                </Row>

                {/* GENRES */}
                <Row>
                  <Form.Label>Genre(s):</Form.Label>
                  <Select
                    isMulti
                    name="genres"
                    options={GenreOptions}
                    className="multiSelect"
                    styles={generalSelectStyle}
                    value={formData.genres.map((genre) => ({
                      value: genre,
                      label: genre,
                    }))}
                    onChange={(selected) => handleSelectChange(selected, 'genres', true)}
                  />
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

                <Row className="justify-content-end">
                  <Button
                    type="submit"
                    onClick={handleSubmitButtonClick}
                    disabled={submitting}
                  >
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
