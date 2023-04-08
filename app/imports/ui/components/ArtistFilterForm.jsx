import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../pages/BrowseArtistsStyle.css';

const instruments = [
  'Guitar', 'Ukulele', 'Vocals', 'Bass Guitar', 'Drums', 'Piano', 'Violin',
];

const genres = [
  'Blues', 'Psychedelic Rock', 'Hawaiian', 'Reggae', 'Funk', 'Jazz', 'Soul',
  'Rock', 'Pop', 'Indie', 'Classical', 'Folk', 'World', 'Metal', 'Punk', 'R&B',
];

const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

const ArtistFilterForm = ({ filter, setFilter }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const clearFilters = () => {
    setFilter({ instrument: '', genre: '', skillLevel: '' });
  };

  return (
    <div className="filter-form-container">
      <Form>
        <Form.Group controlId="filterInstrument">
          <Form.Label className="filterLabel">Instrument</Form.Label>
          <Form.Control as="select" name="instrument" value={filter.instruments} onChange={handleInputChange}>
            <option value="">Any</option>
            {instruments.map((instrument, index) => (
              <option key={index} value={instrument}>{instrument}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterGenre">
          <Form.Label className="filterLabel">Genre</Form.Label>
          <Form.Control as="select" name="genre" value={filter.genres} onChange={handleInputChange}>
            <option value="">Any</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterSkillLevel">
          <Form.Label className="filterLabel">Skill Level</Form.Label>
          <Form.Control as="select" name="skillLevel" value={filter.skillLevel} onChange={handleInputChange}>
            <option value="">Any</option>
            {skillLevels.map((skillLevel, index) => (
              <option key={index} value={skillLevel}>{skillLevel}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button onClick={clearFilters} className="filterClearButton">Clear</Button>
        </div>
      </Form>
    </div>
  );
};

ArtistFilterForm.propTypes = {
  filter: PropTypes.shape({
    instruments: PropTypes.string,
    genres: PropTypes.string,
    skillLevel: PropTypes.string,
  }),
  setFilter: PropTypes.func,
};

ArtistFilterForm.defaultProps = {
  filter: {
    instrument: '',
    genre: '',
    skillLevel: '',
  },
  setFilter: () => {},
};

export default ArtistFilterForm;
