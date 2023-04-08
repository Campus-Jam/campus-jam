import React from 'react';
import PropTypes from 'prop-types';
import './ArtistCardStyle.css';
import { Card, Image, ListGroup } from 'react-bootstrap';

// import { List } from 'react-bootstrap-icons';

// Maximum Length of Genres that should be displayed
const MAX_CARD_GENRES_LEN = 25;

// Maximum Length of Instruments that should be displayed
const MAX_CARD_INSTRUMENTS_LEN = 25;

// Maximum Length of Bio that should be displayed
const MAX_CARD_BIO_LEN = 135;

// A function used to truncate card data to a length specified by maxlen
const truncateTo = (data, maxlen) => {
  if (data.length <= maxlen) {
    return data;
  }
  const truncatedData = data.slice(0, maxlen);
  const lastWord = truncatedData.lastIndexOf(' ');
  const truncatedDataWord = truncatedData.slice(0, lastWord);
  return `${truncatedDataWord}...`;
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ArtistCard = ({ artistEntry }) => (
  <Card className="h-100">
    <Card.Header>
      <div className="d-flex justify-content-center">
        <Card.Title>{artistEntry.firstName} {artistEntry.lastName}</Card.Title>
      </div>
      <div className="d-flex justify-content-center">
        <Image src={artistEntry.image} height={100} className="image-shadow" />
      </div>
    </Card.Header>

    <ListGroup variant="flush">

      <ListGroup.Item className="d-flex justify-content-between align-items-center genres">
        <span className="label fw-bold d-flex justify-content-start">Genre(s): </span>
        <span className="content">{truncateTo(artistEntry.genres.join(', '), MAX_CARD_GENRES_LEN)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center instruments">
        <span className="label fw-bold d-flex justify-content-start">Instrument(s): </span>
        <span className="content">{truncateTo(artistEntry.instruments.join(', '), MAX_CARD_INSTRUMENTS_LEN)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center skillLevel">
        <span className="label fw-bold d-flex justify-content-start">Skill Level: </span>
        <span className="content">{artistEntry.skillLevel}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-start bio">
        <div className="label fw-bold d-flex justify-content-start">Bio:</div>
        <br />
        {truncateTo(artistEntry.bio, MAX_CARD_BIO_LEN)}
      </ListGroup.Item>

    </ListGroup>

  </Card>
);

// Require a document to be passed to this component.
ArtistCard.propTypes = {
  artistEntry: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    genres: PropTypes.string,
    instruments: PropTypes.string,
    skillLevel: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default ArtistCard;
