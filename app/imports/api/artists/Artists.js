import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ArtistsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArtistsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: { type: String },
      lastName: { type: String },
      image: { type: String },
      instruments: { type: Array },
      'instruments.$': { type: String },
      skillLevel: { type: String, allowedValues: ['Beginner', 'Intermediate', 'Advanced'] },
      genres: { type: Array },
      'genres.$': { type: String },
      influences: { type: Array },
      'influences.$': { type: String },
      bio: { type: String, optional: true },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Artists = new ArtistsCollection();
