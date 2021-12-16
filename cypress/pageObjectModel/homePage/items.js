export class homePageItem {
  constructor() {}
  shopCarmaro() {
    return cy.get('.vehicle .vehicle_select_container nav');
  }
}
