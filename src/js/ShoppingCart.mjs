import { getLocalStorage, setLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-card__remove" data-id="${item.Id}">❌</span>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item, 0);
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    
    if (!cartItems || cartItems.length === 0) {
      document.querySelector(this.parentSelector).innerHTML = '<p>Your cart is empty.</p>'; // Handle empty cart
      document.querySelector('.list-footer').classList.add('hide'); // Hide checkout button if needed
      return;
    }
    
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join('');
    document.querySelector('.list-footer').classList.remove('hide'); // Show checkout button

    // Display the total
    document.querySelector('.list-total').innerText = `Total: $${this.total.toFixed(2)}`;

    // Attach event listeners to remove buttons
    document.querySelectorAll('.cart-card__remove').forEach(element => {
      element.addEventListener('click', () => {
        const itemId = element.getAttribute('data-id');
        this.removeCartItem(itemId);
      });
    });
  }

  removeCartItem(idToRemove) {
    let cartItems = getLocalStorage(this.key);
    const index = cartItems.findIndex(item => item.Id === idToRemove);
    
    if (index !== -1) {
      cartItems.splice(index, 1);
      setLocalStorage(this.key, cartItems);
      this.calculateListTotal(cartItems); 
      this.renderCartContents();
    }
  }
}
