<?php
/**
 * Populate Supabase with dummy parts data
 */

require_once __DIR__ . '/vendor/autoload.php';

use Supabase\SupabaseClient;

$supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ';

$supabase = new \Supabase\SupabaseClient($supabaseUrl, $supabaseKey);

$dummyParts = [
    ['name' => 'iPhone Screen', 'description' => 'Replacement screen for iPhone', 'price' => 89.99],
    ['name' => 'Charging Adapter', 'description' => 'USB charging adapter', 'price' => 19.99],
    ['name' => 'Battery Pack', 'description' => 'Portable battery pack', 'price' => 49.99],
    ['name' => 'Screen Protector', 'description' => 'Tempered glass screen protector', 'price' => 9.99],
    ['name' => 'Phone Case', 'description' => 'Protective phone case', 'price' => 14.99]
];

try {
    $response = $supabase->from('parts')->insert($dummyParts);
    echo "Inserted dummy data into Supabase\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
