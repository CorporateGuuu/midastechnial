<?php
/**
 * Configuration file for RepairDesk API Client
 *
 * This configuration file uses environment variables for security.
 * Create a .env file in the project root with your actual credentials.
 */

// Load environment variables from .env file if it exists
// Check both parent directory and current directory
$envPaths = [__DIR__ . '/../.env', __DIR__ . '/.env'];
$envFileLoaded = false;

foreach ($envPaths as $envPath) {
    if (file_exists($envPath)) {
        $envFile = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($envFile as $line) {
            if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }
        $envFileLoaded = true;
        break;
    }
}

// Your RepairDesk API Key - loaded from environment variable
define('REPAIRDESK_API_KEY', getenv('REPAIRDESK_API_KEY') ?: '');

// API Base URL (usually doesn't need to be changed)
define('REPAIRDESK_BASE_URL', 'https://api.repairdesk.co/api/web/v1');

// Optional: Timeout for API requests in seconds
define('REPAIRDESK_TIMEOUT', 30);

// SSL verification - ALWAYS enabled for security
define('REPAIRDESK_SSL_VERIFY', true);

// Debug mode - disabled in production, can be enabled via environment variable
define('REPAIRDESK_DEBUG', getenv('APP_DEBUG') === 'true' ? true : false);

// Supabase Configuration - loaded from environment variables
define('SUPABASE_URL', getenv('SUPABASE_URL') ?: '');
define('SUPABASE_KEY', getenv('SUPABASE_KEY') ?: '');
define('SUPABASE_SERVICE_ROLE_KEY', getenv('SUPABASE_SERVICE_ROLE_KEY') ?: '');

// Validate required environment variables
$required_vars = ['REPAIRDESK_API_KEY', 'SUPABASE_URL', 'SUPABASE_KEY'];
foreach ($required_vars as $var) {
    if (empty(constant($var))) {
        error_log("ERROR: Required environment variable $var is not set");
        // In production, you might want to exit here
        // exit("Configuration error: Missing required environment variable $var");
    }
}
?>
