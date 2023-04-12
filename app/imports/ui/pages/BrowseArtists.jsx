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
import '../../helperFunctions';

// const getUniqueInstruments = (instr) => {
//   unique_instruments = set()
//   for user in instruments.find():
//   unique_instruments.add(user['instrument'])
//   return unique_instruments
// };
//
// const getUniqueGenres = (artists) => {
//   const genres = new Set();
//   artists.forEach((artist) => artist.genres.forEach((genre) => genres.add(genre)));
//   return Array.from(genres);
// };
//
// const getUniqueSkillLevels = (artists) => {
//   const skillLevels = new Set();
//   artists.forEach((artist) => skillLevels.add(artist.skillLevel));
//   return Array.from(skillLevels);
// };

const BrowseArtists = () => {
  // const [showFilter, setShowFilter] = useState(false);
  // const [filter, setFilter] = useState({ instrument: '', genre: '', skillLevel: '' });

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, artists, genres, instruments } = useTracker(() => {
    const subscription = Meteor.subscribe(Artists.userPublicationName);
    const rdy = subscription.ready();
    const artistItems = Artists.collection.find().fetch();
    const genreItems = Artists.collection.find().fetch();
    const instrumentItems = Artists.collection.find().fetch();
    return {
      artists: artistItems,
      genres: genreItems,
      instruments: instrumentItems,
      ready: rdy,
    };
  }, []);

  // const handleFilterClick = () => {
  //   setShowFilter(!showFilter);
  // };
  //
  // const uniqueInstruments = getUniqueInstruments(instruments);
  // const uniqueGenres = getUniqueGenres(genres);
  // const uniqueSkillLevels = getUniqueSkillLevels(artists);

  return (ready ? (
    <div className="browseArtist">
      <Container className="py-3">

        {/* FILTER BUTTON */}
        {/* <div> */}
        {/*  <Button onClick={handleFilterClick} className="filterButton"> */}
        {/*    <Filter size="24px" /> */}
        {/*  </Button> */}
        {/*  {showFilter && ( */}
        {/*    <ArtistFilterForm */}
        {/*      filter={filter} */}
        {/*      setFilter={setFilter} */}
        {/*      instruments={uniqueInstruments} */}
        {/*      genres={uniqueGenres} */}
        {/*      skillLevels={uniqueSkillLevels} */}
        {/*    /> */}
        {/*  )} */}
        {/* </div> */}

        {/* ARTIST CARDS */}
        <div className="artist-grid">
          {/*{artists*/}
          {/*  .filter((artist) => {*/}
          {/*    if (filter.instrument && !artist.instruments.includes(filter.instrument)) {*/}
          {/*      return false;*/}
          {/*    }*/}
          {/*    if (filter.genre && !artist.genres.includes(filter.genre)) {*/}
          {/*      return false;*/}
          {/*    }*/}
          {/*    return !(filter.skillLevel && artist.skillLevel !== filter.skillLevel);*/}
          {/*  })*/}
            .map((artist) => (
              <div key={artist._id}>
                <ArtistCard artistEntry={artist} />
              </div>
            {/*)*/}
            {/*)}*/}
        </div>

      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );
};

export default BrowseArtists;
