/// <reference types="cypress"/>

describe('American Muscle Add to cart Scenario with specific filtering', () => {
  let cartItemNumber = 11;
  let resultItemNumberAfterFilter = '1-48 of 154';
  before(() => {
    cy.visit('');
    // cy.visit('https://www.americanmuscle.com/2016-camaro-rotors.html');
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      },
    });
  });

  context('Navigate to a specific Vehicle type and model year', () => {
    it('Verify Home Page after visit the website for first time', () => {
      cy.title().should(
        'contain',
        'Mustang Parts & Accessories | AmericanMuscle'
      );
      cy.fixture('example.json').then((data) => {
        cy.get('.vehicle .vehicle_select_container nav')
          .should('be.visible')
          .and('contain', data.vehicleType);
      });
    });
    it('Verify the cart is empty', () => {
      cy.get('.upper_stripe_container span .cart_count').should('contain', '0');
    });
    it('Verify "Shop Camaro" have the active class', () => {
      cy.get('.vehicle nav .camaro_trigger').realHover();
      cy.get('.vehicle nav .camaro_trigger span').should(
        'have.css',
        'color',
        'rgb(245, 130, 31)'
      );
    });
    it('Verify Navigating to "Shop Camaro" form the slider', () => {
      cy.get('.vehicle nav .camaro_trigger').click();
      cy.url().should('include', 'camaro');
    });
    it('Verify "2016-2022" have the active class', () => {
      cy.get('.camaro a[href*="/2016-camaro"]').realHover();
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
  });
  //-----------------------------------------
  context('Filtering products based on specific filters', () => {
    it('Verify Hovering on "Brakes" from header nav', () => {
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
    });
    it('Verify "Brakes" have on-active design ', () => {
      cy.get('.gen_select_container a[href*="camaro-brakes"]').realHover();
      cy.get('.gen_select_container a[href*="camaro-brakes"]').should(
        'have.css',
        'color',
        'rgb(24, 145, 205)'
      );
    });
    it('Verify "Rotors" have on-active design ', () => {
      cy.get('.categories a[href*="camaro-rotors"]').realHover();
      cy.get('.categories a[href*="camaro-rotors"]').should(
        'have.css',
        'color',
        'rgb(24, 145, 205)'
      );
    });
    it('Verify Clicking on "Rotors" from nav deatiels ', () => {
      cy.get('.categories a[href*="camaro-rotors"]').click({ force: true });
      cy.url().should('include', '2016-camaro-rotors.html');
      cy.marketingModalForFirstTime();
    });
    //--------------------"Brake Rotors and Drums" Category---------------------
    it('Verify Select "Brake Rotors and Drums" Category from filter sidebar', () => {
      // cy.marketingModalForFirstTime();
      cy.get('a[href*="Subcategory=Brake Rotors and Drums"]')
        .click({
          force: true,
        })
        .should('have.class', 'selected');
      //loading
      cy.get('section.subcategory_landing').should('be.visible');
      cy.url().should('contain', 'Subcategory=Brake');
    });
    it('Verify the sidebar Filter Updated', () => {
      cy.get('.facets div[data-group-name="BrakePadMaterial"]').should(
        'not.exist'
      );
      cy.get(
        '.facets div[data-group-name="RotorType"] + div[data-group-name="RotorLocation"]'
      ).should('not.exist');
    });
    it('Verify the products result of "Brake Rotors and Drums" Category', () => {
      cy.get('.product_container  [data-habitat="C1"]  div + div a').should(
        'contain',
        'Rotors'
      );
    });
    it('Verify the pagination reuslt number', () => {
      cy.get('.pagination .total').should(
        'contain',
        'Showing 1-48 of 189 results'
      );
      cy.get('a[href*="Subcategory=Brake Rotors and Drums"] .count')
        .invoke('text')
        .as('categoryCount');
      cy.log('categoryCount');

      cy.get('@categoryCount').then((ele) => {
        // cy.get('.pagination .total').expect(totalPriceWithTax).to.eq(textValue);
      });
    });

    it('Verify "Brake Rotors and Drums" have on-active design', () => {
      cy.get('a[href*="Subcategory=Brake Rotors and Drums"]').should(
        'have.css',
        'color',
        'rgb(0, 0, 0)'
      );
    });
    //-------------------Price filter----------------------
    it('Verify Filling item price filter between $120 and $290', () => {
      cy.get('.price_range .min_price').should('be.empty', '');
      cy.fixture('example.json').then((data) => {
        cy.get('.price_range .min_price')
          .type(data.priceRangeFirst, { force: true })
          .focused()
          .and('have.value', data.priceRangeFirst);
      });
      cy.get('.price_range .max_price').should('be.empty', '');
      cy.fixture('example.json').then((data) => {
        cy.get('.price_range .max_price')
          .type(data.priceRangeSecond, { force: true })
          .focused()
          .should('have.value', data.priceRangeSecond);
      });
    });
    it('Verify Clicking on "GO" button after typing in price filter', () => {
      cy.get('.limit_price').click({ force: true });
      //loading
      cy.get('section.subcategory_landing').should('be.visible');
      cy.get('.pagination .total').should(
        'contain',
        resultItemNumberAfterFilter
      );
    });
    it('Verify the range of price between 120 to 290', () => {
      // cy.get('.product_container p[data-qatgt="price"]')
      //   .should('be.gt', 120)
      //   .and('be.lte', 290);
      // cy.get('.product_container p[data-qatgt="price"]').then((value) =>
      //   expect(value).to.be.greaterThan(120)
      // );
    });

    //-------------------customer rating Filter----------------------
    it('Verify Sorting the items based on the customer rating', () => {
      cy.get('.sort_container .sort').should('have.value', 'Featured');
      cy.get('option[value="Featured"]').should('have.attr', 'selected');
      cy.get('.sort_container .sort').select('Customer Rating');
      cy.get('.sort_container .sort').should('have.value', 'Customer Rating');
      //loading
      cy.get('section.subcategory_landing').should('be.visible');
      cy.get('.pagination .total').should(
        'contain',
        resultItemNumberAfterFilter
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
