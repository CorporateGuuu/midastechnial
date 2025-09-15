/**
 * Checkout Page JavaScript
 * Handles checkout form validation, payment processing, and order completion
 */

class CheckoutManager {
    constructor() {
        this.cart = [];
        this.currentUser = null;
        this.paymentMethod = 'card';

        this.init();
    }

    init() {
        this.loadCartData();
        this.loadUserData();
        this.setupEventListeners();
        this.displayOrderSummary();
        this.setupFormValidation();
    }

    async loadCartData() {
        try {
            // Load cart from localStorage as fallback
            this.cart = JSON.parse(localStorage.getItem('cart') || '[]');

            if (this.cart.length === 0) {
                alert('Your cart is empty. Redirecting to products page...');
                window.location.href = 'products.html';
                return;
            }

            // Validate cart items with server
            await this.validateCartItems();
        } catch (error) {
            console.error('Error loading cart data:', error);
            alert('Error loading cart. Please try again.');
            window.location.href = 'cart.html';
        }
    }

    loadUserData() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

        // Pre-fill user information if logged in
        if (this.currentUser) {
            this.prefillUserInfo();
        }
    }

    prefillUserInfo() {
        const user = this.currentUser;

        // Pre-fill billing information
        document.getElementById('first-name').value = user.firstName || '';
        document.getElementById('last-name').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
    }

    setupEventListeners() {
        // Payment method selection
        const paymentOptions = document.querySelectorAll('.payment-method-option');
        paymentOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectPaymentMethod(option.dataset.method);
            });
        });

        // Form submission
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processOrder();
            });
        }

        // Card number formatting
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                this.formatCardNumber(e.target);
            });
        }

        // Expiry date formatting
        const expiryInput = document.getElementById('expiry-date');
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => {
                this.formatExpiryDate(e.target);
            });
        }

        // CVV validation
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                this.validateCVV(e.target);
            });
        }

        // Same address checkbox
        const sameAddressCheckbox = document.getElementById('same-address');
        if (sameAddressCheckbox) {
            sameAddressCheckbox.addEventListener('change', (e) => {
                this.toggleBillingAddress(e.target.checked);
            });
        }
    }

    selectPaymentMethod(method) {
        this.paymentMethod = method;

        // Update UI
        const paymentOptions = document.querySelectorAll('.payment-method-option');
        paymentOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.method === method);
        });

        // Show/hide payment forms
        const cardForm = document.getElementById('card-payment-form');
        const paypalForm = document.getElementById('paypal-payment-form');

        if (cardForm && paypalForm) {
            if (method === 'card') {
                cardForm.classList.remove('hidden');
                paypalForm.classList.add('hidden');
            } else {
                cardForm.classList.add('hidden');
                paypalForm.classList.remove('hidden');
            }
        }
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';

        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }

        input.value = formattedValue;
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    validateCVV(input) {
        input.value = input.value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    toggleBillingAddress(sameAsShipping) {
        // For now, just log the action
        // In a full implementation, this would show/hide billing address fields
        console.log('Same address:', sameAsShipping);
    }

    setupFormValidation() {
        // Add real-time validation for form fields
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = value !== '';

        field.classList.toggle('invalid', !isValid);
        field.classList.toggle('valid', isValid);

        return isValid;
    }

    displayOrderSummary() {
        this.displayOrderItems();
        this.displayOrderTotals();
    }

    displayOrderItems() {
        const orderItemsContainer = document.getElementById('order-items');
        if (!orderItemsContainer) return;

        const itemsHtml = this.cart.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image || 'https://via.placeholder.com/60x60?text=No+Image'}" alt="${item.name}" loading="lazy">
                </div>
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p class="order-item-price">$${item.price.toFixed(2)} each</p>
                    <p class="order-item-quantity">Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-total">
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        orderItemsContainer.innerHTML = itemsHtml;
    }

    displayOrderTotals() {
        const orderTotalsContainer = document.getElementById('order-totals');
        if (!orderTotalsContainer) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 99 ? 0 : 9.99;
        const total = subtotal + tax + shipping;

        const totalsHtml = `
            <div class="order-total-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="order-total-row">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="order-total-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="order-total-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;

        orderTotalsContainer.innerHTML = totalsHtml;
    }

    async validateCartItems() {
        // Validate that cart items are still available and prices are current
        try {
            const response = await fetch('/api/products');
            const result = await response.json();

            if (result.success) {
                const availableProducts = result.data;
                const productMap = new Map(availableProducts.map(p => [p.id, p]));

                // Check each cart item
                for (const item of this.cart) {
                    const product = productMap.get(item.id);
                    if (!product) {
                        throw new Error(`Product ${item.name} is no longer available`);
                    }
                    if (product.stock_quantity < item.quantity) {
                        throw new Error(`Insufficient stock for ${item.name}`);
                    }
                    // Update price if changed
                    if (product.price !== item.price) {
                        item.price = product.price;
                        this.showNotification(`Price updated for ${item.name}`, 'info');
                    }
                }

                // Save updated cart
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        } catch (error) {
            console.error('Cart validation error:', error);
            this.showNotification('Some items in your cart may have changed', 'warning');
        }
    }

    async processOrder() {
        if (!this.validateForm()) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        this.showLoading(true);

        try {
            // Calculate total amount
            const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.08;
            const shipping = subtotal > 99 ? 0 : 9.99;
            const total = subtotal + tax + shipping;

            // Create Stripe Payment Intent
            const paymentIntentResponse = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total,
                    currency: 'usd',
                    metadata: {
                        order_type: 'ecommerce'
                    }
                })
            });

            const paymentIntentData = await paymentIntentResponse.json();

            if (!paymentIntentData.success) {
                throw new Error('Failed to create payment intent');
            }

            // For testing, we'll simulate successful payment
            // In production, uncomment the Stripe Elements code below

            /*
            // Initialize Stripe Elements
            const stripe = Stripe('pk_test_51RTmYkRx3fwBLMJmgcMkHVlzxSyJmzpQKC1544i1x5w4PHumNalgnDABvo4vRKvU7dklT1Ad2sHmouUCUl1jTOsQ00XGMsFGtv');
            const elements = stripe.elements();

            // Create card element
            const cardElement = elements.create('card');
            cardElement.mount('#card-element');

            // Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                paymentIntentData.clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: `${document.getElementById('first-name').value} ${document.getElementById('last-name').value}`,
                            email: document.getElementById('email').value,
                        },
                    },
                }
            );

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent.status !== 'succeeded') {
                throw new Error('Payment was not successful');
            }
            */

            // Simulate successful payment for testing
            const paymentIntent = {
                id: `pi_test_${Date.now()}`,
                status: 'succeeded'
            };

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent.status === 'succeeded') {
                // Create order in database
                const orderData = this.createOrderData();
                orderData.stripe_payment_id = paymentIntent.id;

                const orderResponse = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });

                const orderResult = await orderResponse.json();

                if (orderResult.success) {
                    // Clear cart
                    localStorage.removeItem('cart');

                    // Redirect to order confirmation
                    window.location.href = `order-confirmation.html?order=${orderResult.order_id}`;
                } else {
                    throw new Error('Failed to create order');
                }
            } else {
                throw new Error('Payment was not successful');
            }

        } catch (error) {
            console.error('Order processing error:', error);
            this.showNotification(error.message || 'Payment failed. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    validateForm() {
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Additional validation for payment fields
        if (this.paymentMethod === 'card') {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (cardNumber.length < 13 || cardNumber.length > 19) {
                isValid = false;
                this.showFieldError('card-number', 'Invalid card number');
            }

            if (!this.validateExpiryDate(expiryDate)) {
                isValid = false;
                this.showFieldError('expiry-date', 'Invalid expiry date');
            }

            if (cvv.length < 3 || cvv.length > 4) {
                isValid = false;
                this.showFieldError('cvv', 'Invalid CVV');
            }
        }

        return isValid;
    }

    validateExpiryDate(expiryDate) {
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        if (expMonth < 1 || expMonth > 12) return false;
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;

        return true;
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('invalid');

            // Remove existing error message
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }

            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }

    async processPayment() {
        // Simulate payment processing delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Payment declined'));
                }
            }, 2000);
        });
    }

    createOrderData() {
        const formData = new FormData(document.getElementById('checkout-form'));
        const orderData = {
            id: Date.now(),
            customerInfo: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            shippingAddress: {
                address: formData.get('address'),
                address2: formData.get('address2'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipcode: formData.get('zipcode')
            },
            paymentMethod: this.paymentMethod,
            items: this.cart,
            orderNotes: formData.get('orderNotes'),
            orderDate: new Date().toISOString(),
            status: 'processing'
        };

        // Calculate totals
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const shipping = subtotal > 99 ? 0 : 9.99;
        const total = subtotal + tax + shipping;

        orderData.totals = {
            subtotal,
            tax,
            shipping,
            total
        };

        return orderData;
    }

    async saveOrder(orderData) {
        // Save to localStorage (in production, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        return {
            success: true,
            orderId: orderData.id
        };
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = show ? 'flex' : 'none';
        }

        // Disable/enable form
        const form = document.getElementById('checkout-form');
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea, button');
            inputs.forEach(input => {
                input.disabled = show;
            });
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutManager();
});
