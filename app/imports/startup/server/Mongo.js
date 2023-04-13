import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/artists/Artists';
import { Gigs } from '../../api/gigs/Gigs';
import { ArtistsToGigs } from '../../api/artistsToGigs/ArtistsToGigs';

const addArtist = (artist) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${artist.firstName} (${artist.email})`);
  Artists.collection.insert(artist);

};

// Add default Artists upon meteor initialization, and create default user accounts
if (Artists.collection.find().count() === 0) {
  if (Meteor.settings.defaultArtists) {
    // eslint-disable-next-line no-console
    console.log('Initializing Artists Collection with default Artists');
    Meteor.settings.defaultArtists.forEach(artist => addArtist(artist));
  }
}

const addGig = (gig) => {
  // eslint-disable-next-line no-console
  console.log(`    Adding: ${gig.title} (${gig.date})`);
  Gigs.collection.insert(gig);
};

if (Gigs.collection.find().count() === 0) {
  if (Meteor.settings.defaultGigs) {
    // eslint-disable-next-line no-console
    console.log('Initializing Gigs Collection with default Gigs');
    Meteor.settings.defaultGigs.forEach(gig => addGig(gig));
  }
}

const findArtistByEmail = (email) => {
  const artist = Artists.collection.findOne({ email });
  if (artist) {
    return artist._id;
  }
  return null;
};

const findGigByTitle = (title) => {
  const gig = Gigs.collection.findOne({ title });
  if (title) {
    return gig._id;
  }
  return null;
};

const linkEmailToGig = (email, title) => {
  const artistId = findArtistByEmail(email);
  const gigId = findGigByTitle(title);

  if (artistId && gigId) {
    Meteor.call('artistsToGigs.insert', artistId, gigId, (error) => {
      if (error) {
        console.error(`Failed to link artist to gig: ${error.message}`);
      } else {
        console.log(`Successfully linked artist with email '${email}' to gig with title '${title}'`);
      }
    });
  } else {
    console.error('Failed to find artist or gig for linking');
  }
};

// Add default data to ArtistsToGigsCollection
Meteor.startup(() => {
  if (ArtistsToGigs.collection.find().count() === 0) {
    const albert = 'albert.h@foo.com';
    const henry = 'kapono.k@baz.com';
    const samantha = 'samantha.l@foo.com';
    const alex = 'alex.n@foo.com';
    const maria = 'maria.g@foo.com';
    const jacob = 'jacob.k@bar.com';
    const sophie = 'sophie.j@baz.com';
    const william = 'william.b@foo.com';

    const summerFestival = 'Summer Festival';
    const acousticNight = 'Acoustic Night';
    const jazzNight = 'Jazz Night';
    const rockAndMetal = 'Rock and Metal';

    linkEmailToGig(albert, jazzNight);
    linkEmailToGig(albert, rockAndMetal);
    linkEmailToGig(henry, acousticNight);
    linkEmailToGig(samantha, jazzNight);
    linkEmailToGig(alex, acousticNight);
    linkEmailToGig(maria, summerFestival);
    linkEmailToGig(maria, acousticNight);
    linkEmailToGig(jacob, jazzNight);
    linkEmailToGig(sophie, summerFestival);
    linkEmailToGig(sophie, summerFestival);
    linkEmailToGig(sophie, summerFestival);
    linkEmailToGig(sophie, jazzNight);
    linkEmailToGig(william, rockAndMetal);
  }
});
