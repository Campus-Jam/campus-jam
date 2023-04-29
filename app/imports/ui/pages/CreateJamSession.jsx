import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { Button, Card, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { Artists, skillLevels } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import LoadingSpinner from '../components/LoadingSpinner';
import './CreateJamSessionStyle.css';
import { globalSelectStyle } from '../utilities/ReactSelectStyle';
import { linkEmailToGig } from '../../startup/both/collectionHelpers';
import 'react-datepicker/dist/react-datepicker.css';

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
    setFormData({ instruments: [], genres: [], title: '', image: '', date: null, skillLevel: '', venue: '', about: '' });
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
                <Form key={formResetKey} onSubmit={handleSubmit} autocomplete="off">

                  {/* TITLE */}
                  <Row>
                    <Col>
                      <Form.Label>Title<span className="required-field">*</span></Form.Label>
                      <Form.Control name="title" onChange={handleInputChange} required />
                    </Col>

                    {/* DATE */}
                    <Col>
                      <Form.Label>Date<span className="required-field">*</span></Form.Label>
                      <DatePicker
                        name="date"
                        selected={formData.date}
                        onChange={date => setFormData({ ...formData, date })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select date and time"
                        className="datePickerStyle"
                        required
                      />
                    </Col>

                    {/* SKILL LEVEL */}
                    <Col>
                      <Form.Label>Skill Level<span className="required-field">*</span></Form.Label>
                      <Select
                        options={SkillLevelOptions}
                        isSearchable
                        styles={globalSelectStyle}
                        onChange={(selected) => setFormData({ ...formData, skillLevel: selected.value })}
                        required
                      />
                    </Col>
                  </Row>

                  <Row className="pt-lg-5">
                    {/* IMAGE URL */}
                    <Col xs={6}>
                      <Form.Label>Image URL<span className="required-field">*</span></Form.Label>
                      <Form.Control name="image" onChange={handleInputChange} required />
                    </Col>

                    {/* VENUE */}
                    <Col xs={6}>
                      <Form.Label>Venue<span className="required-field">*</span></Form.Label>
                      <InputGroup>
                        <FormControl name="venue" onChange={handleInputChange} required />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row>
                    {/* INSTRUMENTS */}
                    <Col xs={6}>
                      <Form.Label>Instrument(s)<span className="required-field">*</span></Form.Label>
                      <Creatable
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
                        required
                      />
                    </Col>

                    {/* GENRES */}
                    <Col xs={6}>
                      <Form.Label>Genre(s)<span className="required-field">*</span></Form.Label>
                      <Creatable
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
                        required
                      />
                    </Col>
                  </Row>

                  {/* ABOUT */}
                  <Row>
                    <Col>
                      <Form.Label>About<span className="required-field">*</span></Form.Label>
                      <Form.Control name="about" onChange={handleInputChange} placeholder="Description of Jam Session" required />
                    </Col>
                  </Row>

                  {/* NOTE */}
                  <Row>
                    <h9>* indicates required field</h9>
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
