import { Selector } from 'testcafe';

export const testEmail = 'test@test.test';
export const testPW1 = 'test1234';
export const testPW2 = 'test5678';

/* global fixture:false, test:false */

// SIGNUP PAGE TESTS
// eslint-disable-next-line no-unused-expressions
fixture`SignUp`
  .page`http://localhost:3000/signup`
  .beforeEach(async (t) => {
    await t.setPageLoadTimeout(5000); // Set a page load timeout of 5000ms
  });

test('SignUp page renders correctly', async (t) => {
  await t
    .navigateTo('http://localhost:3000/signup')
    .expect(Selector('#signUpPage').exists).ok()
    .expect(Selector('h2').withText('Sign up for Jamb-UH-ree').exists)
    .ok()
    .expect(Selector('p').withText('Start connecting with fellow musicians today.').exists)
    .ok()
    .expect(Selector('#signUpFormEmail').exists)
    .ok()
    .expect(Selector('#signUpFormPassword').exists)
    .ok()
    .expect(Selector('#signUpFormVerifyPassword').exists)
    .ok()
    .expect(Selector('#signUpFormSubmit').exists)
    .ok()
    .expect(Selector('a').withText('here').exists)
    .ok();
});

test('User cannot submit form without filling out all required fields', async (t) => {
  const emailInput = Selector('#signUpFormEmail');
  const pwInput = Selector('#signUpFormPassword');
  const vpwInput = Selector('#signUpFormVerifyPassword');
  const signUpButton = Selector('#signUpFormSubmit');

  // Store the initial URL
  const initialUrl = await t.eval(() => document.location.href);

  // Check for the case when no credentials are entered
  await t
    .click(signUpButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);

  // Check for case when only email is entered
  await t
    .typeText(emailInput, testEmail)
    .click(signUpButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);

  // Check for case when only email and pw are entered
  await t
    .typeText(pwInput, testPW1)
    .click(signUpButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);

  // Check for case when only pw and vpw are entered
  await t
    .click(emailInput)
    .pressKey('ctrl+a delete')
    .typeText(pwInput, testPW1)
    .typeText(vpwInput, testPW1)
    .click(signUpButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);

  // Check for case when only email and vpw are entered
  await t
    .typeText(emailInput, testEmail)
    .click(pwInput())
    .pressKey('ctrl+a delete')
    .typeText(vpwInput, testPW1)
    .click(signUpButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);
});

test('User cannot submit form if passwords do not match', async (t) => {
  const emailInput = Selector('#signUpFormEmail');
  const pwInput = Selector('#signUpFormPassword');
  const vpwInput = Selector('#signUpFormVerifyPassword');
  const signUpButton = Selector('#signUpFormSubmit');

  // Store the initial URL
  const initialUrl = await t.eval(() => document.location.href);

  await t
    .typeText(emailInput, testEmail)
    .typeText(pwInput, testPW1)
    .typeText(vpwInput, testPW2)
    .click(signUpButton);
  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);
});

test('Link correctly navigates to SignIn page', async (t) => {
  const loginLink = Selector('a').withText('here');

  await t
    .click(loginLink)
    .expect(Selector('h2').withText('Sign In').exists).ok();
});

test('User can successfully register', async (t) => {
  const emailInput = Selector('#signUpFormEmail');
  const pwInput = Selector('#signUpFormPassword');
  const vpwInput = Selector('#signUpFormVerifyPassword');
  const signUpButton = Selector('#signUpFormSubmit');

  await t.typeText(emailInput, testEmail);
  await t.typeText(pwInput(), testPW1);
  await t.typeText(vpwInput(), testPW1);
  await t.click(signUpButton);

  // Check that the user is redirected to the EditProfile page after successful registration
  await t.expect(Selector('h2').withText('Edit Profile').exists).ok();
});

test('User can not register an already existing email', async (t) => {
  const emailInput = Selector('#signUpFormEmail');
  const pwInput = Selector('#signUpFormPassword');
  const vpwInput = Selector('#signUpFormVerifyPassword');
  const signUpButton = Selector('#signUpFormSubmit');

  // Store the initial URL
  const initialUrl = await t.eval(() => document.location.href);

  await t
    .typeText(emailInput, testEmail)
    .typeText(pwInput, testPW1)
    .typeText(vpwInput, testPW1)
    .click(signUpButton);

  await t.expect(await t.eval(() => document.location.href)).eql(initialUrl);
});
