import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ArtistToGigCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArtistToGigCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      Artist_id: { type: String, optional: false },
      Gig_id: { type: String, optional: false },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const ArtistToGig = new ArtistToGigCollection();
