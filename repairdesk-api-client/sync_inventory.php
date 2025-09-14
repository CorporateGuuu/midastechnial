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
        $data = [
            'name' => $item['name'],
            'description' => $item['item_type'] ?? '',
            'price' => (float) $item['price']
        ];

        $response = $supabase->from('parts')->insert($data);
        if ($response) {
            $inserted++;
        }
    }

    echo "Inserted $inserted items into Supabase\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
