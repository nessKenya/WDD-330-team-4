import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  // get the cart or create new array for the cart
  let products = getLocalStorage('so-cart') || [];

  // make sure the cart is in an array!!!
  if (!Array.isArray(products)) {
    products = [];
  }

  // add the product to cart
  let newProductList = products.concat(product);
  setLocalStorage('so-cart', newProductList);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);