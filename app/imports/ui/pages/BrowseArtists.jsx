import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import './BrowseArtistsStyle.css';
import { Container, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Filter } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import ArtistCard from '../components/ArtistCard';
import ArtistFilterForm from '../components/ArtistFilterForm';
import { Artists } from '../../api/artists/Artists';

export const getUniqueInstruments = (artists) => {
  console.log(artists);
  const instruments = new Set();
  artists.forEach((artist) => artist.instruments.forEach((instrument) => instruments.add(instrument)));
  return Array.from(instruments);
};

export const getUniqueGenres = (artists) => {
  const genres = new Set();
  artists.forEach((artist) => artist.genres.forEach((genre) => genres.add(genre)));
  return Array.from(genres);
};

export const getUniqueSkillLevels = (artists) => {
  const skillLevels = new Set();
  artists.forEach((artist) => skillLevels.add(artist.skillLevel));
  return Array.from(skillLevels);
};

const BrowseArtists = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ instrument: '', genre: '', skillLevel: '' });

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, artists } = useTracker(() => {
    const subscription = Meteor.subscribe(Artists.userPublicationName);
    const rdy = subscription.ready();
    const artistItems = Artists.collection.find().fetch();
    return {
      artists: artistItems,
      ready: rdy,
    };
  }, []);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const uniqueSkillLevels = getUniqueSkillLevels(artists);
  const uniqueInstruments = getUniqueInstruments(artists);
  const uniqueGenres = getUniqueGenres(artists);

  return (ready ? (
    <div className="browseArtist">
      <Container className="py-3">
        {/* FILTER BUTTON */}
        <div>
          <Button onClick={handleFilterClick} className="filterButton">
            <Filter size="24px" />
          </Button>
          {showFilter && (
            <ArtistFilterForm
              filter={filter}
              setFilter={setFilter}
              instruments={uniqueInstruments}
              genres={uniqueGenres}
              skillLevels={uniqueSkillLevels}
            />
          )}
        </div>

        {/* ARTIST CARDS */}
        <div className="artist-grid">
          {artists
            .filter((artist) => {
              if (filter.instrument && !artist.instruments.includes(filter.instrument)) {
                return false;
              }
              if (filter.genre && !artist.genres.includes(filter.genre)) {
                return false;
              }
              return !(filter.skillLevel && artist.skillLevel !== filter.skillLevel);
            })
            .map((artist) => (
              <div key={artist._id}>
                <ArtistCard artistEntry={artist} />
              </div>
            ))}
        </div>

      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );
};

export default BrowseArtists;
