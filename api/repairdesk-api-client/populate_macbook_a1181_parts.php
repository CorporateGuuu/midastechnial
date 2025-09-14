<?php
/**
 * Populate Supabase with MacBook A1181 Parts (13-inch models, 2006-2009)
 *
 * This script inserts MacBook A1181 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook A1181 Parts Data (13-inch models, 2006-2009)
$macbookA1181Parts = [
    [
        'name' => 'Battery (A1185) Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Late 2006 / Late 2007)',
        'description' => 'Battery (A1185) Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Late 2006 / Late 2007)',
        'price' => 34.26,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'MagSafe Board (White) Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007)',
        'description' => 'MagSafe Board (White) Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007)',
        'price' => 1.23,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Optical Drive SATA Cable Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'description' => 'Optical Drive SATA Cable Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'price' => 0.93,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Optical Drive SATA Cable Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Late 2006 / Late 2007)',
        'description' => 'Optical Drive SATA Cable Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Late 2006 / Late 2007)',
        'price' => 1.23,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'SuperDrive (UJ867A) Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'description' => 'SuperDrive (UJ867A) Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'price' => 2.72,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Hard Drive Tray Caddy Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007)',
        'description' => 'Hard Drive Tray Caddy Compatible For MacBook 13" (A1181 / Early 2008 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007)',
        'price' => 4.52,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'SuperDrive (GS22N) Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'description' => 'SuperDrive (GS22N) Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'price' => 17.83,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'SuperDrive (UJ857) Compatible For MacBook 13" (A1181 / Early 2008 / Early 2009 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007) (A1260 / Early 2008)',
        'description' => 'SuperDrive (UJ857) Compatible For MacBook 13" (A1181 / Early 2008 / Early 2009 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007) (A1260 / Early 2008)',
        'price' => 20.12,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'AirPort Extreme Card Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'description' => 'AirPort Extreme Card Compatible For MacBook 13" (A1181 / Early 2009 / Mid 2009)',
        'price' => 4.65,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Hard Drive Screws (Torx T8) Compatible For MacBook 13" (A1181 / Early 2008 / Early 2009 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007)',
        'description' => 'Hard Drive Screws (Torx T8) Compatible For MacBook 13" (A1181 / Early 2008 / Early 2009 / Mid 2006 / Mid 2007 / Mid 2009 / Late 2006 / Late 2007)',
        'price' => 0.76,
        'category' => 'MacBook 13" Parts (2006-2009)',
        'stock_quantity' => 20
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookA1181Parts as $part) {
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
echo "Total parts processed: " . count($macbookA1181Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook A1181 parts population completed!\n";
