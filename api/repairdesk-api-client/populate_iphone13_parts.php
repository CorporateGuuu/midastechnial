<?php
/**
 * Populate Supabase with iPhone 13 Genuine OEM Parts
 *
 * This script inserts iPhone 13 parts data into the Supabase 'parts' table
 */

require_once 'config.php';

// iPhone 13 Parts Data
$iphone13Parts = [
    [
        'name' => 'OLED Assembly For iPhone 13 (Genuine OEM)',
        'description' => 'Quality Apple Genuine OLED Assembly For iPhone 13 - Genuine OEM Part',
        'price' => 277.25,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'OLED Assembly Compatible For iPhone 13 (Genuine OEM)',
        'description' => 'OLED Assembly Compatible For iPhone 13 - Genuine OEM Part',
        'price' => 321.89,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Replacement Battery With Adhesive For iPhone 13 (Genuine OEM)',
        'description' => 'Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 - Genuine OEM Part',
        'price' => 49.74,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 25
    ],
    [
        'name' => 'Front Camera For iPhone 13 (Genuine OEM)',
        'description' => 'Quality Apple Genuine Front Camera For iPhone 13 - Genuine OEM Part',
        'price' => 154.52,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 (Genuine OEM) (Pink)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Pink - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray Compatible For iPhone 13 (Genuine OEM) (Blue)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Blue - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 (Genuine OEM) (Red)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Red - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 (Genuine OEM) (Mint)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Mint - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray For iPhone 13 (Genuine OEM) (Starlight)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Starlight - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Single SIM Card Tray Compatible For iPhone 13 (Genuine OEM) (Green)',
        'description' => 'Quality Apple Genuine Single SIM Card Tray Compatible For iPhone 13 - Green - Genuine OEM Part',
        'price' => 10.67,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Adhesive (5G MmWave Antenna) Compatible For iPhone 13 (Genuine OEM) (48 Pack)',
        'description' => 'Quality Apple Genuine Adhesive (5G MmWave Antenna) Compatible For iPhone 13 - 48 Pack - Genuine OEM Part',
        'price' => 6.75,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Waterproof Display Adhesive Tape Compatible For iPhone 13 (Genuine OEM) (30 Pack)',
        'description' => 'Quality Apple Genuine Waterproof Display Adhesive Tape Compatible For iPhone 13 - 30 Pack - Genuine OEM Part',
        'price' => 27.06,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Adhesive Compatible For iPhone 13 (Genuine OEM) (30 Pack)',
        'description' => 'Display Adhesive Compatible For iPhone 13 - 30 Pack - Genuine OEM Part',
        'price' => 36.00,
        'category' => 'iPhone 13 Parts',
        'stock_quantity' => 10
    ]
];

try {
    // Initialize Supabase client
    $supabaseUrl = SUPABASE_URL ?? 'your-supabase-url';
    $supabaseKey = SUPABASE_KEY ?? 'your-supabase-key';

    if ($supabaseUrl === 'your-supabase-url' || $supabaseKey === 'your-supabase-key') {
        throw new Exception("Please configure your Supabase credentials in config.php");
    }

    echo "Populating Supabase with iPhone 13 Genuine OEM Parts...\n";
    echo "==================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($iphone13Parts as $part) {
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

    echo "\n==================================================\n";
    echo "Summary: $inserted out of " . count($iphone13Parts) . " parts inserted successfully!\n";

    if ($inserted === count($iphone13Parts)) {
        echo "🎉 All iPhone 13 parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'parts' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
?>
