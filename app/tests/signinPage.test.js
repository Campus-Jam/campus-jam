import { Selector } from 'testcafe';
import { creds } from './helpers';

/* global fixture:false, test:false */

// SIGNIN PAGE TESTS
// eslint-disable-next-line no-unused-expressions
fixture`SignIn`
  .page`http://localhost:3000/signin`;

test('SignIn page renders correctly', async (t) => {
  await t
    .navigateTo('http://localhost:3000/signin')
    .expect(Selector('#signInPage').exists).ok()
    .expect(Selector('h2').withText('Sign In').exists)
    .ok()
    .expect(Selector('#signInFormEmail').exists)
    .ok()
    .expect(Selector('#signInFormPassword').exists)
    .ok()
    .expect(Selector('#signInFormSubmit').exists)
    .ok()
    .expect(Selector('a').withText('here').exists)
    .ok();
});

test('User cannot submit form without filling out all required fields', async (t) => {
  const emailInput = Selector('#signInFormEmail');
  const pwInput = Selector('#signInFormPassword');
  const signInButton = Selector('#signInFormSubmit');

  // Store the initial URL
  const initialUrl = await t.eval(() => document.location.href);

  // Check for the case when no credentials are entered
  await t
    .click(signInButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);

  // Check for case when only email is entered
  await t
    .typeText(emailInput, creds.email)
    .click(signInButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);

  // Check for case when only pw is entered
  await t
    .click(emailInput)
    .pressKey('ctrl+a delete')
    .typeText(pwInput, creds.pwRight)
    .click(signInButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);
});

test('Link correctly navigates to SignUp page', async (t) => {
  const loginLink = Selector('a').withText('here');

  await t
    .click(loginLink)
    .expect(Selector('h2').withText('Sign up for Jamb-UH-ree').exists).ok();
});

test('User cannot sign in with incorrect password', async (t) => {
  const emailInput = Selector('#signInFormEmail');
  const pwInput = Selector('#signInFormPassword');
  const signInButton = Selector('#signInFormSubmit');

  // Store the initial URL
  const initialUrl = await t.eval(() => document.location.href);

  // Enter email and incorrect PW
  await t
    .typeText(emailInput, creds.email)
    .typeText(pwInput, creds.pwWrong)
    .click(signInButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);
});

test('User can successfully sign in', async (t) => {
  const emailInput = Selector('#signInFormEmail');
  const pwInput = Selector('#signInFormPassword');
  const signInButton = Selector('#signInFormSubmit');

  // Enter email and PW
  await t
    .typeText(emailInput, creds.email)
    .typeText(pwInput, creds.pwRight)
    .click(signInButton)
    .wait(2500);

  // Check that the user is redirected to the correct URL after successful login
  await t.expect(await t.eval(() => document.location.href)).eql('http://localhost:3000/')
    .expect(Selector('#signInLandingPage').exists)
    .ok()
    .expect(Selector('#signInLandingButtonCluster').exists)
    .ok();
});
