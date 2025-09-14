<?php
require_once 'RepairDeskAPIClient.php';

// Replace with your actual API key
$apiKey = 'YOUR_API_KEY_HERE';

// Create an instance of the RepairDeskAPIClient
$client = new RepairDeskAPIClient($apiKey);

// Define the parameters for the request
$params = [
    'page' => 1,
    'pagesize' => 10,
    // Add other parameters as needed
];

// Call the getPurchaseOrders method
try {
    $purchaseOrders = $client->getPurchaseOrders($params);
    echo json_encode($purchaseOrders, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
