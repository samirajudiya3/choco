// Shopping cart functionality
let cart = [];
const prices = {
    'dairy-milk': 50,
    'kitkat': 40,
    'perk': 30,
    'munch': 20,
    'eclairs': 10,
    '5star': 35,
    'dairy-silk': 60,
    'fuse': 45
};

// Add to cart functionality
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const brand = productCard.dataset.brand;
        const name = productCard.querySelector('h3').textContent;
        const image = productCard.querySelector('img').src;
        
        addToCart(brand, name, image);
        updateCartDisplay();
        showNotification(`${name} added to cart!`);
    });
});

function addToCart(brand, name, image) {
    const existingItem = cart.find(item => item.brand === brand);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            brand: brand,
            name: name,
            price: prices[brand],
            quantity: 1,
            image: image
        });
    }
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-total">
                <p>₹${itemTotal}</p>
                <button class="remove-btn" data-brand="${item.brand}">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalAmount.textContent = total;
}

// Remove from cart functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const brand = e.target.dataset.brand;
        removeFromCart(brand);
        updateCartDisplay();
    }
});

function removeFromCart(brand) {
    cart = cart.filter(item => item.brand !== brand);
}

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    showNotification('Thank you for your purchase!', 'success');
    cart = [];
    updateCartDisplay();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.backgroundColor = type === 'error' ? '#ff4444' : '#4CAF50';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 