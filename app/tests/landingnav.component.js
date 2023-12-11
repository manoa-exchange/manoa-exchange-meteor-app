import { Selector } from 'testcafe';

class LandingnavComponent {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#landing-navbar').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#signin');
  }

  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#landing-navbar').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#register-button');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }
}

export const landingNav = new LandingnavComponent();
