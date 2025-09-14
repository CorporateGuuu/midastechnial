<?php
/**
 * Populate Supabase with Apollo 2.5" SSD Parts
 *
 * This script inserts Apollo SSD parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Apollo 2.5" SSD Parts Data
$apolloSSDPParts = [
    [
        'name' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 128GB',
        'description' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 128GB - Compatible with various MacBook and PC systems',
        'price' => 14.27,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 25
    ],
    [
        'name' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 256GB',
        'description' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 256GB - Compatible with various MacBook and PC systems',
        'price' => 23.39,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 512GB',
        'description' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 512GB - Compatible with various MacBook and PC systems',
        'price' => 40.61,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 1TB',
        'description' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 1TB - Compatible with various MacBook and PC systems',
        'price' => 71.95,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 2TB',
        'description' => 'Apollo High Performance 2.5" SSD 3D TLC Nand 2TB - Compatible with various MacBook and PC systems',
        'price' => 138.60,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 8
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($apolloSSDPParts as $part) {
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
echo "Total parts processed: " . count($apolloSSDPParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nApollo SSD parts population completed!\n";
