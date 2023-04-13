import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import { InstrumentChoices } from '../../api/instrument_choices/InstrumentChoices';
import { ArtistsToGigs } from '../../api/artistsToGigs/ArtistsToGigs';

Meteor.publish(Artists.userPublicationName, function () {
  return Artists.collection.find();
});

Meteor.publish(Gigs.userPublicationName, function () {
  return Gigs.collection.find();
});

Meteor.publish(InstrumentChoices.userPublicationName, function () {
  return InstrumentChoices.collection.find();
});
Meteor.publish(ArtistsToGigs.userPublicationName, function () {
  return ArtistsToGigs.collection.find();
});
