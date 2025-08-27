<?php
/**
 * Example usage of RepairDesk API Client
 * 
 * This demonstrates various use cases for the RepairDesk API client
 */

require_once 'RepairDeskAPIClient.php';

try {
    // Method 1: Using configuration file
    // Create config.php from config.example.php with your API key
    echo "Method 1: Using configuration file\n";
    echo "==================================\n";
    
    if (file_exists(__DIR__ . '/config.php')) {
        $client = new RepairDeskAPIClient();
        echo "Client initialized with config file\n";
    } else {
        echo "Config file not found. Using manual setup...\n";
        
        // Method 2: Manual setup
        echo "\nMethod 2: Manual setup\n";
        echo "======================\n";
        
        $apiKey = 'your_repairdesk_api_key_here'; // Replace with your actual API key
        $client = new RepairDeskAPIClient($apiKey);
        echo "Client initialized with manual API key\n";
    }
    
    // Test connection
    echo "\nTesting API connection...\n";
    try {
        $client->testConnection();
        echo "✓ Connection successful!\n";
    } catch (Exception $e) {
        echo "✗ Connection failed: " . $e->getMessage() . "\n";
        exit(1);
    }
    
    // Example: Get devices
    echo "\nExample: Getting devices\n";
    echo "=======================\n";
    try {
        $devices = $client->getDevices();
        echo "Found " . count($devices) . " devices\n";
        
        if (!empty($devices)) {
            echo "First device: " . ($devices[0]['name'] ?? 'Unknown') . "\n";
        }
    } catch (Exception $e) {
        echo "Error getting devices: " . $e->getMessage() . "\n";
    }
    
    // Example: Get inventory
    echo "\nExample: Getting inventory\n";
    echo "==========================\n";
    try {
        $inventory = $client->getInventory(['limit' => 5]);
        echo "Found " . count($inventory) . " inventory items\n";
        
        if (!empty($inventory)) {
            foreach ($inventory as $item) {
                echo "- " . ($item['name'] ?? 'Unknown') . " (SKU: " . ($item['sku'] ?? 'N/A') . ")\n";
                break; // Just show first item
            }
        }
    } catch (Exception $e) {
        echo "Error getting inventory: " . $e->getMessage() . "\n";
    }
    
    // Example: Get customers
    echo "\nExample: Getting customers\n";
    echo "==========================\n";
    try {
        $customers = $client->getCustomers(['limit' => 3]);
        echo "Found " . count($customers) . " customers\n";
        
        if (!empty($customers)) {
            foreach ($customers as $customer) {
                echo "- " . ($customer['name'] ?? 'Unknown') . " (" . ($customer['email'] ?? 'No email') . ")\n";
                break; // Just show first customer
            }
        }
    } catch (Exception $e) {
        echo "Error getting customers: " . $e->getMessage() . "\n";
    }
    
    echo "\nAPI Client Examples Completed Successfully!\n";
    echo "==========================================\n";
    echo "You can now use the client methods to interact with RepairDesk API:\n";
    echo "- getDevices(), getDevice()\n";
    echo "- getInventory(), addInventoryItem(), updateInventoryItem()\n";
    echo "- getCustomers(), getCustomer(), updateCustomer()\n";
    echo "- getRepairTickets(), createRepairTicket(), updateRepairTicket()\n";
    echo "- getOrders(), getOrder()\n";
    echo "- getAppointments(), createAppointment()\n";
    echo "- createLead()\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "\nTroubleshooting:\n";
    echo "1. Make sure you have a valid RepairDesk API key\n";
    echo "2. Check your internet connection\n";
    echo "3. Verify the API endpoint is correct\n";
    echo "4. Ensure cURL extension is enabled in PHP\n";
}
?>
