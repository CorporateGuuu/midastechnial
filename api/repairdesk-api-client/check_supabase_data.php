<?php
/**
 * Check current data in Supabase parts table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

try {
    $response = $supabase->from('parts')->select('*')->execute();

    // Debug: print response structure
    echo "Response type: " . gettype($response) . "\n";
    if (is_object($response)) {
        echo "Response class: " . get_class($response) . "\n";
        echo "Response properties: " . implode(', ', array_keys(get_object_vars($response))) . "\n";
    }

    // Try to access data
    if (is_object($response) && property_exists($response, 'data')) {
        $parts = $response->data;
    } elseif (is_array($response) && isset($response['data'])) {
        $parts = $response['data'];
    } else {
        $parts = $response;
    }

    if ($parts && is_array($parts)) {
        echo "\nCurrent parts in Supabase database:\n";
        echo "==================================\n\n";

        if (empty($parts)) {
            echo "No parts found in database.\n";
        } else {
            echo sprintf("%-5s %-20s %-30s %-10s\n", "ID", "Name", "Description", "Price");
            echo str_repeat("-", 70) . "\n";

            foreach ($parts as $part) {
                echo sprintf(
                    "%-5s %-20s %-30s $%-9.2f\n",
                    $part['id'] ?? 'N/A',
                    substr($part['name'] ?? '', 0, 20),
                    substr($part['description'] ?? '', 0, 30),
                    $part['price'] ?? 0
                );
            }

            echo "\nTotal parts: " . count($parts) . "\n";
        }
    } else {
        echo "Failed to fetch data from Supabase or no data found.\n";
        if ($response) {
            print_r($response);
        }
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
