/// <reference types="cypress"/>

describe('American Muscle Add to cart Scenario with specific filtering', () => {
  before(() => {
    cy.visit('');
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      },
    });
  });

  context('Home page', () => {
    it('Verify Home Page after visit the website for first time', () => {
      cy.title().should(
        'contain',
        'Mustang Parts & Accessories | AmericanMuscle'
      );
      cy.wait(3000);
      cy.get('.vehicle .vehicle_select_container nav')
        .should('be.visible')
        .and('contain', 'Shop Camaro');
      //   cy.get('.vehicle .vehicle_select_container nav').should(
      //     'have.attr',
      //     'a[data-vehicle-type="Camaro"]'
      //   );
    });
    it('Verify "Shop Camaro" have the active class', () => {
      cy.get('.vehicle nav .camaro_trigger').realHover();
      cy.get('.vehicle nav .camaro_trigger span').should(
        'have.css',
        'color',
        'rgb(245, 130, 31)'
      );
    });
    it('Verify Navigate to "Shop Camaro" form the slider', () => {
      cy.get('.vehicle nav .camaro_trigger').click();
      cy.url().should('include', 'camaro');
    });
    //-----------------------------------------
    it('Verify "2016-2022" have the active class', () => {
      cy.get('.camaro a[href*="/2016-camaro"]').realHover();
      // .vehicle_select_container nav a:hover span
      cy.get('.camaro a[href*="/2016-camaro"] span').should(
        'have.css',
        'color',
        'rgb(245, 130, 31)'
      );
    });
    it('Verify Clicking on "2016-2022" from home page Main Banner', () => {
      cy.get('.camaro a.back')
        .should('be.visible')
        .and('contain', 'Back to Vehicles');
      cy.get('.camaro a[href*="/2016-camaro"]').click();
      cy.url().should('include', '2016-camaro-accessories');
    });
    //-----------------------------------------
  });


  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});

// - Navigate to https://www.americanmuscle.com/
// - Choose Camaro Vehicle (2016-2022) from the home page's Main Banner
// - Select 'Brakes -> Rotor' category from the top-nav.
// - Close the auto loaded modal.
// - Filter to see items in 'Brake Rotors and Drums' Category.
// - Filter to see items only have price between $120 and $290
// - Sort the items based on the customer rating.
// - Open product details page for the prodcut with the highest customer rating.
// - Add the product to the saved products list for test email in this syntax "yourfirstname.yourlastname@test.com" (example:anas.salahat@test.com).
// - Navigate to my build (saved products page) from the header -> my account dropdown.
// - Add the selected product to the cart.
// - Modify the quantity from the cart to be 11.
