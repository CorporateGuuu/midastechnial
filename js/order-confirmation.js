/**
 * Order Confirmation Page JavaScript
 * Handles order confirmation display and order details
 */

class OrderConfirmationManager {
    constructor() {
        this.orderId = null;
        this.orderData = null;

        this.init();
    }

    init() {
        this.getOrderIdFromUrl();
        this.loadOrderData();
    }

    getOrderIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        this.orderId = urlParams.get('order');

        if (!this.orderId) {
            this.showError('Order ID not found. Redirecting to homepage...');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 3000);
            return;
        }
    }

    async loadOrderData() {
        try {
            // Show loading state
            this.showLoading(true);

            // Load order data from localStorage (in production, this would be from server)
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            this.orderData = orders.find(order => order.id == this.orderId);

            if (!this.orderData) {
                this.showError('Order not found. Redirecting to homepage...');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 3000);
                return;
            }

            this.displayOrderConfirmation();

        } catch (error) {
            console.error('Error loading order data:', error);
            this.showError('Failed to load order details');
        } finally {
            this.showLoading(false);
        }
    }

    displayOrderConfirmation() {
        if (!this.orderData) return;

        // Update order number
        const orderNumberElement = document.getElementById('order-number');
        if (orderNumberElement) {
            orderNumberElement.textContent = `#ORD-${this.orderData.id.toString().padStart(6, '0')}`;
        }

        // Update order date
        const orderDateElement = document.getElementById('order-date');
        if (orderDateElement) {
            const orderDate = new Date(this.orderData.orderDate);
            orderDateElement.textContent = `Order placed on ${orderDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}`;
        }

        // Display order items
        this.displayOrderItems();

        // Display shipping information
        this.displayShippingInfo();

        // Display order summary
        this.displayOrderSummary();
    }

    displayOrderItems() {
        const orderItemsContainer = document.getElementById('order-items-list');
        if (!orderItemsContainer) return;

        const itemsHtml = this.orderData.items.map(item => `
            <div class="confirmation-order-item">
                <div class="item-image">
                    <img src="${item.image || 'https://via.placeholder.com/80x80?text=No+Image'}" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-sku">SKU: ${item.sku || 'N/A'}</p>
                    <p class="item-price">$${item.price.toFixed(2)} each</p>
                    <p class="item-quantity">Quantity: ${item.quantity}</p>
                </div>
                <div class="item-total">
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        orderItemsContainer.innerHTML = itemsHtml;
    }

    displayShippingInfo() {
        const shippingContainer = document.getElementById('shipping-details');
        if (!shippingContainer) return;

        const shipping = this.orderData.shippingAddress;
        const customer = this.orderData.customerInfo;

        const shippingHtml = `
            <div class="shipping-address">
                <h4>Shipping Address</h4>
                <p><strong>${customer.firstName} ${customer.lastName}</strong></p>
                <p>${shipping.address}</p>
                ${shipping.address2 ? `<p>${shipping.address2}</p>` : ''}
                <p>${shipping.city}, ${shipping.state} ${shipping.zipcode}</p>
            </div>
            <div class="shipping-method">
                <h4>Shipping Method</h4>
                <p>Standard Shipping (3-5 business days)</p>
                <p>Tracking information will be sent via email</p>
            </div>
            <div class="contact-info">
                <h4>Contact Information</h4>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
            </div>
        `;

        shippingContainer.innerHTML = shippingHtml;
    }

    displayOrderSummary() {
        const summaryContainer = document.getElementById('order-summary-content');
        if (!summaryContainer) return;

        const totals = this.orderData.totals;

        const summaryHtml = `
            <div class="summary-row">
                <span>Subtotal (${this.orderData.items.length} items):</span>
                <span>$${totals.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax:</span>
                <span>$${totals.tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${totals.shipping === 0 ? 'FREE' : '$' + totals.shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${totals.total.toFixed(2)}</span>
            </div>
            <div class="payment-method-summary">
                <h4>Payment Method</h4>
                <p>${this.orderData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}</p>
            </div>
        `;

        summaryContainer.innerHTML = summaryHtml;
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = show ? 'flex' : 'none';
        }
    }

    showError(message) {
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Order Not Found</h2>
            <p>${message}</p>
            <a href="../index.html" class="btn-primary">Return to Homepage</a>
        `;

        // Replace main content with error
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
            main.appendChild(errorDiv);
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
    new OrderConfirmationManager();
});
