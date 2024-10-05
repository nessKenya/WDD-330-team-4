import ShoppingCart from './ShoppingCart.mjs';
import { getLocalStorage, setLocalStorage} from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

const targetElement = document.querySelector('.product-list');

const dataSource = getLocalStorage('so-cart');

const shoppingCart = new ShoppingCart(dataSource, targetElement);

shoppingCart.init();

loadHeaderFooter('/partials/header.html', '/partials/footer.html');


document.querySelectorAll('.cart-card__remove').forEach(element => {
  element.addEventListener('click', () => {
    const itemId = element.getAttribute('data-id');
      shoppingCart.removeCartItem(itemId);
  });
});
