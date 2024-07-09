let cart = [];
let totalPrice = 0;

function addToCart(ticketType, price) {
    cart.push({ ticketType, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.ticketType}: $${item.price}`;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    document.getElementById('total-price').textContent = `Total: $${totalPrice}`;
}
