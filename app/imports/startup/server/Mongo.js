import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';

const addArtist = (artist) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${artist.firstName} (${artist.email})`);
  Artists.collection.insert(artist);
};

if (Artists.collection.find().count() === 0) {
  if (Meteor.settings.defaultArtists) {
    // eslint-disable-next-line no-console
    console.log('Initializing Artists Collection with default Artists');
    Meteor.settings.defaultArtists.forEach(artist => addArtist(artist));
  }
}

const addGig = (gig) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${gig.title} (${gig.date})`);
  Gigs.collection.insert(gig);
};

if (Gigs.collection.find().count() === 0) {
  if (Meteor.settings.defaultGigs) {
    // eslint-disable-next-line no-console
    console.log('Initializing Gigs Collection with default Gigs');
    Meteor.settings.defaultGigs.forEach(gig => addGig(gig));
  }
}
