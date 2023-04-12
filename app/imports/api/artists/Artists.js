import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ArtistsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArtistsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: { type: String, optional: false },
      lastName: { type: String, optional: false },
      email: { type: String, optional: false },
      image: { type: String, optional: true },
      skillLevel: { type: String, allowedValues: ['Beginner', 'Intermediate', 'Advanced'], optional: true },
      influences: { type: Array },
      'influences.$': { type: String, optional: true },
      bio: { type: String, optional: true },
      artist_id: { type: String, optional: true },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Artists = new ArtistsCollection();
