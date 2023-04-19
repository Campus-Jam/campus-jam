import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import { ArtistsToGigs } from '../../api/artistsToGigs/ArtistsToGigs';
import { addArtist, addGig, linkEmailToGig } from '../both/collectionHelpers';

// Initialize app with default artists
if (Artists.collection.find().count() === 0) {
  if (Meteor.settings.defaultArtists) {
    // eslint-disable-next-line no-console
    console.log('Initializing Artists Collection with default Artists');
    Meteor.settings.defaultArtists.forEach(artist => addArtist(artist));
  }
}

// Initialize app with default gigs
if (Gigs.collection.find().count() === 0) {
  if (Meteor.settings.defaultGigs) {
    // eslint-disable-next-line no-console
    console.log('Initializing Gigs Collection with default Gigs');
    Meteor.settings.defaultGigs.forEach(gig => addGig(gig));
  }
}

// Initialize app with default artist to gig links
Meteor.startup(() => {
  if (ArtistsToGigs.collection.find().count() === 0) {
    const albert_email = 'albert.h@foo.com';
    const henry_email = 'henry.k@baz.com';
    const samantha_email = 'samantha.l@foo.com';
    const alex_email = 'alex.n@foo.com';
    const maria_email = 'maria.g@foo.com';
    const jacob_email = 'jacob.k@bar.com';
    const sophie_email = 'sophie.j@baz.com';
    const william_email = 'william.b@foo.com';
    const ava_email = 'ava.chen@quux.com';
    const summerFestival = 'Summer Festival';
    const acousticNight = 'Acoustic Night';
    const rockAndMetal = 'Rock and Metal';
    const jazzNight = 'Jazz Night';
    linkEmailToGig(albert_email, acousticNight);
    linkEmailToGig(albert_email, rockAndMetal);
    linkEmailToGig(henry_email, acousticNight);
    linkEmailToGig(samantha_email, jazzNight);
    linkEmailToGig(alex_email, summerFestival);
    linkEmailToGig(alex_email, acousticNight);
    linkEmailToGig(alex_email, jazzNight);
    linkEmailToGig(maria_email, summerFestival);
    linkEmailToGig(maria_email, acousticNight);
    linkEmailToGig(jacob_email, rockAndMetal);
    linkEmailToGig(sophie_email, summerFestival);
    linkEmailToGig(sophie_email, jazzNight);
    linkEmailToGig(jacob_email, acousticNight);
    linkEmailToGig(william_email, rockAndMetal);
    linkEmailToGig(ava_email, acousticNight);
  }
});
