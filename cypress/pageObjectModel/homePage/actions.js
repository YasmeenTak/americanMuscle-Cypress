import { homePageItem } from './items';

export class homePageActions {
  constructor() {
    this.items = new homePageItem();
  }
  visitAmericanMuscle() {
    cy.visit('https://www.americanmuscle.com/');
  }

  clickShopCamaro() {
    this.items.shopCamaro().click({ force: true });
  }
  click20162022() {
    this.items.camaroYear().click();
  }
}
