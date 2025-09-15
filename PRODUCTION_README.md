# 🚀 Midas Technical Solutions - Production Setup Guide

This guide will help you set up the production-ready e-commerce platform with Stripe payments, RepairDesk integration, and database backend.

## 📋 Prerequisites

- Node.js 16+ and npm 8+
- MySQL 8.0+ or MariaDB 10.5+
- Stripe account
- RepairDesk account
- Gmail account (for email notifications)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/CorporateGuuu/midastechnial.git
cd midastechnial
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your actual configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=midas_technical

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# RepairDesk API Configuration
REPAIRDESK_API_KEY=your_actual_repairdesk_api_key
REPAIRDESK_BASE_URL=https://api.repairdesk.co/api/web/v1

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Other settings...
```

### 3. Database Setup

Create the MySQL database:

```sql
CREATE DATABASE midas_technical;
```

The application will automatically create the required tables when it starts.

### 4. Stripe Setup

1. **Create Stripe Account**: Go to [stripe.com](https://stripe.com) and create an account
2. **Get API Keys**: In your Stripe dashboard, go to Developers → API keys
3. **Configure Webhooks**: Add webhook endpoint for payment confirmations
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 5. RepairDesk Setup

1. **Get API Key**: Contact RepairDesk support or check your account settings
2. **Configure Integration**: Update the API key in your `.env` file

### 6. Email Setup (Gmail)

1. **Enable 2FA**: Go to your Google Account settings
2. **Generate App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your `.env` file

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on port 3000 (or your configured PORT).

## 🔄 Data Synchronization

### Sync Products from RepairDesk

```bash
npm run sync-repairdesk
```

This will:
- Fetch all products from RepairDesk
- Update local database with latest inventory
- Sync product information and stock levels

### Manual Sync Options

```javascript
const RepairDeskIntegration = require('./api/repairdesk-integration.js');
const rd = new RepairDeskIntegration();

// Sync all products
await rd.syncProducts();

// Sync inventory levels only
await rd.syncInventory();

// Full sync (products + inventory)
await rd.fullSync();
```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products?category=iphone` - Filter by category
- `GET /api/products?search=battery` - Search products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get orders (requires authentication)
- `GET /api/orders?user_id=123` - Get user orders

### Payments
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/webhook` - Stripe webhook handler

## 🛒 Shopping Cart Integration

The cart system now uses:
- **Database storage** instead of localStorage
- **Real-time inventory validation**
- **Automatic stock updates** on purchase
- **Persistent cart** across sessions

### Cart Features
- ✅ Add/remove items
- ✅ Update quantities
- ✅ Real-time total calculation
- ✅ Inventory validation
- ✅ Persistent across browser sessions
- ✅ Automatic cleanup of expired carts

## 💳 Payment Processing

### Stripe Integration Features
- ✅ Secure payment processing
- ✅ Multiple payment methods (cards, digital wallets)
- ✅ PCI compliance
- ✅ Webhook handling for payment confirmations
- ✅ Automatic order status updates
- ✅ Failed payment handling

### Payment Flow
1. User adds items to cart
2. User proceeds to checkout
3. System validates cart items and inventory
4. Stripe payment intent is created
5. User completes payment
6. Order is created in database
7. Inventory is updated
8. Email confirmation is sent

## 📧 Email Notifications

### Automatic Emails
- ✅ Order confirmation emails
- ✅ Shipping notifications (when implemented)
- ✅ Payment failure notifications

### Email Templates
Emails are sent using HTML templates with:
- Order details and items
- Customer information
- Shipping address
- Total amounts
- Company branding

## 🔄 Inventory Management

### Features
- ✅ Real-time inventory tracking
- ✅ Automatic stock updates on sales
- ✅ Low stock alerts (can be configured)
- ✅ Inventory transaction logging
- ✅ RepairDesk synchronization

### Inventory Sync Process
1. Products are synced from RepairDesk daily/hourly
2. Stock levels are updated in real-time
3. Sales automatically decrement inventory
4. Transaction logs track all inventory changes

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (HTML/CSS/JS) │◄──►│   (Node.js)     │◄──►│   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Stripe        │    │   RepairDesk    │    │   Email Service │
│   Payments      │    │   Inventory     │    │   (Gmail)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | Database host | Yes |
| `DB_USER` | Database username | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `DB_NAME` | Database name | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `REPAIRDESK_API_KEY` | RepairDesk API key | Yes |
| `EMAIL_USER` | Gmail address | Yes |
| `EMAIL_PASS` | Gmail app password | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |

### Database Tables

The system automatically creates these tables:
- `users` - Customer accounts
- `products` - Product catalog
- `orders` - Order records
- `order_items` - Order line items
- `inventory_transactions` - Stock movement logs

## 🚀 Deployment

### Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up SSL certificate
- [ ] Configure Stripe webhooks for production
- [ ] Set up email service (consider SendGrid for production)
- [ ] Configure backup system
- [ ] Set up monitoring and logging
- [ ] Configure firewall and security groups

### Recommended Production Stack

- **Web Server**: Nginx reverse proxy
- **Process Manager**: PM2
- **Database**: MySQL 8.0+ or AWS RDS
- **File Storage**: AWS S3 (for product images)
- **Email**: SendGrid or AWS SES
- **Monitoring**: DataDog or New Relic

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check MySQL service
   sudo systemctl status mysql

   # Test connection
   mysql -u your_user -p your_database
   ```

2. **Stripe Webhooks Not Working**
   - Verify webhook endpoint URL
   - Check webhook secret in `.env`
   - Ensure server is accessible from Stripe

3. **Email Not Sending**
   - Verify Gmail app password
   - Check spam folder
   - Ensure less secure apps is enabled (or use OAuth)

4. **RepairDesk Sync Failing**
   - Verify API key
   - Check RepairDesk service status
   - Review API rate limits

## 📈 Monitoring & Maintenance

### Regular Tasks
- Daily RepairDesk synchronization
- Weekly database backups
- Monthly security updates
- Performance monitoring

### Logs
- Server logs: Check console output
- Database logs: Check MySQL error logs
- Payment logs: Check Stripe dashboard
- Email logs: Check sent emails

## 🤝 Support

For support and questions:
- 📧 Email: support@midastechnical.com
- 📞 Phone: +1 (240) 351-0511
- 🐛 GitHub Issues: Report bugs and feature requests

---

## 🎯 Next Steps

1. **Complete Setup**: Follow the installation steps above
2. **Test Payments**: Use Stripe test cards for testing
3. **Configure RepairDesk**: Set up product synchronization
4. **Deploy**: Move to production environment
5. **Monitor**: Set up monitoring and alerts

The system is now production-ready with enterprise-level features including secure payments, inventory management, and automated email notifications! 🚀
