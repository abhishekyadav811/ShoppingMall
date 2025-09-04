
let cart = [];

function addToCart(productName, price, discount) {
  const discountedPrice = price - (price * discount / 100);
  cart.push({ productName, price, discount, discountedPrice });
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartSummaryDiv = document.getElementById('cartSummary');

  cartItemsDiv.innerHTML = "<h3>Items in Cart:</h3>";
  cartSummaryDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    cartItemsDiv.innerHTML += `
      <p>${item.productName} - ₹${item.discountedPrice.toFixed(2)} 
      <button onclick="removeFromCart(${index})">❌</button></p>`;
    total += item.discountedPrice;
  });

  if (cart.length > 0) {
    cartSummaryDiv.innerHTML = `
      <h3>Total: ₹${total.toFixed(2)}</h3>`;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function submitOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!payment) {
    alert("Please select a payment method");
    return;
  }

  const orderConfirmation = document.getElementById('orderConfirmation');
  orderConfirmation.innerHTML = `
    <h3>Order Confirmed ✅</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Payment:</strong> ${payment.value}</p>
    <p><strong>Total:</strong> ₹${cart.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2)}</p>
    <p>Thank you for shopping with us! 😊</p>
  `;

  cart = [];
  renderCart();
  document.getElementById('addressForm').reset();
}
