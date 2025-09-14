<?php
/**
 * Test Supabase connection
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use Supabase\CreateClient;

try {
    $supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

    // Test basic connection by trying to get table info
    echo "Testing Supabase connection...\n";
    echo "URL: " . SUPABASE_URL . "\n";
    echo "Key: " . substr(SUPABASE_KEY, 0, 20) . "...\n\n";

    // Try to select from a non-existent table to see if connection works
    $response = $supabase->from('parts')->select('count')->execute();

    echo "Connection successful!\n";
    echo "Response status: " . $response->status . "\n";
    echo "Response statusText: " . $response->statusText . "\n";

    if ($response->error) {
        echo "Error: " . json_encode($response->error) . "\n";
    } else {
        echo "No errors in response\n";
    }

    // Try to get table info
    echo "\nTrying to get table information...\n";
    $tableResponse = $supabase->rpc('get_table_info', ['table_name' => 'parts'])->execute();
    echo "Table info response: " . json_encode($tableResponse) . "\n";

} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
?>
