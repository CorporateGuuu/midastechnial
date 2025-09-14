<?php
/**
 * Sync Inventory from RepairDesk to Supabase
 */

require_once 'vendor/autoload.php';
require_once 'config.php';
require_once 'RepairDeskAPIClient.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

try {
    $client = new RepairDeskAPIClient();
    $inventory = $client->getInventory();

    echo "Fetched " . count($inventory) . " items from RepairDesk\n";

    // Clear existing data
    $supabase->from('parts')->delete()->neq('id', 0); // Delete all

    $inserted = 0;
    foreach ($inventory as $item) {
        // Map API response fields to database fields
        $data = [
            'name' => $item['name'] ?? 'Unknown Item',
            'description' => $item['description'] ?? '',
            'price' => (float) ($item['retail_price'] ?? $item['cost_price'] ?? $item['price'] ?? 0)
        ];

        $response = $supabase->from('parts')->insert($data)->execute();
        if ($response && $response->status === 200) {
            $inserted++;
        } else {
            echo "Failed to insert item: " . ($item['name'] ?? 'Unknown') . "\n";
            if ($response && $response->error) {
                echo "Error: " . json_encode($response->error) . "\n";
            }
        }
    }

    echo "Inserted $inserted items into Supabase\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
