import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { landingNav } from './landingnav.component';
// eslint-disable-next-line no-unused-vars
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
// eslint-disable-next-line no-unused-vars
const signupcreds = { firstName: 'James', lastName: 'Doe', studentId: '12345678', email: 'james@foo.com', password: 'changeme' };
// eslint-disable-next-line no-unused-vars
const post = { caption: 'Alpha Beta Charlie Delta Echo' };
const admincreds = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await landingNav.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingNav.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

/* Commented out because it fails trying to create the same "new" account
 test('Test that signup works', async (testController) => {
  await landingNav.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, signupcreds.firstName, signupcreds.lastName, signupcreds.studentId, signupcreds.email, signupcreds.password);
  await landingNav.isLoggedIn(testController, signupcreds.email);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
}); */

test('Test that liked post page shows up', async (testController) => {
  await landingNav.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingNav.isLoggedIn(testController, credentials.username);
  await navBar.gotoLikedPostsPage(testController);
});

test('Test that profile page shows up', async (testController) => {
  await landingNav.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingNav.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfilePage(testController);
});

test('Test that add post works', async (testController) => {
  await landingNav.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingNav.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddPostPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that moderation page works', async (testController) => {
  await landingNav.gotoSignInPage(testController);
  await signinPage.signin(testController, admincreds.username, admincreds.password);
  await landingNav.isLoggedIn(testController, admincreds.username);
  await navBar.gotoModerationPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
