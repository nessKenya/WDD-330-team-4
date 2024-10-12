import { showCartCount } from './cartProductCount';
import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails('main');

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let products = getLocalStorage('so-cart');
  
    if (products) {
      const existingProductIndex = products.findIndex(p => p.id === this.product.id);
      
      if (existingProductIndex !== -1) {
        products[existingProductIndex].quantity += 1;
      } else {
        this.product.quantity = 1;
        products.push(this.product);
      }
      
      setLocalStorage('so-cart', products);
    } else {
      /**
       * so-cart was empty
       * initialize with new/first product added
       * should be an array
       * */ 
      this.product.quantity = 1;
      setLocalStorage('so-cart', Array(this.product));
      showCartCount();

    }
    const icon = document.getElementById('backpack-icon');
    icon.classList.add('zoom');

    setTimeout(()=>icon.classList.remove('zoom'), 1500)

    alertMessage('Product Added To Cart', true);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);

    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsTemplate(this.product)
    );
  }
}