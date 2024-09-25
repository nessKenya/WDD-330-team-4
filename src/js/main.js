import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';

const productData = new ProductData('tents');

const targetElement = document.querySelector('.product-list');

const productList = new ProductList('tents', productData, targetElement);

productList.init();