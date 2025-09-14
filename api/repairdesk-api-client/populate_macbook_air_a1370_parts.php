<?php
/**
 * Populate Supabase with MacBook Air A1370 Parts (11-inch models, Late 2010 - Mid 2011)
 *
 * This script inserts MacBook Air A1370 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Air A1370 Parts Data (11-inch models, Late 2010 - Mid 2011)
$macbookAirA1370Parts = [
    [
        'name' => 'Battery (A1406) Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'description' => 'Battery (A1406) Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'price' => 34.99,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1375) Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'description' => 'Battery (A1375) Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'price' => 34.03,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case + Keyboard Compatible For MacBook Air 11" (A1370 / Mid 2011) (UK English)',
        'description' => 'Top Case + Keyboard Compatible For MacBook Air 11" (A1370 / Mid 2011) (UK English)',
        'price' => 20.89,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case + Keyboard Compatible For MacBook Air 11" (A1370 / Mid 2011) (US English)',
        'description' => 'Top Case + Keyboard Compatible For MacBook Air 11" (A1370 / Mid 2011) (US English)',
        'price' => 33.56,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Air 11" / Air 13" (A1370 / A1465 / A1369 / A1466) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Air 11" / Air 13" (A1370 / A1465 / A1369 / A1466) (4 Piece Set)',
        'price' => 1.56,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'price' => 1.60,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Bottom Case Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 25.85,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'IPD Trackpad Flex Cable Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'description' => 'IPD Trackpad Flex Cable Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'price' => 1.21,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'IPD Trackpad Flex Cable Compatible For MacBook Air 13" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012)',
        'description' => 'IPD Trackpad Flex Cable Compatible For MacBook Air 13" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012)',
        'price' => 1.79,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'description' => 'Trackpad Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'price' => 25.17,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'description' => 'Trackpad Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'price' => 30.27,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard W/ Backlight & Screws (US English) Compatible For MacBook Air 11" (A1465) / (A1370 / Mid 2011)',
        'description' => 'Keyboard W/ Backlight & Screws (US English) Compatible For MacBook Air 11" (A1465) / (A1370 / Mid 2011)',
        'price' => 18.16,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011)',
        'description' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011)',
        'price' => 2.41,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1370 / Mid 2011)',
        'description' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1370 / Mid 2011)',
        'price' => 3.55,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board (MagSafe: USB: Audio) Compatible For MacBook Air 11" (A1370 / Mid 2011)',
        'description' => 'I/O Board (MagSafe: USB: Audio) Compatible For MacBook Air 11" (A1370 / Mid 2011)',
        'price' => 34.43,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'I/O Board (MagSafe: USB: Audio) Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'description' => 'I/O Board (MagSafe: USB: Audio) Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'price' => 39.72,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Display LVDS Cable + Left Hinge Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011)',
        'description' => 'Display LVDS Cable + Left Hinge Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011)',
        'price' => 0.87,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Quality - OEM Grade A/B 45W MagSafe 1 Power Adapter With Cable (L-Style) For MacBook (OEM Pull Grade: A/B)',
        'description' => '45W MagSafe 1 Power Adapter With Cable (L-Style) For MacBook (OEM Grade A/B) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Apollo S1 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'description' => 'Apollo S1 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'price' => 25.41,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Apollo S1 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'description' => 'Apollo S1 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'price' => 51.07,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Left LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Left LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.56,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Right LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Right LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.63,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Microphone Cable Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011)',
        'description' => 'Microphone Cable Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011)',
        'price' => 4.07,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Mid 2011) / Air 11" (A1465 / Mid 2012) / Air 13" (A1369 / Mid 2011) / Air 13" (A1466 / Mid 2012)',
        'description' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Mid 2011) / Air 11" (A1465 / Mid 2012) / Air 13" (A1369 / Mid 2011) / Air 13" (A1466 / Mid 2012)',
        'price' => 3.95,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Late 2010) / MacBook Air 13" (A1369 / Late 2010)',
        'description' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Late 2010) / MacBook Air 13" (A1369 / Late 2010)',
        'price' => 7.24,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Hinge Screws (Torx T8) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Hinge Screws (Torx T8) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 0.25,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Air 11" (A1370 / A1465) / Air 13" (A1369 / A1466)',
        'description' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Air 11" (A1370 / A1465) / Air 13" (A1369 / A1466)',
        'price' => 1.13,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Brackets And Screws Compatible For MacBook Air 11" (A1370) / Air 11" (1465) / Air 13" (A1369) / Air 13" (A1466)',
        'description' => 'Trackpad Brackets And Screws Compatible For MacBook Air 11" (A1370) / Air 11" (1465) / Air 13" (A1369) / Air 13" (A1466)',
        'price' => 1.31,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Pro 15" Retina (A1370 / A1465 / A1369 / A1425 / A1502 / A1398 / A1466)',
        'description' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Pro 15" Retina (A1370 / A1465 / A1369 / A1425 / A1502 / A1398 / A1466)',
        'price' => 1.33,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Air 13" (A1369 / A1466 / 2010 To 2017 ) / Air 11" (A1370 / A1465 / 2010 To 2015)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Air 13" (A1369 / A1466 / 2010 To 2017 ) / Air 11" (A1370 / A1465 / 2010 To 2015)',
        'price' => 1.60,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery Screws (Torx T5) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Battery Screws (Torx T5) Compatible For MacBook Air 11" / Air 13" (A1370 / A1369 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 4.61,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Screwdriver (Pentalobe P5) For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1369 / Late 2010 / Mid 2011) / Air 13" (A1466)',
        'description' => 'Screwdriver (Pentalobe P5) For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1369 / Late 2010 / Mid 2011) / Air 13" (A1466)',
        'price' => 7.91,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Clutch Cover Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Clutch Cover Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.98,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For Macbook Air 11" (A1370 / Mid 2011) / (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'CPU Fan Compatible For MacBook Air 11" (A1370 / Mid 2011) / (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 2.43,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For Macbook Air 11" (A1370 / Late 2010)',
        'description' => 'CPU Fan Compatible For MacBook Air 11" (A1370 / Late 2010)',
        'price' => 3.85,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 12
    ],
    [
        'name' => '4in1 (Top, Bottom, Keyboard, Trackpad) Skin Compatible For Macbook Air 11"(A1465 / 2012 To Early 2015) (A1370 / Late 2010 / Mid 2011)',
        'description' => '4in1 (Top, Bottom, Keyboard, Trackpad) Skin Compatible For Macbook Air 11"(A1465 / 2012 To Early 2015) (A1370 / Late 2010 / Mid 2011)',
        'price' => 0.00,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Tester Cable (Camera) Compatible For MacBook Air 11" / 13" / Pro Retina 13" / 15" (A1370 / A1369 / A1466 / A1425 / A1398 / Late 2010 To Mid 2012 )',
        'description' => 'Tester Cable (Camera) Compatible For MacBook Air 11" / 13" / Pro Retina 13" / 15" (A1370 / A1369 / A1466 / A1425 / A1398 / Late 2010 To Mid 2012 )',
        'price' => 2.61,
        'category' => 'MacBook Air 11" Parts (2010-2011)',
        'stock_quantity' => 10
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookAirA1370Parts as $part) {
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
echo "Total parts processed: " . count($macbookAirA1370Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Air A1370 parts population completed!\n";
