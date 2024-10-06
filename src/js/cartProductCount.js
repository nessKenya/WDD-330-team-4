import { getLocalStorage } from './utils.mjs';

export function showCartCount(){
  const cartElement = document.querySelector('.cart');

  const cartItems = getLocalStorage('so-cart');

  let productCount = 0;

  if(cartItems){
    productCount = cartItems.length;
  }

  if(productCount > 0) {
    if(cartElement) {
      cartElement.insertAdjacentHTML('afterbegin', '<div id="product-count"></div>')

      const countElement = document.querySelector('#product-count');
    
      countElement.innerHTML = productCount;
    }
  }
}