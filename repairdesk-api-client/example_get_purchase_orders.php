<?php
/**
 * Example usage of the getPurchaseOrders method
 * 
 * This example demonstrates how to retrieve purchase order details using the RepairDesk API client.
 */

// Include the API client
require_once __DIR__ . '/RepairDeskAPI.php';

// Load configuration if available
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}

// Initialize the API client
// Replace 'YOUR_API_KEY_HERE' with your actual RepairDesk API key
$apiKey = defined('REPAIRDESK_API_KEY') ? REPAIRDESK_API_KEY : 'YOUR_API_KEY_HERE';
$api = new RepairDeskAPI($apiKey);

try {
    // Example 1: Get purchase orders with basic pagination
    echo "Example 1: Get purchase orders with basic pagination\n";
    $params = [
        'page' => 1,
        'pagesize' => 10
    ];
    
    $purchaseOrders = $api->getPurchaseOrders($params);
    print_r($purchaseOrders);
    
    echo "\n" . str_repeat('-', 50) . "\n\n";
    
    // Example 2: Get purchase orders with filters
    echo "Example 2: Get purchase orders with filters\n";
    $params = [
        'page' => 1,
        'pagesize' => 10,
        'supplier' => 'Mobile Sentrix',
        'purchase_order_status' => 'Received'
    ];
    
    $purchaseOrders = $api->getPurchaseOrders($params);
    print_r($purchaseOrders);
    
    echo "\n" . str_repeat('-', 50) . "\n\n";
    
    // Example 3: Get purchase orders with date filters
    echo "Example 3: Get purchase orders with date filters\n";
    $params = [
        'page' => 1,
        'pagesize' => 10,
        'created_date' => '7days'
    ];
    
    $purchaseOrders = $api->getPurchaseOrders($params);
    print_r($purchaseOrders);
    
    echo "\n" . str_repeat('-', 50) . "\n\n";
    
    // Example 4: Get a specific purchase order by ID
    echo "Example 4: Get a specific purchase order by ID\n";
    $params = [
        'page' => 1,
        'pagesize' => 10,
        'id' => 41854
    ];
    
    $purchaseOrders = $api->getPurchaseOrders($params);
    print_r($purchaseOrders);
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
