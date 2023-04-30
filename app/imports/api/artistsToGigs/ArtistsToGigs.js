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
    // Remove the artist from the gig.
    ArtistsToGigs.collection.remove({ artist_id: artistId, gig_id: gigId });

    // Check if there are any artists left in the gig.
    const artistsInGigCount = ArtistsToGigs.collection.find({ gig_id: gigId }).count();

    // If there are no artists left in the gig, remove the gig document.
    if (artistsInGigCount === 0) {
      Gigs.collection.remove({ _id: gigId });
    }
  },

  'artistsToGigs.getGigsForArtist'(artistId) {
    check(artistId, String);
    const gigIds = ArtistsToGigs.collection.find({ artist_id: artistId }).map((doc) => doc.gig_id);
    return Gigs.collection.find({ _id: { $in: gigIds } }).fetch();
  },

  'artistsToGigs.getGigsForArtistEmail'(email) {
    check(email, String);
    const gigIds = ArtistsToGigs.collection.find({ email: email }).map((doc) => doc.gig_id);
    return Gigs.collection.find({ _id: { $in: gigIds } }).fetch();
  },

  'artistsToGigs.getArtistsForGig'(gigId) {
    check(gigId, String);
    const artistIds = ArtistsToGigs.collection.find({ gig_id: gigId }).map((doc) => doc.artist_id);
    return Artists.collection.find({ _id: { $in: artistIds } }).fetch();
  },

  'artistsToGigs.removeArtistOrGigEntries'(id) {
    check(id, String);

    const artistEntries = ArtistsToGigs.collection.find({ artist_id: id });
    const gigEntries = ArtistsToGigs.collection.find({ gig_id: id });

    // Remove all entries with the given artist ID.
    artistEntries.forEach((entry) => {
      ArtistsToGigs.collection.remove({ artist_id: entry.artist_id, gig_id: entry.gig_id });
    });

    // Remove all entries with the given gig ID.
    gigEntries.forEach((entry) => {
      ArtistsToGigs.collection.remove({ artist_id: entry.artist_id, gig_id: entry.gig_id });

      // Check if there are any artists left in the gig.
      const artistsInGigCount = ArtistsToGigs.collection.find({ gig_id: entry.gig_id }).count();
      // If there are no artists left in the gig, remove the gig document.
      if (artistsInGigCount === 0) {
        Gigs.collection.remove({ _id: entry.gig_id });
      }
    });
  },
});
