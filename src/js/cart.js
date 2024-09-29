import { getLocalStorage, setLocalStorage} from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems === null) {
    setLocalStorage('so-cart',[]);
  }else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
  document.querySelectorAll('.cart-card__remove').forEach(element => {
    element.addEventListener('click', () => {
      const itemId = element.getAttribute('data-id');
        removeCartItem(itemId);
    });
  });
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
  <span class="cart-card__remove" data-id=${item.Id}>❌</span>
</li>`;

  return newItem;
}

renderCartContents();
function removeCartItem(idToRemove) {
  const cartItems = getLocalStorage('so-cart');
  const index = cartItems.findIndex(item => item.Id === idToRemove);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  setLocalStorage('so-cart',cartItems);
  renderCartContents();
}