<?php
/**
 * Populate Supabase with Apollo S3 Plus Mac SSD Parts
 *
 * This script inserts Apollo S3 Plus SSD parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Apollo S3 Plus Mac SSD Parts Data
$apolloS3PlusSSDPParts = [
    [
        'name' => 'APOLLO High Performance SSD S3 Plus PCle 512GB (With DDR)',
        'description' => 'APOLLO High Performance SSD S3 Plus PCle 512GB (With DDR) - Compatible with various MacBook and PC systems',
        'price' => 58.19,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'APOLLO High Performance SSD S3 Plus PCle 1TB (With DDR)',
        'description' => 'APOLLO High Performance SSD S3 Plus PCle 1TB (With DDR) - Compatible with various MacBook and PC systems',
        'price' => 90.64,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 12
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($apolloS3PlusSSDPParts as $part) {
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
echo "Total parts processed: " . count($apolloS3PlusSSDPParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nApollo S3 Plus SSD parts population completed!\n";
