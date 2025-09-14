<?php
/**
 * Populate Supabase with MacBook Unibody A1278 Parts (Late 2008)
 *
 * This script inserts MacBook Unibody A1278 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Unibody A1278 Parts Data (Late 2008)
$macbookUnibodyA1278Parts = [
    [
        'name' => 'Battery (A1280) Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Battery (A1280) Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 34.35,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Unibody 13" (A1278 / Late 2008) (US English) (Used OEM Pull: Grade New)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Unibody 13" (A1278 / Late 2008) (US English) (Used OEM Pull: Grade New)',
        'price' => 73.57,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Trackpad Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 20.83,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard & Backlight & Screws (US English) Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Keyboard & Backlight & Screws (US English) Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 15.73,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'MagSafe Board Compatible For MacBook Pro Unibody 13" (A1278 / Late 2008) / 15" (A1286 / Early 2009 / Late 2008) / 17" (A1297 / Early 2009 / Mid 2009)',
        'description' => 'MagSafe Board Compatible For MacBook Pro Unibody 13" (A1278 / Late 2008) / 15" (A1286 / Early 2009 / Late 2008) / 17" (A1297 / Early 2009 / Mid 2009)',
        'price' => 5.14,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Display LVDS Cable Compatible For MacBook Pro Unibody 13" (A1278 / Mid 2009 / Mid 2010 / Late 2008) / MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Display LVDS Cable Compatible For MacBook Pro Unibody 13" (A1278 / Mid 2009 / Mid 2010 / Late 2008) / MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 1.78,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Optical Drive Rear Bracket Compatible For MacBook Pro Unibody 13" (A1278 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2008 / Late 2011)',
        'description' => 'Optical Drive Rear Bracket Compatible For MacBook Pro Unibody 13" (A1278 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2008 / Late 2011)',
        'price' => 1.00,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Optical Drive SATA Cable Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Optical Drive SATA Cable Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 3.89,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Hard Drive Cable Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Hard Drive Cable Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 4.08,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'SuperDrive Compatible For MacBook Unibody 13" (A1278 / Late 2008) / MacBook Pro Unibody 17" (A1297 / Early 2009 / Mid 2009)',
        'description' => 'SuperDrive Compatible For MacBook Unibody 13" (A1278 / Late 2008) / MacBook Pro Unibody 17" (A1297 / Early 2009 / Mid 2009)',
        'price' => 15.14,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Left Speaker Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Left Speaker Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 2.05,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Speaker (Right) & Subwoofer Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Speaker (Right) & Subwoofer Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 5.70,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Microphone Cable Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Microphone Cable Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 6.59,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Left & Right Loudspeaker Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Left & Right Loudspeaker Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 6.92,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Battery Indicator Board Screws (PH000) Compatible For MacBook Unibody 13" (A1278 / Late 2008) / MacBook Pro Unibody 15" (A1286 / Early 2009 / Late 2008)',
        'description' => 'Battery Indicator Board Screws (PH000) Compatible For MacBook Unibody 13" (A1278 / Late 2008) / MacBook Pro Unibody 15" (A1286 / Early 2009 / Late 2008)',
        'price' => 0.85,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Torx Hinge Screws (T6 or T8) Compatible For MacBook Pro Unibody 13" (A1278 / Late 2008) / 15" (A1286 / Early 2009 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2008 / Late 2011) / 17" (A1297)',
        'description' => 'Torx Hinge Screws (T6 or T8) Compatible For MacBook Pro Unibody 13" (A1278 / Late 2008) / 15" (A1286 / Early 2009 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2008 / Late 2011) / 17" (A1297)',
        'price' => 1.67,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bracket Compatible For MacBook Pro Unibody 13" (A1278 / Late 2008)',
        'description' => 'Antenna Bracket Compatible For MacBook Pro Unibody 13" (A1278 / Late 2008)',
        'price' => 3.96,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Hinges (Left + Right) Compatible For MacBook Pro Unibody 13" (A1278 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2008 / Late 2011)',
        'description' => 'Hinges (Left + Right) Compatible For MacBook Pro Unibody 13" (A1278 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2008 / Late 2011)',
        'price' => 4.03,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Heatsink Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Heatsink Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 1.71,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Unibody 13" (A1278 / Late 2008) / Pro Unibody 13" (A1278 / A1342 / Early 2011 / Mid 2009 / Mid 2010 / Late 2011 / Mid 2012)',
        'description' => 'CPU Fan Compatible For MacBook Unibody 13" (A1278 / Late 2008) / Pro Unibody 13" (A1278 / A1342 / Early 2011 / Mid 2009 / Mid 2010 / Late 2011 / Mid 2012)',
        'price' => 8.59,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Heatsink Compatible For MacBook Unibody 13" (A1278 / Early 2011 / Late 2011)',
        'description' => 'Heatsink Compatible For MacBook Unibody 13" (A1278 / Early 2011 / Late 2011)',
        'price' => 11.93,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery Indicator Board Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Battery Indicator Board Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 0.87,
        'category' => 'MacBook Unibody 13" Parts (2008)',
        'stock_quantity' => 15
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookUnibodyA1278Parts as $part) {
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
echo "Total parts processed: " . count($macbookUnibodyA1278Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Unibody A1278 parts population completed!\n";
