<?php
/**
 * Populate Supabase with MacBook Unibody A1342 Parts (Late 2009 - Mid 2010)
 *
 * This script inserts MacBook Unibody A1342 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Unibody A1342 Parts Data (Late 2009 - Mid 2010)
$macbookUnibodyA1342Parts = [
    [
        'name' => 'Battery (A1331) Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Battery (A1331) Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 35.75,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case + Keyboard + Speakers Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010) (EU Version)',
        'description' => 'Top Case + Keyboard + Speakers Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010) (EU Version)',
        'price' => 26.22,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Bottom Case Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 3.62,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad + Trackpad Flex Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Trackpad + Trackpad Flex Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 16.72,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Right Keyboard Speaker Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Right Keyboard Speaker Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 9.21,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Keyboard Only Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010) (UK English)',
        'description' => 'Keyboard W/ Backlight & Screws Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010) (UK English)',
        'price' => 12.23,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'MagSafe DC-In Board Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'MagSafe DC-In Board Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 9.07,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Hard Drive Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Hard Drive Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 1.84,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Hard Drive Tray Caddy Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Hard Drive Tray Caddy Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 3.44,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Optical Drive SATA Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Optical Drive SATA Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 5.41,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'DVDRW SuperDrive (GS23N) Compatible For MacBook Pro Unibody 13" / 15" / 17" (A1278 / A1286 / A1297 / A1342 / Mid 2009 To Mid 2012)',
        'description' => 'DVDRW SuperDrive (GS23N) Compatible For MacBook Pro Unibody 13" / 15" / 17" (A1278 / A1286 / A1297 / A1342 / Mid 2009 To Mid 2012)',
        'price' => 20.20,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Microphone Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Microphone Cable Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 0.68,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort + Speaker Assembly Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'AirPort + Speaker Assembly Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 2.77,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Left Keyboard Speaker Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Left Keyboard Speaker Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 4.35,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'AirPort Card Bracket With Speaker Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'AirPort Card Bracket With Speaker Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 11.65,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'AirPort Wireless Network Card Compatible For MacBook Pro Unibody 13" / 15" (A1286 / Mid 2010) (A1278 / Mid 2010) (A1342 / Late 2009 / Mid 2010)',
        'description' => 'AirPort Wireless Network Card Compatible For MacBook Pro Unibody 13" / 15" (A1286 / Mid 2010) (A1278 / Mid 2010) (A1342 / Late 2009 / Mid 2010)',
        'price' => 2.83,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Antenna Bar Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Antenna Bar Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 3.72,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Hinge Screws (Torx T8) Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Hinge Screws (Torx T8) Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 0.25,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Hard Drive Screws Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Hard Drive Screws Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 0.25,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Battery Screws (Phillips PH00 & Tri-Point Y1) Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'description' => 'Battery Screws (Phillips PH00 & Tri-Point Y1) Compatible For MacBook Unibody 13" (A1342 / Late 2009 / Mid 2010)',
        'price' => 0.40,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws (Phillips PH00) Compatible For MacBook 13" Unibody (A1342)',
        'description' => 'Bottom Case Screws (Phillips PH00) Compatible For MacBook 13" Unibody (A1342)',
        'price' => 0.72,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Unibody 13" (A1278 / Late 2008) / Pro Unibody 13" (A1278 / A1342 / Early 2011 / Mid 2009 / Mid 2010 / Late 2011 / Mid 2012)',
        'description' => 'CPU Fan Compatible For MacBook Unibody 13" (A1278 / Late 2008) / Pro Unibody 13" (A1278 / A1342 / Early 2011 / Mid 2009 / Mid 2010 / Late 2011 / Mid 2012)',
        'price' => 8.59,
        'category' => 'MacBook Unibody 13" Parts (2009-2010)',
        'stock_quantity' => 12
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookUnibodyA1342Parts as $part) {
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
echo "Total parts processed: " . count($macbookUnibodyA1342Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Unibody A1342 parts population completed!\n";
