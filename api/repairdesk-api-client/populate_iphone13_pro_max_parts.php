<?php
/**
 * Populate Supabase with iPhone 13 Pro Max Genuine OEM Parts
 *
 * This script inserts iPhone 13 Pro Max parts data into the Supabase 'parts' table
 */

require_once 'config.php';

// iPhone 13 Pro Max Parts Data
$iphone13ProMaxParts = [
    [
        'name' => 'OLED Assembly For iPhone 13 Pro Max (Genuine OEM)',
        'description' => 'Quality Apple Genuine OLED Assembly For iPhone 13 Pro Max - Genuine OEM Part',
        'price' => 326.58,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'OLED Assembly Compatible For iPhone 13 Pro Max (Genuine OEM)',
        'description' => 'OLED Assembly Compatible For iPhone 13 Pro Max - Genuine OEM Part',
        'price' => 379.22,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Replacement Battery With Adhesive For iPhone 13 Pro Max (Genuine OEM)',
        'description' => 'Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 Pro Max - Genuine OEM Part',
        'price' => 49.74,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 25
    ],
    [
        'name' => 'Front Camera For iPhone 13 Pro Max (Genuine OEM)',
        'description' => 'Quality Apple Genuine Front Camera For iPhone 13 Pro Max - Genuine OEM Part',
        'price' => 154.52,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Back Camera For iPhone 13 Pro / 13 Pro Max (Genuine OEM)',
        'description' => 'Quality Apple Genuine Back Camera Compatible For iPhone 13 Pro / 13 Pro Max - Genuine OEM Part',
        'price' => 195.99,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Green)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Green - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Graphite)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Graphite - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Silver)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Silver - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Gold)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Gold - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 Pro / 13 Pro Max (Genuine OEM) (Blue)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 Pro / 13 Pro Max - Blue - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro Max (Genuine OEM) (30 Pack)',
        'description' => 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 Pro Max - 30 Pack - Genuine OEM Part',
        'price' => 27.06,
        'category' => 'iPhone 13 Pro Max Parts',
        'stock_quantity' => 12
    ]
];

try {
    // Initialize Supabase client
    $supabaseUrl = SUPABASE_URL ?? 'your-supabase-url';
    $supabaseKey = SUPABASE_KEY ?? 'your-supabase-key';

    if ($supabaseUrl === 'your-supabase-url' || $supabaseKey === 'your-supabase-key') {
        throw new Exception("Please configure your Supabase credentials in config.php");
    }

    echo "Populating Supabase with iPhone 13 Pro Max Genuine OEM Parts...\n";
    echo "================================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($iphone13ProMaxParts as $part) {
        try {
            $response = $supabase->from('parts')->insert($part)->execute();

            if ($response) {
                echo "✓ Inserted: {$part['name']} - \${$part['price']}\n";
                $inserted++;
            }
        } catch (Exception $e) {
            echo "✗ Failed to insert {$part['name']}: " . $e->getMessage() . "\n";
        }
    }

    echo "\n================================================================\n";
    echo "Summary: $inserted out of " . count($iphone13ProMaxParts) . " parts inserted successfully!\n";

    if ($inserted === count($iphone13ProMaxParts)) {
        echo "🎉 All iPhone 13 Pro Max parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'parts' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
?>
