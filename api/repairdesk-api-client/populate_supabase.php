<?php
/**
 * Populate Supabase with dummy parts data
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

$dummyParts = [
    ['name' => 'iPhone Screen', 'description' => 'Replacement screen for iPhone', 'price' => 89.99],
    ['name' => 'Charging Adapter', 'description' => 'USB charging adapter', 'price' => 19.99],
    ['name' => 'Battery Pack', 'description' => 'Portable battery pack', 'price' => 49.99],
    ['name' => 'Screen Protector', 'description' => 'Tempered glass screen protector', 'price' => 9.99],
    ['name' => 'Phone Case', 'description' => 'Protective phone case', 'price' => 14.99]
];

try {
    $response = $supabase->from('parts')->insert($dummyParts)->execute();
    echo "Response status: " . $response->status . "\n";
    echo "Response statusText: " . $response->statusText . "\n";
    if ($response->error) {
        echo "Error: " . json_encode($response->error) . "\n";
    } else {
        echo "Inserted dummy data into Supabase\n";
        echo "Data: " . json_encode($response->data) . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
