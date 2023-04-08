import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';

Meteor.publish(Artists.userPublicationName, function () {
  return Artists.collection.find();
});
