// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});

// Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total-amount');
    const checkoutButton = document.querySelector('.checkout-button');
    const buyButtons = document.querySelectorAll('.buy-button');

    // فتح السلة
    cartButton.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartDisplay();
    });

    // إغلاق السلة
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // إغلاق السلة عند النقر خارجها
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // إضافة المنتج إلى السلة
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const product = {
                id: Date.now(), // معرف فريد
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('h4').textContent,
                price: parseInt(productCard.querySelector('.price').textContent),
                quantity: 1
            };

            addToCart(product);
        });
    });

    // إضافة منتج إلى السلة
    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(product);
        }

        updateCartCount();
        updateCartDisplay();
        showNotification('تمت إضافة المنتج إلى السلة');
    }

    // تحديث عدد العناصر في السلة
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // تحديث عرض السلة
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} درهم</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">🗑️</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(itemElement);
        });

        cartTotal.textContent = `${total} درهم`;

        // إضافة مستمعي الأحداث لأزرار الكمية
        addQuantityButtonListeners();
    }

    // إضافة مستمعي الأحداث لأزرار الكمية
    function addQuantityButtonListeners() {
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const removeButtons = document.querySelectorAll('.remove-btn');

        plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity++;
                    updateCartCount();
                    updateCartDisplay();
                }
            });
        });

        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                const item = cart.find(item => item.id === id);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    updateCartCount();
                    updateCartDisplay();
                }
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                cart = cart.filter(item => item.id !== id);
                updateCartCount();
                updateCartDisplay();
                showNotification('تم حذف المنتج من السلة');
            });
        });
    }

    // عرض إشعار
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // زر إتمام الشراء
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('السلة فارغة');
            return;
        }
        
        // يمكن إضافة المزيد من المنطق هنا للتعامل مع عملية الشراء
        showNotification('تم إتمام عملية الشراء بنجاح');
        cart = [];
        updateCartCount();
        updateCartDisplay();
        cartModal.classList.remove('active');
    });
});