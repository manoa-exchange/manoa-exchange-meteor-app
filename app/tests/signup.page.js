import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signUpPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, firstName, lastName, studentId, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signUpFormFirstName', firstName);
    await testController.typeText('#signUpFormLastName', lastName);
    await testController.typeText('#signUpFormEmail', username);
    await testController.typeText('#signUpFormPassword', password);
    await testController.typeText('#signUpFormID', studentId);
    await testController.click('#signUpFormSubmit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();
