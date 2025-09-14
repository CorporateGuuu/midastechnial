<?php
/**
 * Create the parts table in Supabase
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

try {
    echo "Creating parts table...\n";

    // First, let's try to create a simple test record to see if the table exists
    $testData = [
        'name' => 'Test Part',
        'description' => 'Test description',
        'price' => 9.99
    ];

    $response = $supabase->from('parts')->insert($testData)->execute();

    if ($response && $response->status === 200) {
        echo "Table exists and data inserted successfully!\n";
        echo "Response: " . json_encode($response->data) . "\n";
    } else {
        echo "Insert failed. Response status: " . ($response ? $response->status : 'null') . "\n";
        if ($response && $response->error) {
            echo "Error: " . json_encode($response->error) . "\n";
        }
    }

} catch (Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}
?>
