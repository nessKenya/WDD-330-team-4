import { showCartCount } from './cartProductCount';
import { renderListWithTemplate } from './utils.mjs';
import { getLocalStorage, setLocalStorage} from './utils.mjs';


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id=${item.Id}>❌</span>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(dataSource, listElement) {
      this.dataSource = dataSource;
      this.listElement = listElement;
  }

  async init() {
    this.renderList();
    this.findCartTotal();
  }

  renderList() {
    renderListWithTemplate(cartItemTemplate, this.listElement, this.dataSource, 'afterbegin', true);
  }

  removeCartItem(idToRemove) {
    const cartItems = getLocalStorage('so-cart');
    const index = cartItems.findIndex(item => item.Id === idToRemove);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
    setLocalStorage('so-cart',cartItems);
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, 'afterbegin', true);
    document.querySelectorAll('.cart-card__remove').forEach(element => {
      element.addEventListener('click', () => {
        const itemId = element.getAttribute('data-id');
          this.removeCartItem(itemId);
          showCartCount();
      });
    });
  }

  findCartTotal() {
    const cartItems = getLocalStorage('so-cart');
  
    // check if the cart is empty and add a hide class if it is
    if (cartItems.length === 0){
      document.querySelector('.cart-footer').classList.add('hide');
      return;
    }
  
    // use reduce to add the items together
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  
    // show the total to 2 decimals and ensure the hide class is removed it makes it here
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
    document.querySelector('.cart-footer').classList.remove('hide');
  }
}