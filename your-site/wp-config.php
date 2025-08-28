<?php
// ** MySQL settings - You can get this info from your web host ** //
/**
 * Database settings - Replace the placeholders below with your actual database credentials.
 * You can get this info from your web host.
 */
define('DB_NAME', 'wp_local_db'); // TODO: Replace with your database name
define('DB_USER', 'wp_local_user'); // TODO: Replace with your database user
define('DB_PASSWORD', 'S3cureP@ssw0rd!'); // TODO: Replace with your database password
define('DB_HOST', 'localhost'); // TODO: Replace with your database host if different
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Increase memory limit for WooCommerce
define('WP_MEMORY_LIMIT', '256M');

// Enable caching
define('WP_CACHE', true);

/**
 * Security keys - Replace the placeholders below with unique keys.
 * Generate your unique keys at https://api.wordpress.org/secret-key/1.1/salt/
 */
define('AUTH_KEY',         'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'); // TODO: Replace with unique key
define('SECURE_AUTH_KEY',  'p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1'); // TODO: Replace with unique key
define('LOGGED_IN_KEY',    '1234567890abcdef1234567890abcdef'); // TODO: Replace with unique key
define('NONCE_KEY',        'abcdef1234567890abcdef1234567890'); // TODO: Replace with unique key
define('AUTH_SALT',        '0f1e2d3c4b5a69788796a5b4c3d2e1f0'); // TODO: Replace with unique key
define('SECURE_AUTH_SALT', 'f0e1d2c3b4a5968778695a4b3c2d1e0f'); // TODO: Replace with unique key
define('LOGGED_IN_SALT',   '11223344556677889900aabbccddeeff'); // TODO: Replace with unique key
define('NONCE_SALT',       'ffeeddccbbaa00998877665544332211'); // TODO: Replace with unique key

// Table prefix
$table_prefix = 'wp_';

// Debugging mode (set to false in production)
define('WP_DEBUG', false);

// Disable file editing from dashboard
define('DISALLOW_FILE_EDIT', true);

// Optimize autosave and revisions
define('AUTOSAVE_INTERVAL', 300); // Seconds
define('WP_POST_REVISIONS', 5);

// Absolute path to the WordPress directory
if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(__FILE__) . '/');
}

// Set up WordPress vars and included files
require_once(ABSPATH . 'wp-settings.php');
?>
