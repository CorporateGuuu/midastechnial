#!/bin/bash

# Midas Technical Solutions - Production Setup Script
# This script helps configure Supabase for production deployment

echo "🚀 Midas Technical Solutions - Production Setup"
echo "=============================================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your production credentials."
    exit 1
fi

# Load environment variables
set -a
source .env
set +a

echo "📋 Current Configuration:"
echo "SUPABASE_URL: $SUPABASE_URL"
echo "SUPABASE_KEY: ${SUPABASE_KEY:0:20}..."
echo "APP_ENV: $APP_ENV"
echo "APP_DEBUG: $APP_DEBUG"
echo ""

# Validate Supabase credentials
if [[ "$SUPABASE_URL" == *"your-project-ref"* ]] || [[ "$SUPABASE_KEY" == *"your-production"* ]]; then
    echo "⚠️  WARNING: You are using placeholder Supabase credentials!"
    echo "Please update your .env file with actual production credentials:"
    echo ""
    echo "1. Go to https://supabase.com/dashboard"
    echo "2. Select your project"
    echo "3. Go to Settings > API"
    echo "4. Copy the Project URL and anon/public key"
    echo "5. Update your .env file:"
    echo "   SUPABASE_URL=https://your-actual-project-ref.supabase.co"
    echo "   SUPABASE_KEY=your-actual-anon-key"
    echo ""
    exit 1
fi

echo "✅ Configuration looks good!"
echo ""

# Test Supabase connection
echo "🔍 Testing Supabase connection..."
cd api/repairdesk-api-client
php test_supabase_connection.php
cd ../..

echo ""
echo "📊 Setting up database schema..."
echo "Run the following SQL in your Supabase SQL Editor:"
echo ""
echo "1. Go to https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Go to SQL Editor"
echo "4. Copy and paste the contents of: db/supabase_parts_table.sql"
echo "5. Click 'Run' to create the database schema"
echo ""

# Check if we should populate with sample data
read -p "🤔 Do you want to populate the database with sample parts data? (y/n): " populate_data

if [[ $populate_data =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Populating database with sample data..."
    echo "After running the schema SQL, also run these population scripts:"
    echo ""
    echo "Available population scripts in api/repairdesk-api-client/:"
    ls api/repairdesk-api-client/populate_*.php | sed 's/.*\///'
    echo ""
    echo "Example: php populate_iphone13_parts.php"
fi

echo ""
echo "🎉 Production setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with real Supabase credentials"
echo "2. Run the database schema in Supabase SQL Editor"
echo "3. Optionally populate with sample data"
echo "4. Deploy to Netlify or your preferred hosting platform"
echo "5. Update DNS and SSL certificates if needed"
echo ""
echo "Your e-commerce website will be ready for production! 🚀"
