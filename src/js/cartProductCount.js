import { getLocalStorage } from './utils.mjs';

export function showCartCount() {
  const cartItems = getLocalStorage('so-cart');

  const countElement = document.querySelector('#product-count');

  let productCount = 0;

  if (cartItems) {
    productCount = cartItems.length;
  }

  if (productCount > 0) {
    countElement.style.display = 'block';
    countElement.innerHTML = productCount;
  } else {
    countElement.style.display = 'none';
  }
}
