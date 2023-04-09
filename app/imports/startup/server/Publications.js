import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';

Meteor.publish(Artists.userPublicationName, function () {
  return Artists.collection.find();
});

Meteor.publish(Gigs.userPublicationName, function () {
  return Gigs.collection.find();
});
