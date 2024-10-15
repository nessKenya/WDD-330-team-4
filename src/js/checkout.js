import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

let orderSummary = new CheckoutProcess('so-cart', '#order-summary');

orderSummary.init();

orderSummary.calculateOrdertotal();

document.querySelector('#checkout').addEventListener('submit', function (e) {
  e.preventDefault();
  orderSummary.checkout();
});