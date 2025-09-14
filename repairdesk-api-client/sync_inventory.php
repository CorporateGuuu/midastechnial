<?php
/**
 * Sync Inventory from RepairDesk to Supabase
 */

require_once 'vendor/autoload.php';
require_once 'RepairDeskAPIClient.php';

use Supabase\SupabaseClient;

$supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ';

$supabase = new SupabaseClient($supabaseUrl, $supabaseKey);

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
