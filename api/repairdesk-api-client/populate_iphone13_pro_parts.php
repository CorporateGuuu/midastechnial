<?php
/**
 * Populate Supabase with iPhone 13 Pro Genuine OEM Parts
 *
 * This script inserts iPhone 13 Pro parts data into the Supabase 'products' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

// iPhone 13 Pro Parts Data
$iphone13ProParts = [
    [
        'name' => 'OLED Assembly For iPhone 13 Pro (Genuine OEM)',
        'slug' => 'oled-assembly-iphone-13-pro-genuine-oem',
        'sku' => 'IP13PRO-OLED-OEM-001',
        'description' => 'Quality Apple Genuine OLED Assembly For iPhone 13 Pro - Genuine OEM Part',
        'price' => 289.70,
        'discount_percentage' => 0.00,
        'stock_quantity' => 10,
        'is_featured' => false,
        'is_new' => true,
        'image_url' => 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
        'weight' => 0.15,
        'dimensions' => '6 x 3 x 0.2 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'OLED Assembly Compatible For iPhone 13 Pro (Genuine OEM)',
        'slug' => 'oled-assembly-compatible-iphone-13-pro-genuine-oem',
        'sku' => 'IP13PRO-OLED-COMP-OEM-002',
        'description' => 'OLED Assembly Compatible For iPhone 13 Pro - Genuine OEM Part',
        'price' => 334.34,
        'discount_percentage' => 0.00,
        'stock_quantity' => 8,
        'is_featured' => false,
        'is_new' => true,
        'image_url' => 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
        'weight' => 0.15,
        'dimensions' => '6 x 3 x 0.2 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Replacement Battery With Adhesive For iPhone 13 Pro (Genuine OEM)',
        'slug' => 'replacement-battery-adhesive-iphone-13-pro-genuine-oem',
        'sku' => 'IP13PRO-BATT-ADH-OEM-003',
        'description' => 'Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 Pro - Genuine OEM Part',
        'price' => 49.74,
        'discount_percentage' => 0.00,
        'stock_quantity' => 25,
        'is_featured' => true,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop',
        'weight' => 0.05,
        'dimensions' => '4 x 2 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Front Camera For iPhone 13 Pro (Genuine OEM)',
        'slug' => 'front-camera-iphone-13-pro-genuine-oem',
        'sku' => 'IP13PRO-FCAM-OEM-004',
        'description' => 'Quality Apple Genuine Front Camera For iPhone 13 Pro - Genuine OEM Part',
        'price' => 154.52,
        'discount_percentage' => 0.00,
        'stock_quantity' => 15,
        'is_featured' => false,
        'is_new' => true,
        'image_url' => 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
        'weight' => 0.02,
        'dimensions' => '2 x 1 x 0.05 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Back Camera For iPhone 13 Pro / 13 Pro Max (Genuine OEM)',
        'slug' => 'back-camera-iphone-13-pro-13-pro-max-genuine-oem',
        'sku' => 'IP13PRO-BCAM-OEM-005',
        'description' => 'Quality Apple Genuine Back Camera Compatible For iPhone 13 Pro / 13 Pro Max - Genuine OEM Part',
        'price' => 195.99,
        'discount_percentage' => 0.00,
        'stock_quantity' => 12,
        'is_featured' => false,
        'is_new' => true,
        'image_url' => 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
        'weight' => 0.03,
        'dimensions' => '3 x 2 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Blue)',
        'slug' => 'sim-tray-iphone-13-pro-13-pro-max-blue-genuine-oem',
        'sku' => 'IP13PRO-SIM-BLUE-OEM-006',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Blue - Genuine OEM Part',
        'price' => 10.67,
        'discount_percentage' => 0.00,
        'stock_quantity' => 20,
        'is_featured' => false,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
        'weight' => 0.01,
        'dimensions' => '1 x 0.5 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Gold)',
        'slug' => 'sim-tray-iphone-13-pro-13-pro-max-gold-genuine-oem',
        'sku' => 'IP13PRO-SIM-GOLD-OEM-007',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Gold - Genuine OEM Part',
        'price' => 10.67,
        'discount_percentage' => 0.00,
        'stock_quantity' => 20,
        'is_featured' => false,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
        'weight' => 0.01,
        'dimensions' => '1 x 0.5 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Silver)',
        'slug' => 'sim-tray-iphone-13-pro-13-pro-max-silver-genuine-oem',
        'sku' => 'IP13PRO-SIM-SILVER-OEM-008',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Silver - Genuine OEM Part',
        'price' => 10.67,
        'discount_percentage' => 0.00,
        'stock_quantity' => 20,
        'is_featured' => false,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
        'weight' => 0.01,
        'dimensions' => '1 x 0.5 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Graphite)',
        'slug' => 'sim-tray-iphone-13-pro-13-pro-max-graphite-genuine-oem',
        'sku' => 'IP13PRO-SIM-GRAPHITE-OEM-009',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Graphite - Genuine OEM Part',
        'price' => 10.67,
        'discount_percentage' => 0.00,
        'stock_quantity' => 20,
        'is_featured' => false,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
        'weight' => 0.01,
        'dimensions' => '1 x 0.5 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Green)',
        'slug' => 'sim-tray-iphone-13-pro-13-pro-max-green-genuine-oem',
        'sku' => 'IP13PRO-SIM-GREEN-OEM-010',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Green - Genuine OEM Part',
        'price' => 10.67,
        'discount_percentage' => 0.00,
        'stock_quantity' => 20,
        'is_featured' => false,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
        'weight' => 0.01,
        'dimensions' => '1 x 0.5 x 0.1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
    ],
    [
        'name' => 'Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro (Genuine OEM) (30 Pack)',
        'slug' => 'waterproof-display-adhesive-iphone-13-pro-30pack-genuine-oem',
        'sku' => 'IP13PRO-ADH-DISP-30P-OEM-011',
        'description' => 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro - 30 Pack - Genuine OEM Part',
        'price' => 27.06,
        'discount_percentage' => 0.00,
        'stock_quantity' => 12,
        'is_featured' => false,
        'is_new' => false,
        'image_url' => 'https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=400&h=300&fit=crop',
        'weight' => 0.2,
        'dimensions' => '8 x 6 x 1 inch',
        'category_id' => 2,
        'brand' => 'Apple'
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

    echo "Populating Supabase with iPhone 13 Pro Genuine OEM Parts...\n";
    echo "=======================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($iphone13ProParts as $part) {
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

    echo "\n=======================================================\n";
    echo "Summary: $inserted out of " . count($iphone13ProParts) . " parts inserted successfully!\n";

    if ($inserted === count($iphone13ProParts)) {
        echo "🎉 All iPhone 13 Pro parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'products' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
?>
