import { Selector, ClientFunction } from 'testcafe';

export const creds = {
  email: 'test@test.test',
  pwRight: 'test1234',
  pwWrong: 'test5678',
};

let storedSessionData = null;

export async function signIn(t, stored) {
  storedSessionData = stored || storedSessionData || await t.eval(() => JSON.parse(localStorage.getItem('sessionData')));

  if (storedSessionData === null) {
    const emailInput = Selector('#signInFormEmail');
    const pwInput = Selector('#signInFormPassword');
    const signInButton = Selector('#signInFormSubmit');

    await t
      .navigateTo('http://localhost:3000/signin')
      .typeText(emailInput, creds.email)
      .typeText(pwInput, creds.pwRight)
      .click(signInButton)
      .wait(4000);

    const storeSessionData = ClientFunction(() => {
      const sessionData = {
        cookies: document.cookie,
        localStorage: JSON.stringify(window.localStorage),
      };
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
    });
    await storeSessionData();
    storedSessionData = await t.eval(() => JSON.parse(localStorage.getItem('sessionData')));
  } else {
    const restoreSessionData = ClientFunction((sessionData) => {
      document.cookie = sessionData.cookies;

      const parsedLocalStorage = JSON.parse(sessionData.localStorage);
      Object.keys(parsedLocalStorage).forEach((key) => {
        window.localStorage.setItem(key, parsedLocalStorage[key]);
      });
    });
    await restoreSessionData(storedSessionData);
  }
}
