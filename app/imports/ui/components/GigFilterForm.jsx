import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../pages/BrowseArtistsStyle.css';

const GigFilterForm = ({
  filter,
  setFilter,
  instruments,
  genres,
  skillLevels,
}) => {
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

GigFilterForm.propTypes = {
  filter: PropTypes.shape({
    instruments: PropTypes.string,
    genres: PropTypes.string,
    skillLevel: PropTypes.string,
  }),
  setFilter: PropTypes.func,
  instruments: PropTypes.arrayOf(PropTypes.string),
  genres: PropTypes.arrayOf(PropTypes.string),
  skillLevels: PropTypes.arrayOf(PropTypes.string),
};

GigFilterForm.defaultProps = {
  filter: {
    instrument: '',
    genre: '',
    skillLevel: '',
  },
  setFilter: () => {},
  instruments: [],
  genres: [],
  skillLevels: [],
};

export default GigFilterForm;
