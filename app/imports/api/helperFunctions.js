import { Meteor } from 'meteor/meteor';
import { Gigs } from './gigs/Gigs';
import { ArtistsToGenres } from './artists_to_genres/ArtistsToGenres';
import { ArtistsToInstruments } from './artists_to_instruments/ArtistsToInstruments';
import { ArtistsToGigs } from './artists_to_gigs/ArtistsToGigs';
import { GigsToGenres } from './gigs_to_genres/GigsToGenres';
import { GigsToInstruments } from './gigs_to_instruments/GigsToInstruments';

export const findUserByEmail = (email) => {
  const user = Meteor.users.findOne({ 'emails.address': email });
  if (user) {
    return user._id;
  }
  return null;
};

export const findGigByTitle = (title) => {
  const gig = Gigs.collection.findOne({ title: title });
  return gig._id;
};

export const linkArtistToGenre = (artist_id, genre) => {
  console.log(`        Linking: artist_id ${artist_id} with (${genre})`);
  ArtistsToGenres.collection.insert({
    artist_id: artist_id,
    genre: genre,
  });
};

export const linkArtistToInstrument = (artist_id, instrument) => {
  console.log(`        Linking: artist_id ${artist_id} with (${instrument})`);
  ArtistsToInstruments.collection.insert({
    artist_id: artist_id,
    instrument: instrument,
  });
};

export const linkArtistToGig = (artist_id, gig_id) => {
  console.log(`        Linking: artist_id ${artist_id} with gig (${gig_id})`);
  ArtistsToGigs.collection.insert({
    artist_id: artist_id,
    gig_id: gig_id,
  });
};

export const linkGigToGenre = (gig_id, genre) => {
  console.log(`        Linking: gig_id ${gig_id} to (${genre})`);
  GigsToGenres.collection.insert({
    gig_id: gig_id,
    genre: genre,
  });
};

export const linkGigToInstrument = (gig_id, instr) => {
  console.log(`        Linking: gig_id ${gig_id} to (${instr})`);
  GigsToInstruments.collection.insert({
    gig_id: gig_id,
    instrument: instr,
  });
};
