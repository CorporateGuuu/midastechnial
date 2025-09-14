# Getting Started with RepairDesk API Client

## Files Created

The following files have been created in the `repairdesk-api-client` directory:

1. **RepairDeskAPI.php** - Basic API client implementation
2. **RepairDeskAPIClient.php** - Enhanced API client with configuration support
3. **config.example.php** - Example configuration file (copy to config.php)
4. **test.php** - Basic test script to verify API connection
5. **example.php** - Comprehensive usage examples
6. **install.php** - Interactive installation script
7. **README.md** - Complete documentation
8. **GETTING_STARTED.md** - This file

## Quick Start Guide

### Option 1: Interactive Installation (Recommended)

1. Run the installation script:
   ```bash
   cd repairdesk-api-client
   php install.php
   ```

2. Follow the prompts to enter your RepairDesk API key

3. Test your connection:
   ```bash
   php test.php
   ```

### Option 2: Manual Setup

1. Copy the example configuration:
   ```bash
   cd repairdesk-api-client
   cp config.example.php config.php
   ```

2. Edit `config.php` and replace `'your_repairdesk_api_key_here'` with your actual API key

3. Test your connection:
   ```bash
   php test.php
   ```

### Option 3: Direct Usage

If you prefer not to use a config file, you can initialize the client directly:

```php
require_once 'RepairDeskAPIClient.php';

$apiKey = 'your_actual_api_key_here';
$client = new RepairDeskAPIClient($apiKey);

// Test connection
$client->testConnection();
```

## Testing Your Setup

Run the test script to verify everything works:

```bash
php test.php
```

Or run the examples to see the client in action:

```bash
php example.php
```

## API Key Requirements

You'll need a valid RepairDesk API key. You can obtain this from:
1. Log into your RepairDesk account
2. Go to Settings → API
3. Generate a new API key or use an existing one
4. Make sure the key has appropriate permissions for the endpoints you need

## Common Issues

1. **cURL not installed**: Ensure the cURL extension is enabled in your PHP installation
2. **SSL certificate issues**: If you're having SSL problems, set `REPAIRDESK_SSL_VERIFY` to `false` in your config (not recommended for production)
3. **API key invalid**: Double-check your API key in the RepairDesk dashboard
4. **Network issues**: Verify your internet connection can reach the RepairDesk API

## Next Steps

1. Read the full documentation in `README.md`
2. Explore the example usage in `example.php`
3. Integrate the client into your application
4. Handle errors appropriately in your code
5. Consider implementing rate limiting if making many requests

## Support

If you encounter issues:
1. Check the error messages carefully
2. Verify your API key and permissions
3. Ensure cURL is working on your system
4. Check the RepairDesk API status/dashboard

## File Structure

```
repairdesk-api-client/
├── RepairDeskAPI.php          # Basic client implementation
├── RepairDeskAPIClient.php    # Enhanced client with config support
├── config.example.php         # Example configuration
├── config.php                 # Your actual config (create this)
├── test.php                   # Connection test script
├── example.php                # Usage examples
├── install.php                # Interactive installer
├── README.md                  # Complete documentation
└── GETTING_STARTED.md         # This quick start guide
```

You're now ready to start using the RepairDesk API Client! 🚀
