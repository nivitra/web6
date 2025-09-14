// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const solutionPanels = document.querySelectorAll('.solution-panel');

    // Ensure initial state is correct
    tabButtons.forEach(btn => btn.classList.remove('active'));
    solutionPanels.forEach(panel => panel.classList.remove('active'));
    
    // Set first tab as active
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        document.getElementById('solution1').classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            console.log('Switching to tab:', targetTab); // Debug log

            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            solutionPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                console.log('Panel activated:', targetTab); // Debug log
            }
            
            // Scroll to top smoothly
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });

    // Initialize all functionality
    initializeCartFunctionality();
    initializeBootstrapCartFunctionality();
    initializeFormValidation();
    initializeBootstrapFormValidation();
    initializeTooltips();
    
    // Auto-resize textareas
    autoResizeTextareas();
});

// Code copying functionality with better feedback
function copyCode(elementId) {
    const codeArea = document.getElementById(elementId);
    if (!codeArea) {
        console.error('Code area not found:', elementId);
        return;
    }
    
    // Select the text
    codeArea.select();
    codeArea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        const successful = document.execCommand('copy');
        
        // Find the copy button for this code area
        const copyBtn = codeArea.nextElementSibling;
        if (copyBtn && copyBtn.classList.contains('copy-btn')) {
            const originalText = copyBtn.textContent;
            const originalBg = copyBtn.style.backgroundColor;
            
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#28a745';
            copyBtn.style.color = 'white';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = originalBg;
                copyBtn.style.color = '';
            }, 2000);
        }
        
        if (!successful) {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Failed to copy code: ', err);
        
        // Fallback using newer Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(codeArea.value).then(function() {
                console.log('Copying to clipboard was successful!');
            }, function(err) {
                console.error('Could not copy text: ', err);
                alert('Failed to copy code. Please select and copy manually.');
            });
        } else {
            alert('Failed to copy code. Please select and copy manually.');
        }
    }
}

// Form validation for Solution 2 (Login with JS)
function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted'); // Debug log
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            
            if (!email || !password || !emailError || !passwordError) {
                console.error('Form elements not found');
                return;
            }
            
            // Reset error messages
            emailError.textContent = '';
            emailError.classList.remove('show');
            passwordError.textContent = '';
            passwordError.classList.remove('show');
            
            let isValid = true;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
                isValid = false;
                console.log('Email validation failed'); // Debug log
            }
            
            // Password validation
            if (password.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long';
                passwordError.classList.add('show');
                isValid = false;
                console.log('Password validation failed'); // Debug log
            }
            
            if (isValid) {
                alert('Login successful!');
                console.log('Login validation passed'); // Debug log
            }
        });
    }
}

// Bootstrap form validation for Solution 5
function initializeBootstrapFormValidation() {
    const bsLoginForm = document.getElementById('bsLoginForm');
    
    if (bsLoginForm) {
        bsLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Bootstrap login form submitted'); // Debug log
            
            const email = document.getElementById('bsLoginEmail');
            const password = document.getElementById('bsLoginPassword');
            const emailError = document.getElementById('bsEmailError');
            const passwordError = document.getElementById('bsPasswordError');
            
            if (!email || !password || !emailError || !passwordError) {
                console.error('Bootstrap form elements not found');
                return;
            }
            
            // Reset validation states
            email.classList.remove('is-invalid', 'is-valid');
            password.classList.remove('is-invalid', 'is-valid');
            emailError.textContent = '';
            passwordError.textContent = '';
            
            let isValid = true;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                email.classList.add('is-valid');
            }
            
            // Password validation
            if (password.value.length < 6) {
                password.classList.add('is-invalid');
                passwordError.textContent = 'Password must be at least 6 characters long';
                isValid = false;
            } else {
                password.classList.add('is-valid');
            }
            
            if (isValid) {
                alert('Bootstrap Login successful!');
            }
        });
    }
}

// Cart functionality for Solution 3 (Regular CSS)
function initializeCartFunctionality() {
    let cart = [];
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            const productPrice = parseInt(this.getAttribute('data-price'));
            
            addItemToCart(productName, productPrice);
            console.log('Added to cart:', productName, productPrice); // Debug log
        });
    });

    function addItemToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        updateCartDisplay();
    }

    function removeItemFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCartDisplay();
    }

    function updateQuantity(name, change) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItemFromCart(name);
            } else {
                updateCartDisplay();
            }
        }
    }

    function updateCartDisplay() {
        if (!cartItemsContainer || !cartTotalElement) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Cart is empty</p>';
            cartTotalElement.textContent = '0';
            return;
        }

        let cartHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        $${item.price} x ${item.quantity} = $${itemTotal}
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.name}', 1)">+</button>
                        <button class="remove-item" onclick="removeCartItem('${item.name}')">Remove</button>
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        cartTotalElement.textContent = total;
    }

    // Make functions globally accessible
    window.updateCartQuantity = function(name, change) {
        updateQuantity(name, change);
    };

    window.removeCartItem = function(name) {
        removeItemFromCart(name);
    };
}

// Bootstrap cart functionality for Solution 6
function initializeBootstrapCartFunctionality() {
    let bsCart = [];
    const bsCartItemsContainer = document.getElementById('bsCartItems');
    const bsCartTotalElement = document.getElementById('bsCartTotal');
    const bsAddToCartButtons = document.querySelectorAll('.bs-add-to-cart');

    bsAddToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            const productPrice = parseInt(this.getAttribute('data-price'));
            
            addItemToBsCart(productName, productPrice);
            console.log('Added to BS cart:', productName, productPrice); // Debug log
        });
    });

    function addItemToBsCart(name, price) {
        const existingItem = bsCart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            bsCart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        updateBsCartDisplay();
    }

    function removeItemFromBsCart(name) {
        bsCart = bsCart.filter(item => item.name !== name);
        updateBsCartDisplay();
    }

    function updateBsQuantity(name, change) {
        const item = bsCart.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItemFromBsCart(name);
            } else {
                updateBsCartDisplay();
            }
        }
    }

    function updateBsCartDisplay() {
        if (!bsCartItemsContainer || !bsCartTotalElement) return;
        
        if (bsCart.length === 0) {
            bsCartItemsContainer.innerHTML = '<p>Cart is empty</p>';
            bsCartTotalElement.textContent = '0';
            return;
        }

        let cartHTML = '';
        let total = 0;

        bsCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="d-flex justify-content-between align-items-center mb-2 p-2" style="border: 1px solid black;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>$${item.price} x ${item.quantity} = $${itemTotal}</small>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                        <button class="btn btn-sm btn-outline-dark" onclick="updateBsCartQuantity('${item.name}', -1)" style="border: 1px solid black; color: black;">-</button>
                        <span class="mx-1">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-dark" onclick="updateBsCartQuantity('${item.name}', 1)" style="border: 1px solid black; color: black;">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeBsCartItem('${item.name}')" style="border: 1px solid black; color:black;">×</button>
                    </div>
                </div>
            `;
        });

        bsCartItemsContainer.innerHTML = cartHTML;
        bsCartTotalElement.textContent = total;
    }

    // Make functions globally accessible
    window.updateBsCartQuantity = function(name, change) {
        updateBsQuantity(name, change);
    };

    window.removeBsCartItem = function(name) {
        removeItemFromBsCart(name);
    };
}

// Initialize tooltips for better UX
function initializeTooltips() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.title = 'Click to copy code to clipboard';
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.title = 'Click to view this solution';
    });
}

// Auto-resize textareas
function autoResizeTextareas() {
    const textareas = document.querySelectorAll('.code-area');
    textareas.forEach(textarea => {
        // Set a reasonable height for code areas
        const lineHeight = 20; // approximate line height
        const lines = textarea.value.split('\n').length;
        const height = Math.max(200, Math.min(400, lines * lineHeight + 40));
        textarea.style.height = height + 'px';
    });
}

// Handle form submissions for demo purposes
document.addEventListener('submit', function(e) {
    const form = e.target;
    console.log('Form submitted:', form.id); // Debug log
    
    // Don't prevent login forms since they have custom handlers
    if (form.id !== 'loginForm' && form.id !== 'bsLoginForm') {
        e.preventDefault();
        
        // Show success message for registration forms
        if (form.querySelector('input[name="fullname"]') || form.querySelector('input[id*="ullname"]') || form.querySelector('input[id*="Fullname"]')) {
            alert('Registration form submitted successfully! (Demo only)');
            console.log('Registration form submitted'); // Debug log
        }
    }
});

// Add keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('tab-btn')) {
        const tabs = Array.from(document.querySelectorAll('.tab-btn'));
        const currentIndex = tabs.indexOf(e.target);
        
        let newIndex;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            e.preventDefault();
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.target.click();
            e.preventDefault();
        }
        
        if (newIndex !== undefined) {
            tabs[newIndex].focus();
        }
    }
});

// Make copy function globally available
window.copyCode = copyCode;

// Debug function to check if elements exist
function debugElements() {
    console.log('Tab buttons found:', document.querySelectorAll('.tab-btn').length);
    console.log('Solution panels found:', document.querySelectorAll('.solution-panel').length);
    console.log('Copy buttons found:', document.querySelectorAll('.copy-btn').length);
    console.log('Add to cart buttons found:', document.querySelectorAll('.add-to-cart').length);
}

// Run debug on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(debugElements, 1000);
});