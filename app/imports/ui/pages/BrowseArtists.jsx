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

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
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

  return (ready ? (
    <Container className="py-3">

      {/* FILTER BUTTON */}
      <div>
        <Button onClick={handleFilterClick} className="filterButton">
          <Filter size="24px" />
        </Button>
        {showFilter && (
          <ArtistFilterForm filter={filter} setFilter={setFilter} />
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
  ) :
    <LoadingSpinner />
  );
};

export default BrowseArtists;
