import ShoppingCart from './ShoppingCart.mjs';
import { getLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

const targetElement = document.querySelector('.product-list');

const dataSource = getLocalStorage('so-cart');

const shoppingCart = new ShoppingCart(dataSource, targetElement);

shoppingCart.init();

loadHeaderFooter('/partials/header.html', '/partials/footer.html');