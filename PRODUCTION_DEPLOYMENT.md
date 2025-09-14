# 🚀 Midas Technical Solutions - Production Deployment Guide

## Overview
This guide will help you deploy your Midas Technical Solutions e-commerce website to production using Netlify and Supabase.

## 📋 Prerequisites

### Required Accounts
- **Netlify Account**: [netlify.com](https://netlify.com)
- **Supabase Account**: [supabase.com](https://supabase.com)
- **GitHub Repository**: Your code should be pushed to GitHub

### Required Information
- Supabase Project URL
- Supabase Anon/Public Key
- Company phone number: `+1 (240) 351-0511`
- Business hours: `Mon-Fri: 9PM-10PM EST`

## 🔧 Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details:
   - **Name**: `midas-technical-solutions`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your users

### 1.2 Get Supabase Credentials
1. Go to **Settings > API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon/public key**: Your anon key

### 1.3 Set Up Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `db/supabase_parts_table.sql`
3. Click **Run** to create the database schema

### 1.4 Populate Sample Data (Optional)
If you want to populate the database with sample parts data:
1. Run the population scripts from `api/repairdesk-api-client/` directory
2. Example: `php populate_iphone13_parts.php`

## 🌐 Step 2: Netlify Deployment

### 2.1 Connect Repository
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** > **"Import an existing project"**
3. Connect your GitHub repository
4. Configure build settings:

```
Branch to deploy: main
Build command: npm run build
Publish directory: .
```

### 2.2 Set Environment Variables
1. Go to **Site settings** > **Environment variables**
2. Add the following variables:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-production-anon-key
REPAIRDESK_API_KEY=tbpzKBH-6yxj-VB8Y-xYp0-jkO3HL8SB
APP_ENV=production
APP_DEBUG=false
```

### 2.3 Deploy
1. Click **"Deploy site"**
2. Wait for deployment to complete
3. Your site will be available at: `https://your-site-name.netlify.app`

## 🔧 Step 3: Local Development Setup

### 3.1 Clone and Setup
```bash
git clone https://github.com/your-username/midastechnical.git
cd midastechnical
npm install
```

### 3.2 Configure Environment
```bash
cp .env.example .env
# Edit .env with your production credentials
```

### 3.3 Run Production Setup Script
```bash
chmod +x setup-production.sh
./setup-production.sh
```

## 🧪 Step 4: Testing

### 4.1 Run Tests Locally
```bash
# Run all tests
npm test

# Run specific test suites
npx cypress run --spec "cypress/e2e/smoke-test.cy.js"
npx cypress run --spec "cypress/e2e/homepage.cy.js"
```

### 4.2 Fix Test Issues
Some tests may fail due to CSS animations. Common fixes:

1. **CSS Animation Issues**: Elements with `opacity: 0`
   - Add `cy.wait(1000)` before interacting with animated elements
   - Use `{force: true}` for click actions on hidden elements

2. **Navigation Issues**: Missing links
   - Ensure all page files exist in the `pages/` directory
   - Check that navigation links point to correct paths

## 📱 Step 5: Mobile Optimization

### 5.1 Test Mobile Responsiveness
- Use Chrome DevTools device emulation
- Test on actual mobile devices
- Verify touch interactions work properly

### 5.2 Performance Optimization
- Images are already optimized with lazy loading
- Consider using a CDN for faster global delivery
- Enable gzip compression in Netlify

## 🔒 Step 6: Security & Monitoring

### 6.1 SSL Certificate
- Netlify automatically provides SSL certificates
- Your site will be available at `https://`

### 6.2 Environment Security
- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys

### 6.3 Monitoring
- Set up Netlify Analytics for traffic monitoring
- Monitor Supabase usage and costs
- Set up error tracking (optional)

## 🚀 Step 7: Go Live

### 7.1 Final Checklist
- [ ] Supabase database is set up and populated
- [ ] Environment variables are configured
- [ ] Site deploys successfully on Netlify
- [ ] All tests pass (or known issues documented)
- [ ] Mobile responsiveness verified
- [ ] Contact information is correct
- [ ] SSL certificate is active

### 7.2 Launch
1. Update DNS to point to your Netlify site
2. Test all functionality in production
3. Announce your launch on social media
4. Monitor for any issues

## 🆘 Troubleshooting

### Common Issues

**1. Supabase Connection Failed**
```
Error: Invalid API key
```
- Check that your Supabase anon key is correct
- Ensure the key has the right permissions
- Verify the project URL is correct

**2. Netlify Build Failed**
```
Build command failed
```
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

**3. Tests Failing**
```
Element not visible
```
- Add wait commands for CSS animations
- Use `{force: true}` for necessary interactions
- Check that all page files exist

**4. Database Errors**
```
Table does not exist
```
- Run the SQL schema in Supabase SQL Editor
- Check that the schema was applied correctly
- Verify RLS policies if using authentication

## 📞 Support

### Contact Information
- **Phone**: +1 (240) 351-0511
- **Hours**: Mon-Fri: 9PM-10PM EST
- **Email**: support@midastech.com

### Resources
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Cypress Docs**: [docs.cypress.io](https://docs.cypress.io)

## 🎉 Success!

Your Midas Technical Solutions e-commerce website is now live and ready to serve customers! The platform includes:

- ✅ Complete product catalog with search and filtering
- ✅ Shopping cart and checkout functionality
- ✅ Responsive design for all devices
- ✅ Professional UI/UX with modern styling
- ✅ Secure payment processing ready
- ✅ Inventory management system
- ✅ Customer support integration

**Happy selling! 🚀**
