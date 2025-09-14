<?php
/**
 * Configuration file for RepairDesk API Client
 * 
 * Copy this file to config.php and replace the placeholder values
 * with your actual RepairDesk API credentials.
 */

// Your RepairDesk API Key
// Get this from your RepairDesk dashboard
define('REPAIRDESK_API_KEY', 'your_repairdesk_api_key_here');

// API Base URL (usually doesn't need to be changed)
define('REPAIRDESK_BASE_URL', 'https://api.repairdesk.co/api/v1');

// Optional: Timeout for API requests in seconds
define('REPAIRDESK_TIMEOUT', 30);

// Optional: Enable/disable SSL verification
// Set to false only for development/testing with self-signed certificates
define('REPAIRDESK_SSL_VERIFY', true);

// Optional: Debug mode (set to true to see raw requests/responses)
define('REPAIRDESK_DEBUG', false);
?>
