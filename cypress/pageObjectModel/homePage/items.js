export class homePageItem {
  constructor() {}
  vehicleTypeNav() {
    return cy.get('.vehicle .vehicle_select_container nav');
  }
  initalCartNumber() {
    return cy.get('.upper_stripe_container span .cart_count');
  }
  //2
  shopCamaro() {
    return cy.get('.vehicle nav .camaro_trigger');
  }
  shopCamaroTitle() {
    return cy.get('.vehicle nav .camaro_trigger span ');
  }
  camaroYear() {
    return cy.get('.camaro a[href*="/2016-camaro"]');
  }
  camaroYearTitle() {
    return cy.get('.camaro a[href*="/2016-camaro"] span');
  }
  backButton() {
    return cy.get('.camaro a.back');
  }
}
