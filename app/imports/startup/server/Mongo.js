import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Artists } from '../../api/artists/Artists';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Defines a new artist.  Error if user already exists. */
function addArtist({ firstName, lastName, email, image, instruments, skillLevel, genres, influences, bio, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Artists.collection.insert({ firstName, lastName, email, image, instruments, skillLevel, genres, influences, bio });
}

/** Initialize DB with defaultArtists if collection is empty */
if (Artists.collection.find().count() === 0) {
  if (Meteor.settings.defaultArtists) {
    console.log('Initializing Artists collection with defaultArtists');
    Meteor.settings.defaultArtists.map(profile => addArtist(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
