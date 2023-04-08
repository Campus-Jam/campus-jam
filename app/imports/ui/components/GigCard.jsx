import React from 'react';
import PropTypes from 'prop-types';
import './GigCardStyle.css';
import { Card, Image, ListGroup, Button } from 'react-bootstrap';

// Maximum Length of Attendees that should be displayed
const MAX_CARD_ATTENDEES_LEN = 125;

// Maximum Length of Genre(s) that should be displayed
const MAX_CARD_GENRES_LEN = 125;

// Maximum Length of Genre(s) that should be displayed
const MAX_CARD_INSTRUMENTS_LEN = 125;

// Maximum Length of Genre(s) that should be displayed
const MAX_CARD_VENUE_LEN = 125;

// Maximum Length of About that should be displayed
const MAX_CARD_ABOUT_LEN = 250;

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
const GigCard = ({ gigEntry }) => (
  <Card className="h-100">
    <Card.Header>
      <div className="d-flex justify-content-center">
        <Card.Title>{gigEntry.title}</Card.Title>
      </div>
      <div className="d-flex justify-content-center">
        <Image src={gigEntry.image} height={150} className="image-shadow" />
      </div>
    </Card.Header>

    <ListGroup variant="flush">

      <ListGroup.Item className="d-flex justify-content-between align-items-center attendees">
        <span className="label fw-bold d-flex justify-content-start">Attendees: </span>
        <span className="content">{truncateTo(gigEntry.attendees.join(', '), MAX_CARD_ATTENDEES_LEN)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center date">
        <span className="label fw-bold d-flex justify-content-start">Date: </span>
        <span className="content">{gigEntry.date}</span>
        <span className="label fw-bold d-flex justify-content-start">Skill Level: </span>
        <span className="content">{gigEntry.skillLevel}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center attendees">
        <span className="label fw-bold d-flex justify-content-start">Genre(s): </span>
        <span className="content">{truncateTo(gigEntry.genres.join(', '), MAX_CARD_GENRES_LEN)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center attendees">
        <span className="label fw-bold d-flex justify-content-start">Instruments: </span>
        <span className="content">{truncateTo(gigEntry.instruments.join(', '), MAX_CARD_INSTRUMENTS_LEN)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center venue">
        <span className="label fw-bold d-flex justify-content-start">Venue: </span>
        <span className="content">{truncateTo(gigEntry.venue, MAX_CARD_VENUE_LEN)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between align-items-center about">
        <span className="label fw-bold d-flex justify-content-start">About: </span>
        <span className="content">{truncateTo(gigEntry.about, MAX_CARD_ABOUT_LEN)}</span>
        <span className="joinButtonSpan"><Button className="joinButton">Join</Button></span>
      </ListGroup.Item>

      {/* <ListGroup.Item className="d-flex justify-content-between align-items-center attendees"> */}
      {/*  <span className="label fw-bold d-flex justify-content-start">Skill Level: </span> */}
      {/*  <span className="content">{gigEntry.skillLevel}</span> */}
      {/* </ListGroup.Item> */}

      {/* <ListGroup.Item className="d-flex justify-content-between align-items-center attendees"> */}
      {/*  <span className="label fw-bold d-flex justify-content-start">Genre(s): </span> */}
      {/*  <span className="content">{gigEntry.genres.join(', ')}</span> */}
      {/* </ListGroup.Item> */}

    </ListGroup>

  </Card>
);

GigCard.propTypes = {
  gigEntry: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
    attendees: PropTypes.arrayOf(PropTypes.string),
    skillLevel: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    instruments: PropTypes.arrayOf(PropTypes.string),
    venue: PropTypes.string,
    about: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default GigCard;
