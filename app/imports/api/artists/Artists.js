import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

class ArtistsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArtistsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      email: { type: String, optional: false },
      image: { type: String, optional: true },
      instruments: { type: Array, optional: true },
      'instruments.$': { type: String },
      skillLevel: { type: String, allowedValues: skillLevels, optional: true },
      genres: { type: Array },
      'genres.$': { type: String, optional: true },
      influences: { type: Array },
      'influences.$': { type: String, optional: true },
      bio: { type: String, optional: true },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Artists = new ArtistsCollection();

if (Meteor.isServer) {
  Meteor.methods({
    // ARTISTS UPDATE METHOD
    'artists.update'(artistId, updatedArtist) {
      check(artistId, String);
      check(updatedArtist, Object);

      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      const { _id, ...artistWithoutId } = updatedArtist;
      new SimpleSchema({
        firstName: { type: String, optional: false },
        lastName: { type: String, optional: false },
        email: { type: String, optional: false },
        image: { type: String, optional: true },
        instruments: { type: Array, optional: true },
        'instruments.$': { type: String },
        skillLevel: { type: String, allowedValues: ['Beginner', 'Intermediate', 'Advanced'], optional: true },
        genres: { type: Array },
        'genres.$': { type: String, optional: true },
        influences: { type: Array },
        'influences.$': { type: String, optional: true },
        bio: { type: String, optional: true },
      }).validate(artistWithoutId);

      Artists.collection.update({ _id: artistId }, { $set: artistWithoutId });
    },

    // ARTISTS CREATE METHOD
    'artists.create'(email) {
      check(email, String);

      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      const artist = {
        email,
        firstName: '',
        lastName: '',
        instruments: [],
        genres: [],
        influences: [],
        bio: '',
      };

      Artists.collection.insert(artist);
    },
  });
}

export const getUniqueInstruments = (artists) => {
  const instruments = new Set();
  artists.forEach((gig) => gig.instruments.forEach((instrument) => instruments.add(instrument)));
  return Array.from(instruments);
};

export const getUniqueGenres = (artists) => {
  const genres = new Set();
  artists.forEach((gig) => gig.genres.forEach((genre) => genres.add(genre)));
  return Array.from(genres);
};

export const getUniqueSkillLevels = (artists) => {
  const skLvls = new Set();
  artists.forEach((artist) => skLvls.add(artist.skillLevel));
  return Array.from(skLvls);
};
