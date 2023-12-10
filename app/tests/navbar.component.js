import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
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

  async gotoLikedPostsPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#Liked-Posts-nav');
    await testController.expect(Selector('#liked-post-page').exists).ok();
  }

  async gotoProfilePage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-profile');
    await testController.expect(Selector('#myProfilePage').exists).ok();
  }

  async gotoAddPostPage(testController) {
    await testController.click('#create-nav');
    await testController.expect(Selector('#addPostPage').exists).ok();
  }

  async gotoModerationPage(testController) {
    await testController.click('#moderation-nav');
    await testController.expect(Selector('#moderationPage').exists).ok();
  }
}

export const navBar = new NavBar();
