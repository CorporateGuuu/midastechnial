<?php
/**
 * Populate Supabase with MacBook Air A1237 Parts (Early 2008)
 *
 * This script inserts MacBook Air A1237 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Air A1237 Parts Data (Early 2008)
$macbookAirA1237Parts = [
    [
        'name' => 'Battery (A1245) Compatible For MacBook Air 13" (A1237 / Early 2008 / A1304 / Late 2008 / Mid 2009)',
        'description' => 'Battery (A1245) Compatible For MacBook Air 13" (A1237 / Early 2008 / A1304 / Late 2008 / Mid 2009)',
        'price' => 30.17,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'price' => 1.60,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Quality - OEM Grade A/B 45W MagSafe 1 Power Adapter With Cable (L-Style) For MacBook (OEM Pull Grade: A/B)',
        'description' => '45W MagSafe 1 Power Adapter With Cable (L-Style) For MacBook (OEM Grade A/B) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'AirPort WiFi Antenna Compatible For MacBook Air 13 (A1237) (Original) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'description' => 'AirPort WiFi Antenna Compatible For MacBook Air 13 (A1237) (Original) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'price' => 1.15,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Clutch Cover Compatible For MacBook Air 13" (A1237) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'description' => 'Clutch Cover Compatible For MacBook Air 13" (A1237) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'price' => 0.66,
        'category' => 'MacBook Air 13" Parts (2008)',
        'stock_quantity' => 12
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookAirA1237Parts as $part) {
    try {
        $response = $supabase->from('parts')->insert($part)->execute();
        $insertedCount++;
        echo "Inserted: " . $part['name'] . "\n";
    } catch (Exception $e) {
        $errors[] = "Failed to insert " . $part['name'] . ": " . $e->getMessage();
        echo "Error inserting " . $part['name'] . ": " . $e->getMessage() . "\n";
    }
}

echo "\n=== Summary ===\n";
echo "Total parts processed: " . count($macbookAirA1237Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Air A1237 parts population completed!\n";
