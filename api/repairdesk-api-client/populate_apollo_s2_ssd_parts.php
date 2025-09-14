<?php
/**
 * Populate Supabase with Apollo S2 Mac SSD Parts
 *
 * This script inserts Apollo S2 SSD parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Apollo S2 Mac SSD Parts Data
$apolloS2SSDPParts = [
    [
        'name' => 'Apollo S2 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'description' => 'Apollo S2 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'price' => 25.10,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Apollo S2 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'description' => 'Apollo S2 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'price' => 45.44,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 12
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($apolloS2SSDPParts as $part) {
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
echo "Total parts processed: " . count($apolloS2SSDPParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nApollo S2 SSD parts population completed!\n";
