import { Meteor } from 'meteor/meteor';
import { Gigs } from './api/gigs/Gigs';
import { ArtistsToGenres } from './api/artists_to_genres/ArtistsToGenres';
import { ArtistsToInstruments } from './api/artists_to_instruments/ArtistsToInstruments';
import { ArtistsToGigs } from './api/artists_to_gigs/ArtistsToGigs';
import { GigsToGenres } from './api/gigs_to_genres/GigsToGenres';
import { GigsToInstruments } from './api/gigs_to_instruments/GigsToInstruments';
import { Artists } from './api/artists/Artists';

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

export const getArtistsGenres = async (artist_id) => ArtistsToGenres.find({ artist_id });

export const getArtistsInstruments = async (artist_id) => ArtistsToInstruments.find({ artist_id });

export const getArtistsGigs = async (artist_id) => ArtistsToGigs.find({ artist_id });

export const getArtistBlob = async (artist_id) => {
  // look up the artist in the Artists collection
  const artist = await Artists.findOne({ artist_id });
  if (!artist) {
    throw new Error(`Artist with id ${artist_id} not found`);
  }

  // create the blob with the artist's info
  const blob = {
    firstName: artist.firstName,
    lastName: artist.lastName,
    email: artist.email,
    image: artist.image,
    influences: artist.influences,
    bio: artist.bio,
  };

  // find genres associated with the artist
  const genres = getArtistsGenres(artist_id);
  blob.genres = genres.map((genre) => genre.genre);

  // find instruments associated with the artist
  const instruments = getArtistsInstruments(artist_id);
  blob.instruments = instruments.map((instrument) => instrument.instrument);

  return blob;
};
