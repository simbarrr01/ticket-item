let basket = [];
let totalPrice = 0;

function addToBasket(ticketType, price) {
    basket.push({ ticketType, price });
    updateBasket();
}

function updateBasket() {
    const basketItems = document.getElementById('basket-items');
    basketItems.innerHTML = '';
    totalPrice = 0;

    basket.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.ticketType}: $${item.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromBasket(index);
        li.appendChild(removeButton);
        basketItems.appendChild(li);
        totalPrice += item.price;
    });

    document.getElementById('total-price').textContent = `Total: $${totalPrice}`;
}

function removeFromBasket(index) {
    basket.splice(index, 1);
    updateBasket();
}

function checkout() {
    if (basket.length === 0) {
        alert('Your basket is empty');
    } else {
        document.getElementById('payment-section').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function processPayment(event) {
    event.preventDefault();

    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    let errors = [];

    if (!cardName) {
        errors.push('Name on card is required.');
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        errors.push('Card number must be 16 digits.');
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        errors.push('Expiry date must be in MM/YY format.');
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        errors.push('CVV must be 3 or 4 digits.');
    }

    if (errors.length > 0) {
        alert('Payment errors:\n' + errors.join('\n'));
    } else {
        // Simulate payment processing
        console.log('Payment Details:', { cardName, cardNumber, expiryDate, cvv });

        alert(`Payment of $${totalPrice} successful! Thank you, ${cardName}.`);

        basket = [];
        updateBasket();
        document.getElementById('payment-section').style.display = 'none';
        document.getElementById('payment-form').reset();
    }
}
