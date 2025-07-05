// Sample product data
        const products = [
            {
                id: 1,
                title: "Light Brown Coat",
                price: 25.00,
                originalPrice: 50.00,
                rating: 4.8,
                image: "images/Light Brown Coat.png",
                discount: "25% off",
                category: "women"
            },
            {
                id: 2,
                title: "Dark Black Top",
                price: 25.00,
                originalPrice: 50.00,
                rating: 4.8,
                image: "images/Dark Black Top.png",
                discount: "25% off",
                category: "women"
            },
            {
                id: 3,
                title: "Stylish Winter Jacket",
                price: 45.00,
                originalPrice: 80.00,
                rating: 4.9,
                image: "images/Stylish Winter Jacket.png",
                discount: "30% off",
                category: "men"
            },
            {
                id: 4,
                title: "Premium Denim Shirt",
                price: 35.00,
                originalPrice: 60.00,
                rating: 4.7,
                image: "images/Premium Denim Shirt.png",
                discount: "20% off",
                category: "men"
            },
            {
                id: 5,
                title: "Elegant Evening Dress",
                price: 65.00,
                originalPrice: 120.00,
                rating: 4.9,
                image: "images/Elegant Evening Dress.jpg",
                discount: "45% off",
                category: "women"
            },
            {
                id: 6,
                title: "Casual Summer Tee",
                price: 15.00,
                originalPrice: 25.00,
                rating: 4.6,
                image: "images/Casual Summer Tee.png",
                discount: "40% off",
                category: "men"
            }
        ];

        // Cart functionality
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // DOM elements
        const themeToggle = document.getElementById('themeToggle');
        const cartCount = document.getElementById('cartCount');
        const productsGrid = document.getElementById('productsGrid');

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            initializeTheme();
            loadProducts();
            updateCartCount();
            startCountdown();
            setupScrollAnimations();
        });

        // Theme functionality
        function initializeTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        }

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Product loading
        function loadProducts() {
            productsGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-badge">${product.discount}</div>
                        <div class="product-actions">
                            <button class="action-btn" onclick="toggleWishlist(${product.id})">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="action-btn" onclick="quickView(${product.id})">
                                <i class="far fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-rating">
                            <div class="stars">
                                ${generateStars(product.rating)}
                            </div>
                            <span class="rating-text">${product.rating}</span>
                        </div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            return stars;
        }

        // Cart functionality
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartCount();
            saveCart();
            showNotification('Item added to cart!');
        }

        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Wishlist functionality
        function toggleWishlist(productId) {
            showNotification('Added to wishlist!');
        }

        function quickView(productId) {
            showNotification('Quick view feature coming soon!');
        }

        // Countdown timer
        function startCountdown() {
            const countdownDate = new Date().getTime() + (36 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000) + (52 * 60 * 1000);
            
            const timer = setInterval(function() {
                const now = new Date().getTime();
                const distance = countdownDate - now;
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = hours;
                document.getElementById('minutes').textContent = minutes;
                
                if (distance < 0) {
                    clearInterval(timer);
                    document.getElementById('countdown').innerHTML = '<p>Offer Expired!</p>';
                }
            }, 1000);
        }

        // Scroll animations
        function setupScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.product-card, .feature-card, .category-card').forEach(el => {
                observer.observe(el);
            });
        }

        // Utility functions
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 90px;
                right: 20px;
                background: var(--success-color);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
                box-shadow: var(--shadow-lg);
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        function closeTopBar() {
            document.getElementById('topBar').style.display = 'none';
        }

        // Event listeners
        themeToggle.addEventListener('click', toggleTheme);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add CSS animation for notifications
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
        `;
        document.head.appendChild(style);