import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './productDetails.mjs';

import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter('/partials/header.html', '/partials/footer.html');

const dataSource = new ProductData('tents');
const productId = getParam('product')

const product = new ProductDetails(productId, dataSource);
product.init();