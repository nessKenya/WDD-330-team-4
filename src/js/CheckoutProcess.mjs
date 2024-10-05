import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage, renderWithTemplate, setLocalStorage, alertMessage } from './utils.mjs';


function orderSummaryTemplate(data) {
  let template = document.createElement('template')
  let html = `<p>Subtotal: <span id="itemTotal">$${data.itemTotal.toFixed(2)}</span></p>
    <p>Shipping Estimate: <span id="shipping">$${data.shipping.toFixed(2)}</span></p>
    <p>Tax: <span id="tax"></span>$${data.tax.toFixed(2)}</p>
    <p class='bold'>Order Total: <span id="orderTotal">$${data.orderTotal.toFixed(2)}</span></p>`

  template.innerHTML = html;

  return template;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map(item => ({id: item.Id, name: item.NameWithoutBrand, price: item.FinalPrice, quantity: 1}));
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector){
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0)
  }

  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    
    // compute tax
    this.tax = this.itemTotal * 0.06;

    // compute shipping
    for(let i = 0;i < this.list.length;i++) {
      if(i === 0){
        this.shipping += 10;
        continue;
      }
      this.shipping += 2;
    }

    // compute order total
    this.orderTotal = this.itemTotal + this.tax  + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    renderWithTemplate(
      orderSummaryTemplate,
      document.querySelector(this.outputSelector),
      {itemTotal: this.itemTotal, shipping: this.shipping, tax: this.tax, orderTotal: this.orderTotal},
      'afterBegin',
      true,
    );
  }

  async checkout() {    
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const items = packageItems(getLocalStorage(this.key));

    const formData = {...formDataToJSON(document.getElementById('checkout')), items, orderDate: new Date()};

    try{
      // call the checkout method in our ExternalServices module and send it our data object.
      const externalService = new ExternalServices();
      await externalService.checkout(formData);
      setLocalStorage('so-cart', []);
      document.location.href = '/checkout/success.html';
    }catch(error){
     alertMessage(error.message.message);
    }
   
  }
}