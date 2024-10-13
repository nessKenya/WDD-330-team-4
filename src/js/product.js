import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './productDetails.mjs';

loadHeaderFooter();

const dataSource = new ExternalServices('tents');
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();
