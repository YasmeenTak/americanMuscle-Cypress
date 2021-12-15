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

  context('Filltering', () => {
    it('Verify Hovering on "Brakes" from header nav', () => {
      // cy.get('.gen_select_container nav a[href*="/2016-camaro-brakes.htm"]')
      //   // .invoke('show')
      //   // .realHover({ force: true })
      //   .should('contain', 'Rotors');
      // cy.get(
      //   '.gen_select_container nav a[href*="/2016-camaro-brakes.htm"] + div'
      // ).should('not.have.css', 'display', 'none');
      cy.get('.gen_select_container a[href*="camaro-brakes"]')
        .parent('li')
        .trigger('mouseover')
        .then(($el) => {
          if ($el.children('div').attr('style', 'display: block;')) {
            cy.get('a[href="/2016-camaro-brakes.html"] + div').should(
              'have.attr',
              'style',
              'display: block;'
            );
          }
        });
      cy.wait(3000);
      cy.get('.gen_select_container a[href*="camaro-brakes"]').realHover();
      cy.get('.gen_select_container a[href*="camaro-brakes"]').should(
        'have.css',
        'color',
        'rgb(24, 145, 205)'
      );
      cy.get('.categories a[href*="camaro-rotors"]').click;
    });
    it('Verify Clicking on "Rotors" from nav deatiels ', () => {
      cy.get('.categories a[href*="camaro-rotors"]').click;
      // cy.marketingModalForFirstTime();
      cy.url().should('include', '2016-camaro-rotors.html');
    });
    it('Verify Select "Brake Rotors and Drums" Category from filter sidebar', () => {
      cy.wait(3000);
      cy.get('a[href*="Subcategory=Brake Rotors and Drums"]')
        .click({
          force: true,
        })
        .should('have.class', 'selected');
      //loading
      //ترتيب العناصر
      cy.get('.pagination .total').should(
        'contain',
        'Showing 1-48 of 189 results'
      );
      // cy.reload();
      // cy.get(.spinner).should('be.visible');
      // cy.get(.spinner).should('not.exist');
      // cy.get('body').should('be.visible');
      cy.url().should('contain', 'Subcategory=Brake');
    });
    //-----------------------------------------

    it('Verify Filling item price filter between $120 and $290', () => {
      cy.get('.price_range .min_price').should('be.empty', '');
      // .and('match', /^[0-9]*$/);
      cy.get('.price_range .min_price')
        .type('120', { force: true })
        .focused()
        .should('have.value', '120');
      cy.get('.price_range .max_price').should('be.empty', '');
      cy.get('.price_range .max_price')
        .type('290', { force: true })
        .focused()
        .should('have.value', '290');
    });
    //-----------------------------------------

    it('Verify Clicking on "GO" button after typing in price filter', () => {
      cy.get('.limit_price').click({ force: true });
      //Loading
      //ترتيب الاسعار
      cy.get('.pagination .total').should(
        'contain',
        'Showing 1-48 of 154 results'
      );
    });
    //-----------------------------------------
    it('Verify Sorting the items based on the customer rating', () => {
      cy.get('.sort_container .sort').should('have.value', 'Featured');
      cy.get('option[value="Featured"]').should('have.attr', 'selected');
      cy.get('.sort_container .sort').select('Customer Rating');
      cy.get('.sort_container .sort').should('have.value', 'Customer Rating');
      //ترتيب العناصر
      cy.get('.pagination .total').should(
        'contain',
        'Showing 1-48 of 154 results'
      );
    });
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
