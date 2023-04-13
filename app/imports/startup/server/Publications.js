import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import { ArtistsToGenres } from '../../api/artists_to_genres/ArtistsToGenres';
import { ArtistsToGigs } from '../../api/artists_to_gigs/ArtistsToGigs';
import { ArtistsToInstruments } from '../../api/artists_to_instruments/ArtistsToInstruments';
import { InstrumentChoices } from '../../api/instrument_choices/InstrumentChoices';
import { GigsToGenres } from '../../api/gigs_to_genres/GigsToGenres';
import { GigsToInstruments } from '../../api/gigs_to_instruments/GigsToInstruments';
import { ArtistsToGigs } from '../../api/artistsToGigs/ArtistsToGigs';

Meteor.publish(Artists.userPublicationName, function () {
  return Artists.collection.find();
});

Meteor.publish(ArtistsToGenres.userPublicationName, function () {
  return ArtistsToGenres.collection.find();
});

Meteor.publish(ArtistsToGigs.userPublicationName, function () {
  return ArtistsToGigs.collection.find();
});

Meteor.publish(ArtistsToInstruments.userPublicationName, function () {
  return ArtistsToInstruments.collection.find();
});

Meteor.publish(GigsToGenres.userPublicationName, function () {
  return GigsToGenres.collection.find();
});

Meteor.publish(GigsToInstruments.userPublicationName, function () {
  return GigsToInstruments.collection.find();
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
