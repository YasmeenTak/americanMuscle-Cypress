import { homePageItem } from './items';

export class homePageTest {
  constructor() {
    this.items = new homePageItem();
  }

  checkTitle() {
    cy.title().should(
      'contain',
      'Mustang Parts & Accessories | AmericanMuscle'
    );
  }
  checkSliderHaveCamaro() {
    cy.fixture('example.json').then((data) => {
      this.items
        .vehicleTypeNav()
        .should('be.visible')
        .and('contain', data.vehicleType);
    });
  }
  checkCartIsEmpty() {
    this.items.initalCartNumber().should('contain', '0');
  }
  checkShopCamaroHaveDesgin() {
    this.items.shopCamaro().realHover();
    this.items
      .shopCamaroTitle()
      .should('have.css', 'color', 'rgb(245, 130, 31)');
  }
  checkUrlNavgiateshopCamaro() {
    cy.url().should('include', 'camaro');
  }

  check20162022HaveDesgin() {
    this.items.camaroYear().realHover();
    this.items
      .camaroYearTitle()
      .should('have.css', 'color', 'rgb(245, 130, 31)');
  }
  checkBackButton() {
    this.items
      .backButton()
      .should('be.visible')
      .and('contain', 'Back to Vehicles');
  }
  checkUrlNavgiates20162022() {
    cy.url().should('include', '2016-camaro-accessories');
  }
}
