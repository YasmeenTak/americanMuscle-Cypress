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
  const $el = Cypress.$('.overlay.marketing_modal');
  if ($el.length) {
    cy.log('Closing modal');
    cy.get('a.close_trigger').click();
  }
  cy.get('.overlay.marketing_modal').should('not.be.visible');
});

function categoryCountNumber(text) {
  return text.replace('Showing 1-48 of ', '').replace(' results', '').trim();
}

Cypress.Commands.add('filterPaginationNumber', () => {
  cy.get('.pagination .total').invoke('text').then(categoryCountNumber);
});
