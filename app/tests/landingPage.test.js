import { Selector } from 'testcafe';

/* global fixture:false, test:false */

// LANDING PAGE TESTS
// eslint-disable-next-line no-unused-expressions
fixture`Landing Page`
  .page`http://localhost:3000/`;

test('LandingPage renders correctly', async (t) => {
  await t
    .navigateTo('http://localhost:3000/')
    .wait(10000).expect(Selector('#landingPage').exists).ok();
});

test('Create an account and start jamming today! redirects to signup page', async (t) => {
  // Click the "Create an account and start jamming today!" button
  const createAccountButton = Selector('a').withText('Create an account and start jamming today!');
  await t.click(createAccountButton);
  // Check that the user is redirected to the Signup page
  await t.wait(10000).expect(Selector('h2').withText('Sign up for Jamb-UH-ree').exists).ok();
});

test('Log In link redirects to signin page', async (t) => {
  // Click the "Log In" link
  const logInLink = Selector('a').withText('Log In');
  await t.click(logInLink);
  // Check that the user is redirected to the Signin page
  await t.expect(Selector('h2').withText('Sign In').exists).ok();
});

test('Sign Up link redirects to signup page', async (t) => {
  // Click the "Sign Up" link
  const signUpLink = Selector('a').withText('Create an account and start jamming today!');
  await t.click(signUpLink);
  // Check that the user is redirected to the Signup page
  await t.expect(Selector('h2').withText('Sign up for Jamb-UH-ree').exists).ok();
});
