<?php
/**
 * Populate Supabase with iPhone 14 Genuine OEM Parts
 *
 * This script inserts iPhone 14 parts data into the Supabase 'products' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

// iPhone 14 Parts Data
$iphone14Parts = [
    [
        'name' => 'OLED Assembly For iPhone 14 (Genuine OEM)',
        'description' => 'Quality Apple Genuine OLED Assembly For iPhone 14 - Genuine OEM Part',
        'price' => 277.25,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'OLED Assembly Compatible For iPhone 14 (Genuine OEM)',
        'description' => 'OLED Assembly Compatible For iPhone 14 - Genuine OEM Part',
        'price' => 321.89,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Replacement Battery With Adhesive Compatible For iPhone 14 (Genuine OEM)',
        'description' => 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 14 - Genuine OEM Part',
        'price' => 55.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 25
    ],
    [
        'name' => 'Front Camera Compatible For iPhone 14 (Genuine OEM)',
        'description' => 'Quality Apple Genuine Front Camera Compatible For iPhone 14 - Genuine OEM Part',
        'price' => 154.52,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Camera For iPhone 14 (Genuine OEM)',
        'description' => 'Quality Apple Genuine Back Camera Compatible For iPhone 14 - Genuine OEM Part',
        'price' => 165.42,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Yellow)',
        'description' => 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Yellow - Genuine OEM Part',
        'price' => 124.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Purple)',
        'description' => 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Purple - Genuine OEM Part',
        'price' => 124.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Blue)',
        'description' => 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Blue - Genuine OEM Part',
        'price' => 124.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Red)',
        'description' => 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Red - Genuine OEM Part',
        'price' => 124.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Midnight)',
        'description' => 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Midnight - Genuine OEM Part',
        'price' => 124.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 (Genuine OEM) (Starlight)',
        'description' => 'Quality Apple Genuine Back Glass With Steel Plate With MagSafe Magnet Pre-Installed Compatible For iPhone 14 - Starlight - Genuine OEM Part',
        'price' => 124.86,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Sim Card Tray Compatible For iPhone 14 /14 Plus (Genuine OEM) (Red)',
        'description' => 'Quality Apple Genuine Sim Card Tray Compatible For iPhone 14 /14 Plus - Red - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Sim Card Tray For iPhone 14 / 14 Plus (Genuine OEM) (Yellow)',
        'description' => 'Quality Apple Genuine Sim Card Tray Compatible For iPhone 14 / 14 Plus - Yellow - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'SIM Card Tray For iPhone 14 / 14 Plus (Genuine OEM) (Starlight)',
        'description' => 'Quality Apple Genuine SIM Card Tray Compatible For iPhone 14 / 14 Plus - Starlight - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'SIM Card Tray Compatible for iPhone 14 / 14 Plus (Genuine OEM) (Midnight)',
        'description' => 'Quality Apple Genuine SIM Card Tray Compatible for iPhone 14 / 14 Plus - Midnight - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Back Cover Adhesive Tape Compatible For iPhone 14 (Black) (30 Pack) (Genuine OEM)',
        'description' => 'Quality Apple Genuine Back Cover Adhesive Tape Compatible For iPhone 14 - Black - 30 Pack - Genuine OEM Part',
        'price' => 27.06,
        'category' => 'iPhone 14 Parts',
        'stock_quantity' => 12
    ]
];

try {
    // Validate Supabase credentials
    if (empty(SUPABASE_URL) || empty(SUPABASE_SERVICE_ROLE_KEY)) {
        throw new Exception("Please configure your Supabase credentials in config.php");
    }

    // Initialize Guzzle HTTP client for Supabase REST API using service role key (bypasses RLS)
    $client = new Client([
        'base_uri' => SUPABASE_URL . '/rest/v1/',
        'headers' => [
            'apikey' => SUPABASE_SERVICE_ROLE_KEY,
            'Authorization' => 'Bearer ' . SUPABASE_SERVICE_ROLE_KEY,
            'Content-Type' => 'application/json',
            'Prefer' => 'return=minimal', // Don't return the inserted data to reduce response size
        ],
    ]);

    echo "Populating Supabase with iPhone 14 Genuine OEM Parts...\n";
    echo "========================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($iphone14Parts as $part) {
        try {
            $response = $client->post('products', [
                'json' => $part,
                'http_errors' => false, // Don't throw on 4xx/5xx
            ]);

            $statusCode = $response->getStatusCode();

            if ($statusCode >= 200 && $statusCode < 300) {
                echo "✓ Inserted: {$part['name']} - \${$part['price']}\n";
                $inserted++;
            } else {
                $errorBody = $response->getBody()->getContents();
                echo "✗ Failed to insert {$part['name']}: HTTP $statusCode - $errorBody\n";
            }
        } catch (RequestException $e) {
            echo "✗ Failed to insert {$part['name']}: " . $e->getMessage() . "\n";
        }
    }

    echo "\n========================================================\n";
    echo "Summary: $inserted out of " . count($iphone14Parts) . " parts inserted successfully!\n";

    if ($inserted === count($iphone14Parts)) {
        echo "🎉 All iPhone 14 parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'products' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
?>
