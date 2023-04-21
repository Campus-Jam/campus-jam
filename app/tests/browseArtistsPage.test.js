import { Selector } from 'testcafe';
import { signIn } from './helpers';
/* global fixture:false, test:false */

const sessionData = null;

fixture`BrowseArtists`
  .page`http://localhost:3000/`
  .beforeEach(async (t) => {
    // eslint-disable-next-line no-unused-vars
    await signIn(t, sessionData);
    await t.navigateTo('http://localhost:3000/artists');
  });

test('BrowseArtists page loads successfully', async (t) => {
  // Check that the user is redirected to the correct URL after successful login
  await t
    .expect(await t.eval(() => document.location.href)).eql('http://localhost:3000/artists')
    .expect(Selector('#browseArtistsPage').exists)
    .ok()
    .expect(Selector('.artist-grid').exists)
    .ok()
    .expect(Selector('#browseArtistsFilterButton').exists)
    .ok();
});

test('Filter button toggles filter form', async t => {
  const filterButton = Selector('#browseArtistsFilterButton');
  const filterForm = Selector('.filterForm');

  await t
    .expect(filterForm.exists).notOk()
    .click(filterButton)
    .expect(filterForm.exists)
    .ok()
    .click(filterButton)
    .expect(filterForm.exists)
    .notOk();
});

test('Gig Cards are being populated', async t => {
  const artistCards = Selector('.artist-grid > div');

  await t
    .expect(artistCards.count)
    .gte(1);
});
