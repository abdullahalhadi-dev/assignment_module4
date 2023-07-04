let cartItems = [];

export function addToCart(product, ...quantities) {
  quantities.forEach(quantity => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }
  });

  displayCartItems();
}

export function increaseQuantity(productId) {
  const item = cartItems.find((item) => item.product.id === productId);
  if (item) {
    item.quantity++;
    displayCartItems();
  }
}

export function decreaseQuantity(productId) {
  const item = cartItems.find((item) => item.product.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
    displayCartItems();
  }
}

export function removeItem(productId) {
  const itemIndex = cartItems.findIndex((item) => item.product.id === productId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    displayCartItems();
  }
}

export function clearCart() {
  cartItems = [];
  displayCartItems();
}

export function displayCartItems() {
  const cartElement = document.getElementById('shopping-cart');
  cartElement.innerHTML = '';

  if (cartItems.length === 0) {
    cartElement.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  cartItems.forEach((item) => {
    const itemHTML = `
      <div class="card mb-2">
        <div class="card-body">
          <h5 class="card-title">${item.product.name}</h5>
          <p class="card-text">Quantity: ${item.quantity}</p>
          <p class="card-text">Price: $${item.product.price}</p>
          <p class="card-text">Total: $${item.product.price * item.quantity}</p>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${item.product.id})">Remove</button>
        </div>
      </div>
    `;
    cartElement.innerHTML += itemHTML;
  });
  cartElement.innerHTML += `<h4 class="mt-4">Total Amount: $${totalAmount}</h4>`;
}