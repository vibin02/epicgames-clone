document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { id: 1, title: 'Grand Theft Auto 5', price: 49.99, image: 'https://imgs.search.brave.com/g6lg21yGw90wIiFfjn_dEnLTGPw2lkSuL-WM6JU-sXA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL2Nk/bi9FUDEwMDQvQ1VT/QTAwNDExXzAwL2VY/c1dsUDBFa2NWa0xQ/SGdVNHBqZmxtZzA3/MjUyeVU4LnBuZw' },
        { id: 2, title: 'Need For Speed Heat', price: 59.99, image: 'https://imgs.search.brave.com/cRjcU1m0MI98a6Jz_jtck_-Q_M8H2zLFHOdhqtzTkv4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTE1bmhodEpOYUwu/anBn' }
    ];

    const gameListElement = document.getElementById('game-list');
    const cartItemsElement = document.getElementById('cart-items');
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const taxPriceElement = document.getElementById('tax-price');
    const deliveryPriceElement = document.getElementById('delivery-price');
    const totalPriceElement = document.getElementById('total-price');
    const taxRate = 0.1; // 10% tax
    const deliveryCharge = 5.99; // Flat delivery charge
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const game = games.find(g => g.id === item.id);
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>${game.title}</div>
                <div>$${game.price.toFixed(2)}</div>
            `;
            cartItemsElement.appendChild(cartItem);
            subtotal += game.price;
        });

        const tax = subtotal * taxRate;
        const total = subtotal + tax + deliveryCharge;

        subtotalPriceElement.textContent = subtotal.toFixed(2);
        taxPriceElement.textContent = tax.toFixed(2);
        deliveryPriceElement.textContent = deliveryCharge.toFixed(2);
        totalPriceElement.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    if (gameListElement) {
        games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            gameItem.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>$${game.price.toFixed(2)}</p>
                <button class="cta add-to-cart" data-id="${game.id}">Add to Cart</button>
            `;
            gameListElement.appendChild(gameItem);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                const gameId = parseInt(event.target.getAttribute('data-id'));
                const existingGame = cart.find(item => item.id === gameId);

                if (!existingGame) {
                    cart.push({ id: gameId });
                    updateCart();
                    alert('Game added to cart!');
                }
            });
        });
    }

    if (cartItemsElement) {
        updateCart();
    }
});
