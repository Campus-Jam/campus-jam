// import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';
//
// class ArtistsCollection {
//   constructor() {
//     // The name of this collection.
//     this.name = 'GigsCollection';
//     // Define the Mongo collection.
//     this.collection = new Mongo.Collection(this.name);
//     // Define the structure of each document in the collection.
//     this.schema = new SimpleSchema({
//       firstName: { type: String, optional: false },
//       lastName: { type: String, optional: false },
//       email: { type: String, optional: false },
//       image: { type: String, optional: true },
//       instruments: { type: Array, optional: true },
//       'instruments.$': { type: String },
//       skillLevel: { type: String, allowedValues: ['Beginner', 'Intermediate', 'Advanced'], optional: true },
//       genres: { type: Array },
//       'genres.$': { type: String, optional: true },
//       influences: { type: Array },
//       'influences.$': { type: String, optional: true },
//       bio: { type: String, optional: true },
//     });
//
//     // Ensure collection documents obey schema.
//     this.collection.attachSchema(this.schema);
//     // Define names for publications and subscriptions
//     this.userPublicationName = `${this.name}.publication.user`;
//     // this.adminPublicationName = `${this.name}.publication.admin`;
//   }
// }
//
// export const Gigs = new ArtistsCollection();
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

class GigsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'GigsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: { type: String, optional: false },
      image: { type: String, optional: false },
      date: { type: Date, optional: false },
      skillLevel: { type: String, allowedValues: ['Beginner', 'Intermediate', 'Advanced'], optional: true },
      genres: { type: Array },
      'genres.$': { type: String, optional: true },
      instruments: { type: Array, optional: true },
      'instruments.$': { type: String },
      venue: { type: String, optional: false },
      about: { type: String, optional: true },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Gigs = new GigsCollection();

Meteor.methods({
  'gigs.insert'(title, image, date, skillLevel, genres, instruments, venue, about) {
    // Validate the input fields against the Gigs schema.
    check(title, String);
    check(image, String);
    check(date, Date);
    check(skillLevel, Match.Maybe(String));
    check(genres, Array);
    check(genres[0], String);
    check(instruments, Match.Maybe(Array));
    check(venue, Match.Maybe(String));
    check(about, Match.Maybe(String));

    // Insert the new gig document into the collection.
    const gigId = Gigs.collection.insert({
      title,
      image,
      date,
      skillLevel,
      genres,
      instruments,
      venue,
      about,
    });

    return gigId;
  },
});
