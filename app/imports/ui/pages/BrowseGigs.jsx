import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import './BrowseGigsStyle.css';
import { Button, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Filter, Plus } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import GigCard from '../components/GigCard';
import GigFilterForm from '../components/GigFilterForm';
import { Gigs } from '../../api/gigs/Gigs';
import { getUniqueGenres, getUniqueInstruments, getUniqueSkillLevels } from '../../api/artists/Artists';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const BrowseGigs = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ instrument: '', genre: '', skillLevel: '' });

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, gigs, currentUserRole } = useTracker(() => {
    const subscription = Meteor.subscribe(Gigs.userPublicationName);
    const rdy = subscription.ready();
    const gigItems = Gigs.collection.find().fetch();
    const user = Meteor.user();
    const isAdmin = user && Roles.userIsInRole(user._id, 'admin');
    return {
      gigs: gigItems,
      ready: rdy,
      currentUserRole: (isAdmin) ? 'admin' : 'user',
    };
  }, []);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const uniqueInstruments = getUniqueInstruments(gigs);
  const uniqueGenres = getUniqueGenres(gigs);
  const uniqueSkillLevels = getUniqueSkillLevels(gigs);

  return (ready ? (
    <div id={PageIDs.browseGigsPage} className="browseGigs">
      <Container className="py-3">
        {/* FILTER BUTTON */}
        <div>
          <Button
            id={ComponentIDs.browseGigsFilterButton}
            onClick={handleFilterClick}
            className={`filterButton ${showFilter ? 'activeFilterStyle' : ''}`}
          >
            <Filter size="24px" />
          </Button>
          {showFilter && (
            <GigFilterForm
              id={ComponentIDs.browseGigsFilterForm}
              filter={filter}
              setFilter={setFilter}
              instruments={uniqueInstruments}
              genres={uniqueGenres}
              skillLevels={uniqueSkillLevels}
            />
          )}
        </div>

        {/* ADD JAM SESSION BUTTON */}
        <Button className="addJamButton">
          <Plus size="24px" />
        </Button>

        {/* GIG CARDS */}
        <div className="gig-grid">
          {gigs
            .filter((gig) => {
              if (filter.instrument && !gig.instruments.includes(filter.instrument)) {
                return false;
              }
              if (filter.instrument && !gig.instruments.includes(filter.instrument)) {
                return false;
              }
              if (filter.genre && !gig.genres.includes(filter.genre)) {
                return false;
              }
              return !(filter.skillLevel && gig.skillLevel !== filter.skillLevel);
            })
            .map((gig) => (
              <div key={gig._id}>
                <GigCard gigEntry={gig} userRole={currentUserRole} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );
};

export default BrowseGigs;
