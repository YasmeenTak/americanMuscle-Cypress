/// <reference types="cypress"/>

describe('American Muscle Add to cart Scenario with specific filtering', () => {
  let cartItemNumber = 11;
  let resultItemNumberAfterFilter = '1-48 of 154';
  before(() => {
    // cy.visit('');
    cy.visit('https://www.americanmuscle.com/2016-camaro-rotors.html');
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      },
    });
  });

  context('Navigate to a specific Vehicle type and model year', () => {
    // it('Verify Home Page after visit the website for first time', () => {
    //   cy.title().should(
    //     'contain',
    //     'Mustang Parts & Accessories | AmericanMuscle'
    //   );
    //   cy.fixture('example.json').then((data) => {
    //     cy.get('.vehicle .vehicle_select_container nav')
    //       .should('be.visible')
    //       .and('contain', data.vehicleType);
    //   });
    // });
    // it('Verify the cart is empty', () => {
    //   cy.get('.upper_stripe_container span .cart_count').should('contain', '0');
    // });
    // it('Verify "Shop Camaro" have the active class', () => {
    //   cy.get('.vehicle nav .camaro_trigger').realHover();
    //   cy.get('.vehicle nav .camaro_trigger span').should(
    //     'have.css',
    //     'color',
    //     'rgb(245, 130, 31)'
    //   );
    // });
    // it('Verify Navigating to "Shop Camaro" form the slider', () => {
    //   cy.get('.vehicle nav .camaro_trigger').click();
    //   cy.url().should('include', 'camaro');
    // });
    // it('Verify "2016-2022" have the active class', () => {
    //   cy.get('.camaro a[href*="/2016-camaro"]').realHover();
    //   cy.get('.camaro a[href*="/2016-camaro"] span').should(
    //     'have.css',
    //     'color',
    //     'rgb(245, 130, 31)'
    //   );
    // });
    // it('Verify Clicking on "2016-2022" from home page Main Banner', () => {
    //   cy.get('.camaro a.back')
    //     .should('be.visible')
    //     .and('contain', 'Back to Vehicles');
    //   cy.get('.camaro a[href*="/2016-camaro"]').click();
    //   cy.url().should('include', '2016-camaro-accessories');
    // });
  });
  //-----------------------------------------
  context('Filtering products based on specific filters', () => {
    // it('Verify Hovering on "Brakes" from header nav', () => {
    //   cy.get('.gen_select_container a[href*="camaro-brakes"]')
    //     .parent('li')
    //     .trigger('mouseover')
    //     .then(($el) => {
    //       if ($el.children('div').attr('style', 'display: block;')) {
    //         cy.get('a[href="/2016-camaro-brakes.html"] + div').should(
    //           'have.attr',
    //           'style',
    //           'display: block;'
    //         );
    //       }
    //     });
    // });
    // it('Verify "Brakes" have on-active design ', () => {
    //   cy.get('.gen_select_container a[href*="camaro-brakes"]').realHover();
    //   cy.get('.gen_select_container a[href*="camaro-brakes"]').should(
    //     'have.css',
    //     'color',
    //     'rgb(24, 145, 205)'
    //   );
    // });
    // it('Verify "Rotors" have on-active design ', () => {
    //   cy.get('.categories a[href*="camaro-rotors"]').realHover();
    //   cy.get('.categories a[href*="camaro-rotors"]').should(
    //     'have.css',
    //     'color',
    //     'rgb(24, 145, 205)'
    //   );
    // });
    // it('Verify Clicking on "Rotors" from nav deatiels ', () => {
    //   cy.get('.categories a[href*="camaro-rotors"]').click({ force: true });
    //   cy.url().should('include', '2016-camaro-rotors.html');
    //   cy.marketingModalForFirstTime();
    // });
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
    //-----------------------------------------
    it('Verify Clicking in spacific product and navigate to product deatiles', () => {
      cy.get(
        '.products_container li a[href*="/sp-performance-camaro-cross-drilled-slotted-rotors-black-zinc-f"] img'
      )
        .first()
        .click();
      cy.url().should(
        'include',
        'sp-performance-camaro-cross-drilled-slotted-rotors-black-zinc-front'
      );
    });
    it('Verify the product details', () => {
      cy.fixture('example.json').then((data) => {
        cy.get('.headline_container h1').should('contain', data.productName);
        cy.get('.price_amount').should('contain', data.productPrice);
      });
    });
  });
  //-----------------------------------------
  context('Save products for later and Add to the Cart', () => {
    it('Verify Clicking on "Save for later" button in product deatils page', () => {
      // cy.marketingModalForFirstTime();
      cy.get('.triggers a[class="save_for_later_trigger"]').click({
        force: true,
      });
      cy.get('.order_details .box_and_triangle').should(
        'not.have.attr',
        'hidden'
      );
      // cy.marketingModalForFirstTime();
    });
    it('Verify Filling email address ', () => {
      cy.fixture('example.json').then((data) => {
        cy.get('.order_details .email')
          .type(data.emailAddress)
          .should('have.value', data.emailAddress);
      });
    });
    it('Verify Submiting the email address form', () => {
      cy.get('.order_details  button[class="alt_btn"]').click();
      cy.get('.lists_container + .saved').should('be.visible');
      cy.get('.triggers a[class="save_for_later_trigger"]').should(
        'not.be.visible'
      );
    });
    it('Verify Clicking on "Saved Products" from menu list', () => {
      cy.get('.menu_list a[href="/saved-for-later.html"]').realHover();
      cy.get('.menu_list a[href="/saved-for-later.html"] span').should(
        'have.css',
        'color',
        'rgb(24, 145, 205)'
      );
      cy.get('.menu_list a[href="/saved-for-later.html"]').click({
        force: true,
      });

      cy.url().should('include', 'saved-for-later');
    });
    it('Verify the product details', () => {
      cy.fixture('example.json').then((data) => {
        cy.get('.products_container .rating + a').should(
          'contain',
          data.productName
        );
        cy.get('.products_container .price').should(
          'contain',
          data.productPrice
        );
      });
    });
    it('Verify after navigate to "Saved Products" Page', () => {
      cy.get('.build_list p').should('contain', '1');
      cy.get('.products_container li').should('contain', 'In Stock');
    });
    it('Verify Clicking on "Add to cart" button from My Build List', () => {
      cy.get('.products_container .add_to_cart ').click();
      cy.url().should('include', 'shopping-cart');
      cy.fixture('example.json').then((data) => {
        cy.get('.upper_stripe_container span .cart_count').should(
          'contain',
          data.cartItemNumbers
        );
      });
    });
    it('Verify the product details', () => {
      cy.fixture('example.json').then((data) => {
        cy.get('.cart .product_name a').should('contain', data.productName);
        cy.get('.cart .unit_price').should('contain', data.productPrice);
      });
    });
    it('Verify Clicking on "Drop Down" list', () => {
      cy.get('button[data-toggle="dropdown"] .dropdown-text').should(
        'contain',
        '1'
      );
      cy.get('.quantity div > button').parent('div').click({ force: true });
      // cy.get('.quantity div')
      // .should('have.class', 'open');
    });
    it('Verify Modify the quantity from the cart to be 11', () => {
      cy.get('.dropdown-menu [data-value="11"]').click({ force: true });
      //loading
      cy.get('section.subcategory_landing').should('be.visible');
      cy.get('.upper_stripe_container span .cart_count').should(
        'contain',
        cartItemNumber
      );
    });
    it('Verify the Unit Price is equal Total COST', () => {
      cy.fixture('example.json').then((data) => {
        cy.get('.details_container .sub_total')
          .invoke('text')
          .should((textValue) => {
            expect(data.totalPrice).to.eq(textValue);
          });
      });
    });
    it('Verify the Quantity of product item in mini cart', () => {
      cy.get('.mini_cart .tiny_copy').should('contain', cartItemNumber);
    });
  });

  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});

