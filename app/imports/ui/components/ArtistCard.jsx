import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ArtistCardStyle.css';
import { Button, Card, Image, ListGroup } from 'react-bootstrap';
import { FaSkullCrossbones } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteUserAndLinks } from '../../startup/both/collectionHelpers';

// Maximum Length of Genres that should be displayed
const MAX_CARD_GENRES_LEN = 25;
// Maximum Length of Instruments that should be displayed
const MAX_CARD_INSTRUMENTS_LEN = 25;
// Maximum Length of Bio that should be displayed
const MAX_CARD_BIO_LEN = 135;
// A function used to truncate card data to a length specified by maxlen
const truncateTo = (data, maxlen) => {
  if (!data || data.length <= maxlen) {
    return data;
  }
  const truncatedData = data.slice(0, maxlen);
  const lastWord = truncatedData.lastIndexOf(' ');
  const truncatedDataWord = truncatedData.slice(0, lastWord);
  return `${truncatedDataWord}...`;
};

const artistEntrySchema = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  image: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  instruments: PropTypes.arrayOf(PropTypes.string),
  skillLevel: PropTypes.string,
  bio: PropTypes.string,
  _id: PropTypes.string,
});

export const isValidArtist = (artistToValidate) => !!(artistToValidate &&
    artistToValidate.firstName &&
    Array.isArray(artistToValidate.genres) &&
    Array.isArray(artistToValidate.instruments) &&
    artistToValidate.skillLevel);

const ArtistCard = ({ artistEntry, userRole }) => {

  const [imageSrc, setImageSrc] = useState(artistEntry.image);
  const defaultImageSrc = '/images/profileImagePlaceholder.png';
  const handleImageError = () => {
    setImageSrc(defaultImageSrc);
  };

  if (!isValidArtist(artistEntry)) {
    return null;
  }

  const isAdmin = userRole === 'admin';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserAndLinks(artistEntry._id);
    }
  };

  return (
    <div className="artistCard">
      <Link to={`/viewProfile/${artistEntry.email}`} className="artistCardLink">
        <Card className="h-100">

          {/* ADMIN DELETE BUTTON */}
          <div className="adminDeleteButton">
            {isAdmin && (
              <Button
                variant="danger"
                className="justify-content-center delUser"
                onClick={handleDelete}
              >
                <FaSkullCrossbones />
              </Button>
            )}
          </div>

          <Card.Header>
            {/* FIRST AND LAST NAME */}
            <div className="d-flex justify-content-center">
              <Card.Title>{artistEntry.firstName} {artistEntry.lastName}</Card.Title>
            </div>
            {/* IMAGE */}
            <div className="d-flex justify-content-center">
              <Image
                src={imageSrc}
                height={100}
                className="image-shadow"
                onError={handleImageError}
              />
            </div>
          </Card.Header>
          <ListGroup variant="flush">

            {/* GENRES */}
            <ListGroup.Item className="d-flex justify-content-between align-items-center genres">
              <span className="label fw-bold d-flex justify-content-start">Genre(s): </span>
              <span className="content">{truncateTo(artistEntry.genres.join(', '), MAX_CARD_GENRES_LEN)}</span>
            </ListGroup.Item>

            {/* INSTRUMENTS */}
            <ListGroup.Item className="d-flex justify-content-between align-items-center instruments">
              <span className="label fw-bold d-flex justify-content-start">Instrument(s): </span>
              <span className="content">{truncateTo(artistEntry.instruments.join(', '), MAX_CARD_INSTRUMENTS_LEN)}</span>
            </ListGroup.Item>

            {/* SKILL LEVEL */}
            <ListGroup.Item className="d-flex justify-content-between align-items-center skillLevel">
              <span className="label fw-bold d-flex justify-content-start">Skill Level: </span>
              <span className="content">{artistEntry.skillLevel}</span>
            </ListGroup.Item>

            {/* BIO */}
            <ListGroup.Item className="d-flex justify-content-between align-items-start bio">
              <div className="label fw-bold d-flex justify-content-start">Bio:</div>
              <br />
              {truncateTo(artistEntry.bio, MAX_CARD_BIO_LEN)}
            </ListGroup.Item>

          </ListGroup>

        </Card>
      </Link>
    </div>
  );
};

ArtistCard.propTypes = {
  artistEntry: artistEntrySchema,
  userRole: PropTypes.string,
}.isRequired;

export default ArtistCard;
