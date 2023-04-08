import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';

const addArtist = (artist) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${artist.firstName} (${artist.email})`);
  Artists.collection.insert(artist);
};

if (Artists.collection.find().count() === 0) {
  if (Meteor.settings.defaultArtists) {
    // eslint-disable-next-line no-console
    console.log('Initializing Artists Collection with default Artists');
    Meteor.settings.defaultArtists.forEach(artist => addArtist(artist));
  }
}
