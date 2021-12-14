/// <reference types="cypress"/>
describe('American Muscle Add to cart Scenario with specific filtering', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      },
    });
  });

  context('Home page', () => {
    it('Verify home screen after visit the website', () => {});
  });
});
