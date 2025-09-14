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
    echo "\极速赛车开奖直播历史记录nTesting API connection...\n";
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
    } catch (Exception $极速赛车开奖直播历史记录e) {
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
    
    // Example: Get ticket statuses
    echo "\nExample: Getting ticket statuses\n";
    echo "===============================\n";
    try {
        $statuses = $client->getStatuses();
        echo "Found " . count($statuses) . " ticket statuses\n";
        
        if (!empty($statuses)) {
            foreach ($statuses as $status) {
                echo "- " . ($status['name'] ?? 'Unknown') . " (" . ($status['type'] ?? 'No type') . ", Color: " . ($status['color'] ?? 'No color') . ")\n";
                break; // Just show first status
            }
        }
    } catch (Exception $e) {
        echo "Error getting statuses: " . $e->getMessage() . "\n";
    }
    
    // Example: Update ticket status
    echo "\nExample: Updating ticket status\n";
    echo "===============================\n";
    try {
        $ticketId = 123; // Replace with a valid ticket ID
        $statusData = [
            'status' => 'In Progress' // Replace with the desired status
        ];
        $response = $client->updateTicketStatus($ticketId, $statusData);
        echo "Ticket status updated successfully: " . json_encode($response) . "\n";
    } catch (Exception $e) {
        echo "Error updating ticket status: " . $e->getMessage() . "\n";
    }

    // Example: Create new repair ticket (Basic)
    echo "\nExample: Creating a basic repair ticket\n";
    echo "=======================================\n";
    try {
        $basicTicketData = [
            'devices' => [
                [
                    'imei' => '114231112421231',
                    'public_comments' => 'Screen replacement needed',
                    'status' => 'In Progress',
                    'device' => '845618', // Device ID from RepairDesk
                    'price' => 150.00,
                    'assigned_to' => 10111, // Employee ID
                    'repairCategId' => '34826' // Repair category ID
                ]
            ],
            'summary' => [
                'customer_id' => 388, // Customer ID from RepairDesk
                'employee_id' => 10111 // Employee ID who created the ticket
            ]
        ];

        echo "Creating basic ticket with minimal required fields...\n";
        $response = $client->createTicket($basicTicketData);
        echo "✓ Basic ticket created successfully: " . json_encode($response, JSON_PRETTY_PRINT) . "\n";
    } catch (Exception $e) {
        echo "✗ Error creating basic ticket: " . $e->getMessage() . "\n";
    }

    // Example: Create comprehensive repair ticket
    echo "\nExample: Creating a comprehensive repair ticket\n";
    echo "===============================================\n";
    try {
        $comprehensiveTicketData = [
            'devices' => [
                [
                    'imei' => '114231112421231',
                    'public_comments' => 'Our team is working on it',
                    'public_comment_flag' => 1,
                    'PreConditions' => [],
                    'status' => 'In Progress',
                    'PostPreCategory' => '34826',
                    'task_type' => 1,
                    'gst' => 14.894,
                    'device' => '845618',
                    'staff_comments' => 'Customer reported screen issues',
                    'warranty' => '5',
                    'lineItemId' => 0,
                    'repairProdItems' => [
                        [
                            'id' => '7516047',
                            'name' => 'Huawei Mate 9 Screen Replacement Blk'
                        ]
                    ],
                    'line_discount' => 0,
                    'taxclass' => 28632,
                    'device_location' => 'Front Desk',
                    'warranty_timeframe' => '3',
                    'Parts' => [
                        [
                            'product_id' => '7516552',
                            'name' => 'Huawei Mate 9 Screen Replacement Blk',
                            'price' => '120.00',
                            'quantity' => 1,
                            'supplier' => 'Parts Supplier Inc',
                            'warranty_timeframe' => '12',
                            'warrenty' => '12',
                            'serials' => ['0' => 'SN123456'],
                            'sku' => 'HW-M9-SCR-BLK'
                        ]
                    ],
                    'supplied' => [],
                    'security_code' => '',
                    'network' => 'Unlocked',
                    'serial' => 'HW987654321',
                    'price' => 184.105,
                    'due_on' => 1588156799,
                    'tax_inclusive' => '1',
                    'assigned_to' => 10111,
                    'repairCategId' => '34826',
                    'images' => []
                ]
            ],
            'customFields' => [
                [
                    'racknumber' => [
                        'label' => 'Rack Number',
                        'value' => '311'
                    ],
                    'shipmentnum' => [
                        'label' => 'Shipment Number',
                        'value' => '12344211'
                    ]
                ]
            ],
            'summary' => [
                'signature' => 'Customer Signature',
                'how_did_u_find_us' => 'Google Search',
                'customer_id' => 388,
                'estimate_id' => 'EST-001',
                'employee_id' => 10111
            ]
        ];

        echo "Creating comprehensive ticket with all optional fields...\n";
        $response = $client->createTicket($comprehensiveTicketData);
        echo "✓ Comprehensive ticket created successfully: " . json_encode($response, JSON_PRETTY_PRINT) . "\n";
    } catch (Exception $e) {
        echo "✗ Error creating comprehensive ticket: " . $e->getMessage() . "\n";
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
    echo "- getStatuses()\n";
    echo "- updateTicketStatus()\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "\nTroubleshooting:\n";
    echo "1. Make sure you have a valid RepairDesk API key\n";
    echo "2. Check your internet connection\n";
    echo "3. Verify the API endpoint is correct\n";
    echo "4. Ensure cURL extension is enabled in PHP\n";
}
?>
