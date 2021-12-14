// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-real-events/support';

// Check for real work app onboarding dialog

Cypress.Commands.add('marketingModalForFirstTime', () => {
  //   cy.wait(2000);
  //   cy.get('body').then((el) => {
  //     const element = el.find('.overlay.marketing_modal').length;
  //     if (element) {
  //       cy.get('a.close_trigger').click();
  //     }
  //   });
  const $el = Cypress.$('.overlay.marketing_modal');
  cy.wait(6000);
  if ($el.length) {
    cy.log('Closing modal');
    cy.get('a.close_trigger').click();
  }
  cy.get('.overlay.marketing_modal').should('not.be.visible');
});
