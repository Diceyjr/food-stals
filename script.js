const menuItems = [
    {
        id: 1,
        name: "Jollof Rice",
        price: 2500.00,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&q=80",
        description: "Classic Nigerian jollof rice."
    },
    {
        id: 2,
        name: "Fried Rice",
        price: 2500.00,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=200&q=80",
        description: "Tasty fried rice with veggies."
    },
    {
        id: 3,
        name: "White Rice & Sauce",
        price: 2000.00,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=200&q=80",
        description: "Steamed rice with rich sauce."
    },
    {
        id: 4,
        name: "Eba & Egusi Soup",
        price: 3000.00,
        image: "https://images.unsplash.com/photo-1625944237082-6c8f7c1a3b2f?auto=format&fit=crop&w=200&q=80",
        description: "Eba served with egusi soup."
    },
    {
        id: 5,
        name: "Amala & Ewedu",
        price: 2800.00,
        image: "https://images.unsplash.com/photo-1633337474564-1d9478b8c7a1?auto=format&fit=crop&w=200&q=80",
        description: "Smooth amala with ewedu."
    },
    {
        id: 6,
        name: "Pounded Yam & Egusi",
        price: 3500.00,
        image: "https://images.unsplash.com/photo-1625944237082-6c8f7c1a3b2f?auto=format&fit=crop&w=200&q=80",
        description: "Soft pounded yam with egusi soup."
    },
    {
        id: 7,
        name: "Okro Soup",
        price: 2000.00,
        image: "https://images.unsplash.com/photo-1625944237082-6c8f7c1a3b2f?auto=format&fit=crop&w=200&q=80",
        description: "Delicious okro soup."
    },
    {
        id: 8,
        name: "Vegetable Soup",
        price: 2200.00,
        image: "https://images.unsplash.com/photo-1625944237082-6c8f7c1a3b2f?auto=format&fit=crop&w=200&q=80",
        description: "Healthy vegetable soup."
    },
    {
        id: 9,
        name: "Yam & Egg Sauce",
        price: 1800.00,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=200&q=80",
        description: "Boiled yam with egg sauce."
    },
    {
        id: 10,
        name: "Starch & Banga Soup",
        price: 3500.00,
        image: "https://images.unsplash.com/photo-1625944237082-6c8f7c1a3b2f?auto=format&fit=crop&w=200&q=80",
        description: "Delta-style starch and banga."
    },
    {
        id: 11,
        name: "Rotisserie Chicken",
        price: 4000.00,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=200&q=80",
        description: "Juicy roasted chicken."
    },
    {
        id: 12,
        name: "Barbecue Chicken",
        price: 3500.00,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=200&q=80",
        description: "Grilled BBQ chicken."
    },
    {
        id: 13,
        name: "Barbecue Turkey",
        price: 5000.00,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=200&q=80",
        description: "Grilled turkey cuts."
    },
    {
        id: 14,
        name: "Beef",
        price: 1000.00,
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=200&q=80",
        description: "Tender beef cuts."
    },
    {
        id: 15,
        name: "Cow Leg",
        price: 1500.00,
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=200&q=80",
        description: "Soft cow leg meat."
    },
    {
        id: 16,
        name: "Kpomo",
        price: 800.00,
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=200&q=80",
        description: "Spicy kpomo."
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

// ✅ REMOVE ITEM (FIXED)
function removeFromCart(id) {
    if (cart[id].quantity > 1) {
        cart[id].quantity -= 1;
    } else {
        delete cart[id];
    }
    updateUI();
}

// Update UI
function updateUI() {
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
                <button onclick="removeFromCart(${id})" class="remove-btn">❌</button>
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

    const restaurantPhone = "1234567890";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
});

initMenu();    {
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

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    cartContainer.innerHTML += `
      <div>
        <span>${item.name} - ₦${item.price}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
}

function removeFromCart(index) {
  if (confirm("Remove this item?")) {
    cart.splice(index, 1);
    renderCart();
  }
}

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
