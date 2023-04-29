import { Meteor } from 'meteor/meteor';
import { addArtist, addGig, linkEmailToGig } from '../both/collectionHelpers';
import { createUser } from './Accounts';

// Function to check if an artist is suitable for a gig
function isSuitable(artist, gig) {
  return artist.instruments.some(instr => gig.instruments.includes(instr)) ||
    artist.genres.some(genre => gig.genres.includes(genre));
}

// Custom function to randomly select n elements from an array
function getRandomElements(arr, n) {
  const shuffled = arr.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.moreArtists.forEach(({ email, password, role }) => createUser(email, password, role));
  jsonData.moreArtists.forEach(artist => addArtist(artist));
  jsonData.moreGigs.forEach(gig => addGig(gig));

  // For each artist, link them to suitable and random gigs
  jsonData.moreArtists.forEach(artist => {
    const suitableGigs = jsonData.moreGigs.filter(gig => isSuitable(artist, gig));

    if (suitableGigs.length > 0) {
      const numGigsToLink = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
      const gigsToLink = getRandomElements(suitableGigs, numGigsToLink); // Randomly select gigs to link

      gigsToLink.forEach(gig => {
        linkEmailToGig(artist.email, gig.title);
      });
    }
  });
}
