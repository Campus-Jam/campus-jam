import { Selector } from 'testcafe';
import { signIn } from './helpers';

/* global fixture:false, test:false */

let sessionData = null;

fixture`EditProfile`
  .page`http://localhost:3000/`
  .beforeEach(async (t) => {
    // eslint-disable-next-line no-unused-vars
    sessionData = await signIn(t, sessionData);
    await t.navigateTo('http://localhost:3000/viewProfile/test@test.test');
  });

test('EditProfile page loads successfully', async (t) => {
  // Check that the user is redirected to the correct URL after successful login
  await t
    .expect(await t.eval(() => document.location.href)).eql('http://localhost:3000/viewProfile/test@test.test')
    .expect(Selector('#editProfilePage').exists)
    .ok()
    .expect(Selector('.editProfileStyle').exists)
    .ok()
    .expect(Selector('#editProfileForm').exists)
    .ok();
});
