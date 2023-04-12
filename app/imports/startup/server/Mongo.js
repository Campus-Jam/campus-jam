import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import { findUserByEmail, findGigByTitle, linkArtistToGenre, linkArtistToGig, linkArtistToInstrument, linkGigToGenre, linkGigToInstrument } from '../../api/helperFunctions';

function addArtist(artist) {
  console.log(`    Processing ${artist.email}`);
  const artistCopy = { ...artist };
  Artists.collection.insert(artistCopy);

  const id = findUserByEmail(artist.email);

  if (artist.genres) {
    // Add artist-genre links
    artist.genres.forEach(genre => linkArtistToGenre(id, genre));
  }
  if (artist.instruments) {
    // Add artist-instrument links
    artist.instruments.forEach(inst => linkArtistToInstrument(id, inst));
  }
}

const addGig = (gig) => {
  console.log(`    Processing ${gig.title} (${gig.date})`);
  const gigCopy = { ...gig };
  const gig_id = Gigs.collection.insert(gigCopy);

  if (gig.genres) {
    gig.genres.forEach(genre => linkGigToGenre(gig_id, genre));
  }
  if (gig.instruments) {
    gig.instruments.forEach(instr => linkGigToInstrument(gig_id, instr));
  }
};

if (Gigs.collection.find().count() === 0) {
  if (Meteor.settings.defaultGigs) {
    // eslint-disable-next-line no-console
    console.log('Initializing Gigs Collection with default Gigs');
    Meteor.settings.defaultGigs.forEach(gig => addGig(gig));
  }
}

// Add default Artists upon meteor initialization, and create default user accounts
if (Artists.collection.find().count() === 0) {
  if (Meteor.settings.defaultArtists) {
    // eslint-disable-next-line no-console
    console.log('Initializing Artists Collection with default Artists');
    Meteor.settings.defaultArtists.forEach(artist => addArtist(artist));

    // eslint-disable-next-line no-console
    console.log('Linking some Artists to some Gigs');
    const albert_id = findUserByEmail('albert.h@foo.com');
    const henry_id = findUserByEmail('kapono.k@baz.com');
    const samantha_id = findUserByEmail('samantha.l@foo.com');
    const summerFestival_id = findGigByTitle('Summer Festival');
    const acousticNight_id = findGigByTitle('Acoustic Night');
    const rockAndMetal_id = findGigByTitle('Rock and Metal');
    linkArtistToGig(albert_id, summerFestival_id);
    linkArtistToGig(albert_id, rockAndMetal_id);
    linkArtistToGig(henry_id, acousticNight_id);
    linkArtistToGig(samantha_id, summerFestival_id);
    linkArtistToGig(samantha_id, acousticNight_id);
  }
}
