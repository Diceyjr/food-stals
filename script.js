const menuItems = [
    {
        id: 1,
        name: "Classic Cheeseburger",
        price: 4500.00,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80",
        description: "Juicy beef patty, cheddar, lettuce, tomato."
    },
    {
        id: 2,
        name: "Crispy Chicken Wings",
        price: 3500.00,
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=200&q=80",
        description: "6 pieces with buffalo sauce."
    },
    {
        id: 3,
        name: "Margherita Pizza",
        price: 6000.00,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=200&q=80",
        description: "Fresh basil, mozzarella, and tomato."
    },
    {
        id: 4,
        name: "Fresh Caesar Salad",
        price: 2500.00,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=200&q=80",
        description: "Romaine, croutons, parmesan, dressing."
    },
    {
        id: 5,
        name: "Loaded Fries",
        price: 1500.00,
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=200&q=80",
        description: "Melted cheese, bacon bits, green onions."
    },
    {
        id: 6,
        name: "Gourmet Brownie",
        price: 1200.00,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=200&q=80",
        description: "Rich chocolate with walnuts."
    }
];

const CURRENCY = "₦";

let cart = {};

const menuGrid = document.getElementById('menu-grid');
const cartItemsList = document.getElementById('cart-items-list');
const totalPriceEl = document.getElementById('total-price');
const whatsappBtn = document.getElementById('whatsapp-btn');
const floatingCart = document.getElementById('floating-cart');
const cartCount = document.getElementById('cart-count');
const orderForm = document.getElementById('order-form');

// Initialize Menu
function initMenu() {
    menuItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-img">
            <div class="item-info">
                <div>
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-price">${CURRENCY}${item.price.toLocaleString()}</p>
                </div>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Order</button>
            </div>
        `;
        menuGrid.appendChild(itemEl);
    });
}

// Add to Cart
window.addToCart = (id) => {
    const item = menuItems.find(i => i.id === id);
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = { ...item, quantity: 1 };
    }
    updateUI();
};

// Update UI
function updateUI() {
    // Update Cart List
    cartItemsList.innerHTML = '';
    let total = 0;
    let count = 0;
    const itemIds = Object.keys(cart);

    if (itemIds.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-msg">No items added yet</p>';
        whatsappBtn.disabled = true;
        floatingCart.classList.add('hidden');
    } else {
        itemIds.forEach(id => {
            const item = cart[id];
            total += item.price * item.quantity;
            count += item.quantity;

            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <span>${item.quantity}x ${item.name}</span>
                <span>${CURRENCY}${(item.price * item.quantity).toLocaleString()}</span>
            `;
            cartItemsList.appendChild(row);
        });
        whatsappBtn.disabled = false;
        floatingCart.classList.remove('hidden');
    }

    totalPriceEl.textContent = `${CURRENCY}${total.toLocaleString()}`;
    cartCount.textContent = count;
}

// Handle Form Submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    let itemsText = "";
    let total = 0;
    Object.keys(cart).forEach(id => {
        const item = cart[id];
        itemsText += `- ${item.quantity}x ${item.name} (${CURRENCY}${(item.price * item.quantity).toLocaleString()})\n`;
        total += item.price * item.quantity;
    });

    const message = `*QuickBite New Order*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Address: ${address}\n\n` +
        `*Order Summary:*\n` +
        `${itemsText}\n` +
        `*Grand Total: ${CURRENCY}${total.toLocaleString()}*\n\n` +
        `Please confirm my order. Thank you!`;

    // Replace the phone number with the restaurant's actual WhatsApp number
    // For demo purposes, we'll just open the link. 
    // In production, the restaurant would define their number in a constant.
    const restaurantPhone = "1234567890"; // Dummy number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
});

initMenu();
