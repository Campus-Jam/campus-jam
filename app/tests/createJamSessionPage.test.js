import { Selector } from 'testcafe';
import { signIn } from './helpers';

/* global fixture:false, test:false */

let sessionData = null;

fixture`CreateJamSession`
  .page`http://localhost:3000/createJamSession`
  .beforeEach(async (t) => {
    // eslint-disable-next-line no-unused-vars
    sessionData = await signIn(t, sessionData);
    await t.navigateTo('http://localhost:3000/createJamSession');
  });

test('CreateJamSession page loads successfully', async (t) => {
  // Check that the user is redirected to the correct URL after successful login
  await t
    .expect(await t.eval(() => document.location.href)).eql('http://localhost:3000/createJamSession')
    .expect(Selector('#createJamSessionPage').exists)
    .ok()
    .expect(Selector('h2').withText('Create A Jam Session').exists)
    .ok();
});
