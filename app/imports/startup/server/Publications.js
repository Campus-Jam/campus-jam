import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import { ArtistsToGigs } from '../../api/artistsToGigs/ArtistsToGigs';

Meteor.publish(Artists.userPublicationName, function () {
  return Artists.collection.find();
});

Meteor.publish(Gigs.userPublicationName, function () {
  return Gigs.collection.find();
});

Meteor.publish(ArtistsToGigs.userPublicationName, function () {
  return ArtistsToGigs.collection.find();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
