import { Selector } from 'testcafe';
import { signIn } from './helpers';
/* global fixture:false, test:false */

let sessionData = null;

fixture`BrowseGigs`
  .page`http://localhost:3000/gigs`
  .beforeEach(async (t) => {
    // eslint-disable-next-line no-unused-vars
    sessionData = await signIn(t, sessionData);
    await t.navigateTo('http://localhost:3000/gigs');
  });

test('BrowseGigs page loads successfully', async (t) => {
  // Check that the user is redirected to the correct URL after successful login
  await t
    .expect(await t.eval(() => document.location.href)).eql('http://localhost:3000/gigs')
    .expect(Selector('#browseGigsPage').exists)
    .ok()
    .expect(Selector('.gig-grid').exists)
    .ok()
    .expect(Selector('#browseGigsFilterButton').exists)
    .ok();
});

test('Filter button toggles filter form', async t => {
  const filterButton = Selector('#browseGigsFilterButton');
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

test('Create Jam Button exists', async t => {
  const addJamButton = Selector('#createJamSessionBtn');

  await t
    .expect(addJamButton.exists)
    .ok();
});

test('Gig Cards are being populated', async t => {
  const gigCards = Selector('.gig-grid > div');

  await t
    .expect(gigCards.count)
    .gte(1);
});
