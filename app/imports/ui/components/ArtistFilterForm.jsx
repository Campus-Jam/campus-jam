import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './FilterFormStyle.css';
import { globalSelectStyle } from '../utilities/ReactSelectStyle';

const ArtistFilterForm = ({
  filter,
  setFilter,
  instruments,
  genres,
  skillLevels,
}) => {
  const handleInputChange = (selectedOption, { name }) => {
    setFilter({ ...filter, [name]: selectedOption ? selectedOption.value : '' });
  };

  const clearFilters = () => {
    setFilter({ instrument: '', genre: '', skillLevel: '' });
  };

  const toSelectOptions = (arr) => arr.map((value) => ({ value, label: value }));

  return (
    <div className="filterForm">
      <Form>
        <Form.Group controlId="filterInstrument">
          <Form.Label>Instrument</Form.Label>
          <Select
            name="instrument"
            styles={globalSelectStyle}
            value={filter.instrument ? { label: filter.instrument, value: filter.instrument } : null}
            onChange={handleInputChange}
            options={[{ value: '', label: 'Any' }, ...toSelectOptions(instruments)]}
          />
        </Form.Group>

        <Form.Group controlId="filterGenre">
          <Form.Label className="filterLabel">Genre</Form.Label>
          <Select
            name="genre"
            styles={globalSelectStyle}
            value={filter.genre ? { label: filter.genre, value: filter.genre } : null}
            onChange={handleInputChange}
            options={[{ value: '', label: 'Any' }, ...toSelectOptions(genres)]}
          />
        </Form.Group>

        <Form.Group controlId="filterSkillLevel">
          <Form.Label className="filterLabel">Skill Level</Form.Label>
          <Select
            name="skillLevel"
            styles={globalSelectStyle}
            value={filter.skillLevel ? { label: filter.skillLevel, value: filter.skillLevel } : null}
            onChange={handleInputChange}
            options={[{ value: '', label: 'Any' }, ...toSelectOptions(skillLevels)]}
          />
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
