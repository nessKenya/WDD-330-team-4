import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

const headingElement = document.querySelector('#heading');
headingElement.innerHTML = `top products: ${category}`;
headingElement.style.textTransform = 'capitalize';

const productData = new ProductData(category);

const targetElement = document.querySelector('.product-list');

const productList = new ProductList(category, productData, targetElement);

productList.init();

const sortElement = document.getElementById('sortBox');

sortElement.addEventListener('change', function () {
  productList.sortBy(sortElement.value);
});
