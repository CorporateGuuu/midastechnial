<?php
/**
 * Populate Supabase with Apollo S4 Mac SSD Parts
 *
 * This script inserts Apollo S4 SSD parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Apollo S4 Mac SSD Parts Data
$apolloS4SSDPParts = [
    [
        'name' => 'Apollo S4 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Pro 13" Retina (A1708 / Late 2016 / Mid 2017) / Pro 15" (A1707 / Late 2016 / Mid 2017) / Pro 13" Touch Bar (A1989 / Late 2016 / Mid 2017) / Pro 15" Touch Bar (A1990 / Late 2016 / Mid 2017)',
        'description' => 'Apollo S4 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Pro 13" Retina (A1708 / Late 2016 / Mid 2017) / Pro 15" (A1707 / Late 2016 / Mid 2017) / Pro 13" Touch Bar (A1989 / Late 2016 / Mid 2017) / Pro 15" Touch Bar (A1990 / Late 2016 / Mid 2017)',
        'price' => 82.84,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Apollo S4 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Pro 13" Retina (A1708 / Late 2016 / Mid 2017) / Pro 15" (A1707 / Late 2016 / Mid 2017) / Pro 13" Touch Bar (A1989 / Late 2016 / Mid 2017) / Pro 15" Touch Bar (A1990 / Late 2016 / Mid 2017)',
        'description' => 'Apollo S4 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Pro 13" Retina (A1708 / Late 2016 / Mid 2017) / Pro 15" (A1707 / Late 2016 / Mid 2017) / Pro 13" Touch Bar (A1989 / Late 2016 / Mid 2017) / Pro 15" Touch Bar (A1990 / Late 2016 / Mid 2017)',
        'price' => 124.99,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 8
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($apolloS4SSDPParts as $part) {
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
echo "Total parts processed: " . count($apolloS4SSDPParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nApollo S4 SSD parts population completed!\n";
