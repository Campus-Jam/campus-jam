import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';

export const addArtist = (artist) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${artist.firstName} (${artist.email})`);
  Artists.collection.insert(artist);

};

export const addGig = (gig) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${gig.title} (${gig.date})`);
  Gigs.collection.insert(gig);
};

export const findArtistByEmail = (email) => {
  const artist = Artists.collection.findOne({ email });
  if (artist) {
    return artist._id;
  }
  return null;
};

export const findGigByTitle = (title) => {
  const gig = Gigs.collection.findOne({ title });
  if (title) {
    return gig._id;
  }
  return null;
};

export const linkEmailToGig = (email, title) => {
  // eslint-disable-next-line no-console
  const artistId = findArtistByEmail(email);
  const gigId = findGigByTitle(title);

  if (artistId && gigId) {
    Meteor.call('artistsToGigs.insert', artistId, gigId, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to link artist to gig: ${error.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`    Linked '${email}' to '${title}'`);
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to find artist or gig for linking');
  }
};
