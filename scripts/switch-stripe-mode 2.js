#!/usr/bin/env node

/**
 * Script to switch between Stripe test and live modes
 * Updates environment variables and Price IDs in stripe-products.ts
 */

const fs = require('fs');
const path = require('path');

const MODE = process.argv[2]; // 'test' or 'live'

if (!MODE || !['test', 'live'].includes(MODE)) {
  console.error('Usage: node switch-stripe-mode.js [test|live]');
  console.error('\nExample:');
  console.error('  npm run stripe:test   # Switch to test mode');
  console.error('  npm run stripe:live   # Switch to live mode');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.local');
const productsPath = path.join(__dirname, '..', 'lib', 'stripe-products.ts');

console.log(`🔄 Switching to ${MODE} mode...`);

// Validate environment file exists
if (!fs.existsSync(envPath)) {
  console.error(`❌ .env.local file not found at ${envPath}`);
  console.error('Please create .env.local with your Stripe credentials');
  process.exit(1);
}

// Read current .env.local
let envContent = fs.readFileSync(envPath, 'utf8');
const originalEnvContent = envContent;

// Update environment variables
const envLines = envContent.split('\n');
let updatedCount = 0;

const updatedEnvLines = envLines.map(line => {
  const trimmedLine = line.trim();

  if (trimmedLine.startsWith('STRIPE_SECRET_KEY=')) {
    const updated = trimmedLine.replace(/sk_(test|live)_/, `sk_${MODE}_`);
    if (updated !== trimmedLine) updatedCount++;
    return updated;
  }
  if (trimmedLine.startsWith('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=')) {
    const updated = trimmedLine.replace(/pk_(test|live)_/, `pk_${MODE}_`);
    if (updated !== trimmedLine) updatedCount++;
    return updated;
  }
  if (trimmedLine.startsWith('STRIPE_WEBHOOK_SECRET=')) {
    const updated = trimmedLine.replace(/whsec_(test|live)_/, `whsec_${MODE}_`);
    if (updated !== trimmedLine) updatedCount++;
    return updated;
  }
  return line;
});

// Write updated .env.local
const newEnvContent = updatedEnvLines.join('\n');
if (newEnvContent !== originalEnvContent) {
  fs.writeFileSync(envPath, newEnvContent);
  console.log(`✓ Updated ${updatedCount} environment variables in .env.local`);
} else {
  console.log(`ℹ️  Environment variables already in ${MODE} mode`);
}

// Read stripe-products.ts
let productsContent = fs.readFileSync(productsPath, 'utf8');
const originalProductsContent = productsContent;

// Update Price IDs from test to live or vice versa
const oppositeMode = MODE === 'test' ? 'live' : 'test';
const updatedProductsContent = productsContent.replace(
  new RegExp(`price_${oppositeMode}_`, 'g'),
  `price_${MODE}_`
);

let priceIdUpdates = 0;
if (updatedProductsContent !== originalProductsContent) {
  // Count how many Price IDs were updated
  const originalMatches = (originalProductsContent.match(/price_(test|live)_/g) || []).length;
  const updatedMatches = (updatedProductsContent.match(new RegExp(`price_${MODE}_`, 'g')) || []).length;
  priceIdUpdates = updatedMatches - (originalMatches - updatedMatches);

  fs.writeFileSync(productsPath, updatedProductsContent);
  console.log(`✓ Updated ${priceIdUpdates} Price IDs in lib/stripe-products.ts`);
} else {
  console.log(`ℹ️  Price IDs already in ${MODE} mode`);
}

console.log(`\n✅ Successfully switched to ${MODE} mode!`);

// Validation and warnings
console.log('\n🔍 Validation:');
let hasValidKeys = true;

// Check for placeholder keys
const keyPatterns = [
  /STRIPE_SECRET_KEY=sk_(test|live)_/,
  /NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_(test|live)_/,
  /STRIPE_WEBHOOK_SECRET=whsec_(test|live)_/
];

keyPatterns.forEach(pattern => {
  const match = newEnvContent.match(pattern);
  if (match && (match[0].includes('...') || match[0].includes('your_'))) {
    console.log(`⚠️  ${match[0].split('=')[0]} appears to be a placeholder`);
    hasValidKeys = false;
  }
});

// Check for placeholder Price IDs
const priceIdPlaceholders = updatedProductsContent.match(/price_(test|live)_[^']*'\s*\/\/.*Replace.*with.*actual.*ID/i);
if (priceIdPlaceholders) {
  console.log(`⚠️  Found ${priceIdPlaceholders.length} placeholder Price IDs that need to be replaced`);
  hasValidKeys = false;
}

if (!hasValidKeys) {
  console.log('\n❌ Configuration incomplete. Please update:');
  console.log('1. Replace placeholder API keys with real Stripe credentials');
  console.log('2. Replace placeholder Price IDs with actual Stripe Price IDs');
  console.log('3. Test the configuration before deploying');
}

console.log('\n📋 Next steps for ' + MODE + ' mode:');
if (MODE === 'live') {
  console.log('🚀 Production Deployment:');
  console.log('1. ✅ Complete Stripe account activation');
  console.log('2. 🏪 Create live products in Stripe Dashboard');
  console.log('3. 🔑 Replace Price IDs with live IDs');
  console.log('4. 🌐 Update webhook URL to production domain');
  console.log('5. 🧪 Test with small real payments ($1.00)');
  console.log('6. 📊 Monitor Stripe Dashboard for transactions');
  console.log('\n💡 Remember: Always test with minimal amounts first!');
} else {
  console.log('🧪 Development Testing:');
  console.log('1. 🃏 Use test card: 4242 4242 4242 4242');
  console.log('2. 📧 Verify email confirmations');
  console.log('3. 🔗 Test webhook processing');
  console.log('4. 🗄️ Check order creation in database');
  console.log('\n💡 Visit /stripe-test for quick testing');
}

console.log('\n🔧 Available commands:');
console.log('  npm run stripe:test   # Switch to test mode');
console.log('  npm run stripe:live   # Switch to live mode');
console.log('  npm run dev          # Start development server');
console.log('  npm run build        # Build for production');
