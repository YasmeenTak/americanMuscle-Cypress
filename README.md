![Cypress.io](https://miro.medium.com/max/7200/1*Jkb_tsMBOvL6wQ8bzldu8Q.png)

## E2E testing scenario:

American Muscle Add to cart Scenario with specific filtering

## Scenario Steps

- Navigate to https://www.americanmuscle.com/
- Choose Camaro Vehicle (2016-2022) from the home page's Main Banner
- Select 'Brakes -> Rotor' category from the top-nav.
- Close the auto loaded modal.
- Filter to see items in 'Brake Rotors and Drums' Category.
- Filter to see items only have price between $120 and $290
- Sort the items based on the customer rating.
- Open product details page for the prodcut with the highest customer rating.
- Add the product to the saved products list for test email in this syntax "firstname.lastname@test.com" (example:yasmeen@test.com).
- Navigate to my build (saved products page) from the header -> my account dropdown.
- Add the selected product to the cart.
- Modify the quantity from the cart to be 11.

## Requirentments

- Node js
- Chrome browser

### Dependencies used

1. [Cypress](https://www.cypress.io/)
2. [Cypress real events](https://github.com/dmtrKovalenko/cypress-real-events)

### How to start using this script

```javascript
git clone git@github.com:YasmeenTak/americanMuscle-Cypress.git

// Once it finish open it using terminal and do
npm install
```

**To run the cypress runner**

```javascript
npx cypress open
```
