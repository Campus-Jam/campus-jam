import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ArtistCard = ({ artistEntry }) => (
  <Card className="h-100">

    <Card.Header>
      <Card.Title>{artistEntry.firstName} {artistEntry.lastName}</Card.Title>
      <Image src={artistEntry.image} width={75} />
    </Card.Header>

    <Card.Body>
      <Card.Text>
        Genre: {artistEntry.genres}
        Instruments: {artistEntry.instruments}, {artistEntry.skillLevel}
        Bio: {artistEntry.bio}
      </Card.Text>
    </Card.Body>

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
