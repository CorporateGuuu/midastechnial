<?php
/**
 * Populate Supabase with Apollo S1 Mac SSD Parts
 *
 * This script inserts Apollo S1 SSD parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Apollo S1 Mac SSD Parts Data
$apolloS1SSDPParts = [
    [
        'name' => 'Apollo S1 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'description' => 'Apollo S1 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'price' => 25.41,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Apollo S1 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'description' => 'Apollo S1 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For Macbook Air A1370 A1369 (Late 2010 - Mid 2011)',
        'price' => 51.07,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 12
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($apolloS1SSDPParts as $part) {
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
echo "Total parts processed: " . count($apolloS1SSDPParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nApollo S1 SSD parts population completed!\n";
