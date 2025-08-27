<?php
require_once 'RepairDeskAPIClient_clean_version.php';

// Replace with your actual API key
$apiKey = 'YOUR_API_KEY_HERE';

try {
    $client = new RepairDeskAPIClient($apiKey);
    
    echo "Testing getStatuses() method...\n";
    
    // Get ticket statuses
    $statuses = $client->getStatuses();
    
    echo "Success! Retrieved " . count($statuses) . " ticket statuses:\n";
    
    foreach ($statuses as $status) {
        echo "- " . $status['name'] . " (" . $status['type'] . ")";
        if (isset($status['color'])) {
            echo " - Color: " . $status['color'];
        }
        echo "\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
