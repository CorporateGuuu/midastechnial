<?php
/**
 * Populate Supabase with Apollo S3 Mac SSD Parts
 *
 * This script inserts Apollo S3 SSD parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Apollo S3 Mac SSD Parts Data
$apolloS3SSDPParts = [
    [
        'name' => 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'description' => 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 19.24,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'description' => 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 26.03,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 18
    ],
    [
        'name' => 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'description' => 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 44.72,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'description' => 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 83.94,
        'category' => 'Storage - SSD Parts',
        'stock_quantity' => 10
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($apolloS3SSDPParts as $part) {
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
echo "Total parts processed: " . count($apolloS3SSDPParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nApollo S3 SSD parts population completed!\n";
