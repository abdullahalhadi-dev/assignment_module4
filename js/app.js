import products from './products.js';
import { addToCart, clearCart, increaseQuantity, decreaseQuantity, removeItem, displayCartItems } from './cart.js';

function createProductHTML(product) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: $${product.price}</p>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${JSON.stringify(product)}, 1)">Add to Cart</button>
          <button class="btn btn-secondary btn-sm" onclick="increaseQuantity(${product.id})">+</button>
          <button class="btn btn-secondary btn-sm" onclick="decreaseQuantity(${product.id})">-</button>
        </div>
      </div>
    </div>
  `;
}

function displayProductList() {
  const productListElement = document.getElementById('product-list');
  productListElement.innerHTML = '';
  products.forEach((product) => {
    const productHTML = createProductHTML(product);
    productListElement.innerHTML += productHTML;
  });
}

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', clearCart);

displayProductList();
displayCartItems();