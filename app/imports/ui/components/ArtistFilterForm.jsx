import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './FilterFormStyle.css';

const ArtistFilterForm = ({
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
    <div className="filterForm">
      <Form>
        <Form.Group controlId="filterInstrument">
          <Form.Label>Instrument</Form.Label>
          <Form.Control as="select" name="instrument" value={filter.instrument} onChange={handleInputChange}>
            <option value="">Any</option>
            {instruments.map((instrument, index) => (
              <option key={index} value={instrument}>{instrument}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterGenre">
          <Form.Label className="filterLabel">Genre</Form.Label>
          <Form.Control as="select" name="genre" value={filter.genre} onChange={handleInputChange}>
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
    instrument: PropTypes.string,
    genre: PropTypes.string,
    skillLevel: PropTypes.string,
  }),
  setFilter: PropTypes.func,
  instruments: PropTypes.arrayOf(PropTypes.string),
  genres: PropTypes.arrayOf(PropTypes.string),
  skillLevels: PropTypes.arrayOf(PropTypes.string),
};

ArtistFilterForm.defaultProps = {
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

export default ArtistFilterForm;
