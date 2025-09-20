const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Email configuration
const emailTransporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Send welcome email to new user
async function sendWelcomeEmail(user) {
  try {
    // Read the welcome email template
    const templatePath = path.join(__dirname, '../emails/welcome-email.html');
    let emailHtml = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    emailHtml = emailHtml.replace('{{customerName}}', `${user.first_name} ${user.last_name}`);
    emailHtml = emailHtml.replace('{{loginUrl}}', `${process.env.BASE_URL || 'http://localhost:3000'}/login`);

    // Send email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Phone Electronics Store',
      html: emailHtml
    });

    console.log(`📧 Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('Welcome email sending error:', error);
  }
}

// Send order confirmation email
async function sendOrderConfirmationEmail(orderId, pool) {
  try {
    // Get order details
    const orderQuery = `
      SELECT o.*, u.email, u.first_name, u.last_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `;
    const orderResult = await pool.query(orderQuery, [orderId]);

    if (orderResult.rows.length === 0) {
      throw new Error('Order not found');
    }

    const order = orderResult.rows[0];

    // Get order items
    const itemsQuery = 'SELECT * FROM order_items WHERE order_id = $1';
    const itemsResult = await pool.query(itemsQuery, [orderId]);

    // Prepare email content
    const emailHtml = `
      <h1>Order Confirmation - Order #${orderId}</h1>
      <p>Thank you for your order, ${order.first_name}!</p>

      <h2>Order Details:</h2>
      <ul>
        ${itemsResult.rows.map(item => `
          <li>${item.product_name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>
        `).join('')}
      </ul>

      <h2>Total: $${order.total_amount}</h2>

      <p>Shipping Address: ${JSON.parse(order.shipping_address || '{}').address || 'N/A'}</p>

      <p>We'll send you another email when your order ships!</p>
    `;

    // Send email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: `Order Confirmation - Order #${orderId}`,
      html: emailHtml
    });

    console.log(`📧 Order confirmation email sent for order ${orderId}`);
  } catch (error) {
    console.error('Order confirmation email sending error:', error);
  }
}

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmationEmail
};
