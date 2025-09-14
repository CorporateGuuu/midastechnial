<?php
/**
 * Populate Supabase with MacBook Air A1304 Parts (Late 2008 - Mid 2009)
 *
 * This script inserts MacBook Air A1304 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Air A1304 Parts Data (Late 2008 - Mid 2009)
$macbookAirA1304Parts = [
    [
        'name' => 'Battery (A1245) Compatible For MacBook Air 13" (A1237 / Early 2008 / A1304 / Late 2008 / Mid 2009)',
        'description' => 'Battery (A1245) Compatible For MacBook Air 13" (A1237 / Early 2008 / A1304 / Late 2008 / Mid 2009)',
        'price' => 30.17,
        'category' => 'MacBook Air 13" Parts (2008-2009)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort WiFi Antenna Compatible For MacBook Air 13 (A1237) (Original) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'description' => 'AirPort WiFi Antenna Compatible For MacBook Air 13 (A1237) (Original) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'price' => 1.15,
        'category' => 'MacBook Air 13" Parts (2008-2009)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Clutch Cover Compatible For MacBook Air 13" (A1237) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'description' => 'Clutch Cover Compatible For MacBook Air 13" (A1237) / MacBook Air 13" (A1304 / Late 2008 / Mid 2009)',
        'price' => 0.66,
        'category' => 'MacBook Air 13" Parts (2008-2009)',
        'stock_quantity' => 12
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookAirA1304Parts as $part) {
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
echo "Total parts processed: " . count($macbookAirA1304Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Air A1304 parts population completed!\n";
