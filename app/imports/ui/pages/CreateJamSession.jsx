import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Select from 'react-select';
import { Button, Card, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Form from 'react-bootstrap/Form';
import { Artists, skillLevels } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import LoadingSpinner from '../components/LoadingSpinner';
import './CreateJamSessionStyle.css';
import { globalSelectStyle } from '../utilities/ReactSelectStyle';
import { linkEmailToGig } from '../../startup/both/collectionHelpers';

const SUBMIT_BUTTON_TIMEOUT_MS = 1000;

const CreateJamSession = () => {
  const [formData, setFormData] = useState({
    instruments: [],
    genres: [],
  });

  const [submitting, setSubmitting] = useState(false);

  const [formResetKey, setFormResetKey] = useState('');

  const { ready, allArtists } = useTracker(() => {
    const artSub = Meteor.subscribe(Artists.userPublicationName);
    const gigSub = Meteor.subscribe(Gigs.userPublicationName);
    const rdy = artSub.ready() && gigSub.ready();
    const artistItems = Artists.collection.find().fetch();
    return {
      allArtists: artistItems,
      ready: rdy,
    };
  }, []);

  const handleFormReset = () => {
    setFormData({ instruments: [], genres: [], title: '', image: '', date: '', skillLevel: '' });
    setFormResetKey(Date.now().toString());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, image, date, skillLevel, genres, instruments, venue, about } = formData;
    setSubmitting(true);
    Meteor.call('gigs.insert', title, image, date, skillLevel, genres, instruments, venue, about, (error, result) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        handleFormReset();
      } else {
        // eslint-disable-next-line no-console
        console.log(result);
        handleFormReset();
      }

      const currentUser = Meteor.user();
      const currentUserEmail = currentUser.emails[0].address;
      console.log(currentUserEmail);
      linkEmailToGig(currentUserEmail, formData.title);
      // const currentUser = Meteor.user();
      // const currentUserEmail = currentUser.emails[0].address;
      // linkEmailToGig(currentUserEmail, formData.title);

      setTimeout(() => {
        setSubmitting(false);
      }, SUBMIT_BUTTON_TIMEOUT_MS);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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

  const SkillLevelOptions = skillLevels.map(level => ({ value: level, label: level }));
  const InstrumentOptions = allArtists ? allArtists.map(artist => artist.instruments).flat().filter((instrument, index, arr) => arr.indexOf(instrument) === index).map(instrument => ({ value: instrument, label: instrument })) : [];
  const GenreOptions = allArtists ? allArtists.map(artist => artist.genres).flat().filter((genre, index, arr) => arr.indexOf(genre) === index).map(genre => ({ value: genre, label: genre })) : [];

  return (
    ready ? (
      <div className="createJamSession">
        <Container className="justify-content-center">
          <Col>
            <Col className="justify-content-center text-center py-2">
              <h2>Create A Jam Session</h2>
            </Col>

            <Card>
              <Card.Body>
                <Form key={formResetKey} onSubmit={handleSubmit}>

                  <Row>
                    <Col>
                      <Form.Label>Title</Form.Label>
                      <Form.Control name="title" onChange={handleInputChange} />
                    </Col>

                    <Col>
                      <Form.Label>Date:</Form.Label>
                      <Form.Control name="date" onChange={handleInputChange} />
                    </Col>

                    <Col>
                      <Form.Label>Skill Level:</Form.Label>
                      <Select
                        options={SkillLevelOptions}
                        isSearchable
                        styles={globalSelectStyle}
                        onChange={(selected) => setFormData({ ...formData, skillLevel: selected.value })}
                      />
                    </Col>
                  </Row>

                  <Row>
                    {/* IMAGE URL */}
                    <Col xs={6}>
                      <Form.Label>Image URL:</Form.Label>
                      <Form.Control name="image" onChange={handleInputChange} />
                    </Col>

                    {/* VENUE */}
                    <Col xs={6}>
                      <Form.Label>Venue:</Form.Label>
                      <InputGroup>
                        <FormControl name="venue" onChange={handleInputChange} />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row>
                    {/* INSTRUMENTS */}
                    <Col xs={6}>
                      <Form.Label>Instrument(s):</Form.Label>
                      <Select
                        isMulti
                        name="instruments"
                        options={allArtists && allArtists.length > 0 ? InstrumentOptions : []}
                        className="multiSelect"
                        styles={globalSelectStyle}
                        value={formData.instruments.map((instr) => ({
                          value: instr,
                          label: instr,
                        }))}
                        onChange={(selected) => handleSelectChange(selected, 'instruments', true)}
                      />
                    </Col>

                    {/* GENRES */}
                    <Col xs={6}>
                      <Form.Label>Genre(s):</Form.Label>
                      <Select
                        isMulti
                        name="genres"
                        options={allArtists && allArtists.length > 0 ? GenreOptions : []}
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

                  {/* ABOUT */}
                  <Row>
                    <Col>
                      <Form.Label>About:</Form.Label>
                      <Form.Control name="about" onChange={handleInputChange} />
                    </Col>
                  </Row>

                  {/* SUBMIT BUTTON */}
                  <Row className="justify-content-center">
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
    ) : (
      <LoadingSpinner />
    )

  );
};

export default CreateJamSession;
