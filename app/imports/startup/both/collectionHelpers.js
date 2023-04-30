import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Gigs } from '../../api/gigs/Gigs';
import { Artists } from '../../api/artists/Artists';

Meteor.methods({
  'users.delete'(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to delete a user.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('not-authorized', 'Only admins can delete a user.');
    }

    Accounts.removeUser(userId);
  },
});

export const addArtist = (artist) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${artist.firstName} (${artist.email})`);
  Artists.collection.insert(artist);

};

export const addGig = (gig) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${gig.title} (${gig.date})`);
  Gigs.collection.insert(gig);
};

export const findArtistByEmail = (email) => {
  const artist = Artists.collection.findOne({ email });
  if (artist) {
    return artist._id;
  }
  return null;
};

export const findGigByTitle = (title) => {
  const gig = Gigs.collection.findOne({ title });
  if (title) {
    return gig._id;
  }
  return null;
};

export const linkEmailToGig = (email, title) => {
  // eslint-disable-next-line no-console
  const artistId = findArtistByEmail(email);
  const gigId = findGigByTitle(title);

  if (artistId && gigId) {
    Meteor.call('artistsToGigs.insert', artistId, gigId, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to link artist to gig: ${error.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`    Linked '${email}' to '${title}'`);
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to find artist or gig for linking');
  }
};

export const deleteUserAndLinks = (artistId) => {
  const currUser = Meteor.user();
  if (currUser && Roles.userIsInRole(currUser._id, 'admin')) {
    // Remove all ArtistsToGigs documents containing the artistId
    Meteor.call('artistsToGigs.removeArtistOrGigEntries', artistId);

    // Get the email associated with the artistId
    const artist = Artists.collection.findOne({ _id: artistId });
    const email = artist.email;

    // Remove the artist from the Artists collection
    Meteor.call('artists.remove', artistId);

    // Find and delete the user with the matching email address
    const user = Meteor.users.findOne({ 'emails.address': email });
    if (user) {
      Meteor.call('users.delete', user._id);
    }
  }
};

export const deleteGigAndLinks = (gigId) => {
  const currUser = Meteor.user();
  if (currUser && Roles.userIsInRole(currUser._id, 'admin')) {
    // Remove all ArtistsToGigs documents containing the gigId
    Meteor.call('artistsToGigs.removeArtistOrGigEntries', gigId);

    // Remove the Gig from the GigsCollection
    Meteor.call('gigs.remove', gigId);
  }
};
