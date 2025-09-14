<?php
/**
 * Populate Supabase with iPhone 14 Pro Genuine OEM Parts
 *
 * This script inserts iPhone 14 Pro parts data into the Supabase 'parts' table
 */

require_once 'config.php';

// iPhone 14 Pro Parts Data
$iphone14ProParts = [
    [
        'name' => 'OLED Assembly For iPhone 14 Pro (Genuine OEM)',
        'description' => 'Quality Apple Genuine OLED Assembly For iPhone 14 Pro - Genuine OEM Part',
        'price' => 326.58,
        'category' => 'iPhone 14 Pro Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'OLED Assembly Compatible For iPhone 14 Pro (Genuine OEM)',
        'description' => 'OLED Assembly Compatible For iPhone 14 Pro - Genuine OEM Part',
        'price' => 379.22,
        'category' => 'iPhone 14 Pro Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Replacement Battery With Adhesive For iPhone 14 Pro (Genuine OEM)',
        'description' => 'Quality Apple Genuine Replacement Battery With Adhesive Compatible For iPhone 14 Pro - Genuine OEM Part',
        'price' => 55.86,
        'category' => 'iPhone 14 Pro Parts',
        'stock_quantity' => 25
    ],
    [
        'name' => 'Front Camera For iPhone 14 Pro (Genuine OEM)',
        'description' => 'Quality Apple Genuine Front Camera Compatible For iPhone 14 Pro - Genuine OEM Part',
        'price' => 216.77,
        'category' => 'iPhone 14 Pro Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Back Camera For iPhone 14 Pro (Genuine OEM)',
        'description' => 'Quality Apple Genuine Back Camera Compatible For iPhone 14 Pro - Genuine OEM Part',
        'price' => 218.33,
        'category' => 'iPhone 14 Pro Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Waterproof Display Adhesive Tape Compatible For iPhone 14 Pro (Genuine OEM) (30 Pack)',
        'description' => 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 14 Pro - 30 Pack - Genuine OEM Part',
        'price' => 27.06,
        'category' => 'iPhone 14 Pro Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus (Genuine OEM) (30 Pack)',
        'description' => 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 14 Plus - 30 Pack - Genuine OEM Part',
        'price' => 27.06,
        'category' => 'iPhone 14 Pro Parts',
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

    echo "Populating Supabase with iPhone 14 Pro Genuine OEM Parts...\n";
    echo "============================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($iphone14ProParts as $part) {
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

    echo "\n============================================================\n";
    echo "Summary: $inserted out of " . count($iphone14ProParts) . " parts inserted successfully!\n";

    if ($inserted === count($iphone14ProParts)) {
        echo "🎉 All iPhone 14 Pro parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'parts' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
?>
