import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

// Function to display error or success messages
function showMessage(message, type) {
  const messageDiv = document.getElementById('checkout-message');
  messageDiv.textContent = message;
  messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
}

function validateCheckoutForm() {
  let isValid = true;
  const messageDiv = document.querySelector('#checkout-message');
  messageDiv.innerHTML = '';
  // Get all form field values
  const firstName = document.querySelector('[name="fname"]').value.trim();
  const lastName = document.querySelector('[name="lname"]').value.trim();
  const street = document.querySelector('[name="street"]').value.trim();
  const city = document.querySelector('[name="city"]').value.trim();
  const state = document.querySelector('[name="state"]').value.trim();
  const zip = document.querySelector('[name="zip"]').value.trim();
  const cardNumber = document.querySelector('[name="cardNumber"]').value.trim();
  const expiration = document.querySelector('[name="expiration"]').value.trim();
  const code = document.querySelector('[name="code"]').value.trim();

  // Validate each field
  if (!firstName) {
    isValid = false;
    showMessage('First name is required.', 'error');
  }
  if (!lastName) {
    isValid = false;
    showMessage('Last name is required.', 'error');
  }
  if (!street) {
    isValid = false;
    showMessage('Street is required.', 'error');
  }
  if (!city) {
    isValid = false;
    showMessage('City is required.', 'error');
  }
  if (!state) {
    isValid = false;
    showMessage('State is required.', 'error');
  }
  if (!/^\d{5}$/.test(zip)) {
    isValid = false;
    showMessage('Invalid ZIP code. It must be 5 digits.', 'error');
  }
  if (!/^\d{16}$/.test(cardNumber)) {
    isValid = false;
    showMessage('Invalid credit card number. It must be 16 digits.', 'error');
  }
  if (!expiration) {
    isValid = false;
    showMessage('Expiration date is required.', 'error');
  }
  if (!code) {
    isValid = false;
    showMessage('Security code is required.', 'error');
  }

  return isValid;
}

// Calculate order total when the zip code field loses focus
document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));

// Listening for click on the button
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();

  // Validate the form before proceeding to checkout
  if (validateCheckoutForm()) {
    myCheckout.checkout();
  }
});

// Optionally, if you want to listen for form submission instead of button click
// document.forms['checkout']
// .addEventListener('submit', (e) => {
//   e.preventDefault();
//   if (validateCheckoutForm()) {
//     myCheckout.checkout();
//   }
// });
