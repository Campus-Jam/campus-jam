import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Gigs } from '../gigs/Gigs';
import { Artists } from '../artists/Artists';

class ArtistsToGigsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArtistsToGigsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      artist_id: { type: String, optional: false },
      gig_id: { type: String, optional: false },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const ArtistsToGigs = new ArtistsToGigsCollection();

Meteor.methods({
  'artistsToGigs.insert'(artistId, gigId) {
    check(artistId, String);
    check(gigId, String);
    ArtistsToGigs.collection.insert({ artist_id: artistId, gig_id: gigId });
  },

  'artistsToGigs.remove'(artistId, gigId) {
    check(artistId, String);
    check(gigId, String);
    ArtistsToGigs.collection.remove({ artist_id: artistId, gig_id: gigId });
  },

  'artistsToGigs.getGigsForArtist'(artistId) {
    check(artistId, String);
    const gigIds = ArtistsToGigs.collection.find({ artist_id: artistId }).map((doc) => doc.gig_id);
    return Gigs.collection.find({ _id: { $in: gigIds } }).fetch();
  },

  'artistsToGigs.getArtistsForGig'(gigId) {
    check(gigId, String);
    const artistIds = ArtistsToGigs.collection.find({ gig_id: gigId }).map((doc) => doc.artist_id);
    return Artists.collection.find({ _id: { $in: artistIds } }).fetch();
  },
});
