const { BasePage } = require('./base-page');

export class AuthenticatedPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.profileMenuButton = this.page.getByTestId('profile-menu-button');
    this.logoutMenuItem = this.page.getByTestId('logout-item');
    this.adminMenuItem = this.page.getByRole('menuitem', { name: 'Admin' });
    this.userInterfaceDrawerItem = this.page.getByTestId(
      'user-interface-drawer-link'
    );
    this.appBar = this.page.getByTestId('app-bar');
    this.drawerMenuButton = this.page.getByTestId('drawer-menu-button');
    this.goToDashboardButton = this.page.getByTestId('go-back-drawer-link');
    this.typographyLogo = this.page.getByTestId('typography-logo');
    this.customLogo = this.page.getByTestId('custom-logo');
  }

  async logout() {
    await this.profileMenuButton.click();
    await this.logoutMenuItem.click();
  }
}
