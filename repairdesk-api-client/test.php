<?php
/**
 * Test script for RepairDesk API Client
 * 
 * This script demonstrates how to use the RepairDeskAPI class
 */

require_once 'RepairDeskAPI.php';

// Replace with your actual API key
$apiKey = 'tbpzKBH-6yxj-VB8Y-xYp0-jkO3HL8SB';

try {
    // Initialize the API client
    $repairDesk = new RepairDeskAPI($apiKey);
    
    echo "RepairDesk API Client Test\n";
    echo "==========================\n\n";
    
    // Test: Get devices
    echo "1. Testing getDevices() method:\n";
    try {
        $devices = $repairDesk->getDevices();
        echo "   Success! Retrieved " . count($devices) . " devices\n";
    } catch (Exception $e) {
        echo "   Error: " . $e->getMessage() . "\n";
    }
    
    echo "\n2. Testing getInventory() method:\n";
    try {
        $inventory = $repairDesk->getInventory();
        echo "   Success! Retrieved " . count($inventory) . " inventory items\n";
    } catch (Exception $e) {
        echo "   Error: " . $e->getMessage() . "\n";
    }
    
    echo "\n3. Testing getCustomers() method:\n";
    try {
        $customers = $repairDesk->getCustomers();
        echo "   Success! Retrieved " . count($customers) . " customers\n";
    } catch (Exception $e) {
        echo "   Error: " . $e->getMessage() . "\n";
    }
    
    echo "\n4. Testing getRepairTickets() method:\n";
    try {
        $tickets = $repairDesk->getRepairTickets();
        echo "   Success! Retrieved " . count($tickets) . " repair tickets\n";
    } catch (Exception $e) {
        echo "   Error: " . $e->getMessage() . "\n";
    }
    
    echo "\n5. Testing getOrders() method:\n";
    try {
        $orders = $repairDesk->getOrders();
        echo "   Success! Retrieved " . count($orders) . " orders\n";
    } catch (Exception $e) {
        echo "   Error: " . $e->getMessage() . "\n";
    }
    
    echo "\n6. Testing getAppointments() method:\n";
    try {
        $appointments = $repairDesk->getAppointments();
        echo "   Success! Retrieved " . count($appointments) . " appointments\n";
    } catch (Exception $e) {
        echo "   Error: " . $e->getMessage() . "\n";
    }
    
    echo "\nTest completed!\n";
    
} catch (Exception $e) {
    echo "Failed to initialize API client: " . $e->getMessage() . "\n";
    echo "Please make sure you have:\n";
    echo "1. A valid RepairDesk API key\n";
    echo "2. cURL extension enabled in PHP\n";
    echo "3. Internet connection\n";
}
?>
