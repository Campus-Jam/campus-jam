import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class GigsToInstrumentsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'GigsToInstrumentsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      gig_id: { type: String, optional: false },
      instrument: { type: String, optional: false },
    });

    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const GigsToInstruments = new GigsToInstrumentsCollection();
