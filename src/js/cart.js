import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function findCartTotal() {
  const cartItems = getLocalStorage('so-cart');
  
  // check if the cart is empty and add a hide class if it is
  if (cartItems.length === 0){
    document.querySelector('.cart-footer').classList.add('hide');
    return;
  }

  // use reduce to add the items together
  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice;
  }, 0);

  // show the total to 2 decimals and ensure the hide class is removed it makes it here
  document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
  document.querySelector('.cart-footer').classList.remove('hide');
}

renderCartContents();
findCartTotal();
