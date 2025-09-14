<?php
/**
 * Example demonstrating proper field validation for RepairDesk API
 * 
 * This shows how to use the API client with the correct field requirements
 */

require_once 'RepairDeskAPIClient.php';

try {
    echo "RepairDesk API Validation Example\n";
    echo "=================================\n\n";
    
    // Initialize client (using config file or manual setup)
    if (file_exists(__DIR__ . '/config.php')) {
        $client = new RepairDeskAPIClient();
        echo "✓ Client initialized with config file\n";
    } else {
        echo "⚠ Config file not found. Please run install.php first.\n";
        echo "For this example, we'll proceed with a placeholder API key...\n";
        $client = new RepairDeskAPIClient('placeholder_key');
    }
    
    echo "\nExample: Creating an Inventory Item with Proper Validation\n";
    echo "=========================================================\n";
    
    // Example of correct inventory item data structure
    $inventoryItem = [
        'name' => 'iPhone 13 Screen Assembly',
        'item_type' => 'Parts',
        'manufacturer' => 11231, // Manufacturer ID from RepairDesk
        'device' => 44221, // Device ID from RepairDesk
        'in_stock' => 25,
        'cost_price' => 45.99,
        'price' => 89.99,
        'tax_class' => 11221, // Tax class ID from RepairDesk
        'tax_inclusive' => 0,
        'sku' => 'IPH13-SCREEN-001',
        'supplier' => 11144, // Supplier ID from RepairDesk
        'upc_code' => '123456789012',
        'valuation_method' => 1,
        'is_serialize' => 0
    ];
    
    echo "Inventory item data structure:\n";
    echo json_encode($inventoryItem, JSON_PRETTY_PRINT) . "\n\n";
    
    echo "Required fields for inventory items:\n";
    $requiredFields = ['name', 'item_type', 'manufacturer', 'device', 'in_stock', 
                      'cost_price', 'price', 'tax_class', 'sku'];
    foreach ($requiredFields as $field) {
        echo "- $field: " . (isset($inventoryItem[$field]) ? '✓ Present' : '✗ Missing') . "\n";
    }
    
    echo "\nExample: Creating a Customer\n";
    echo "===========================\n";
    
    $customerData = [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john.doe@example.com',
        'phone' => '+1234567890',
        'address' => '123 Main St',
        'city' => 'Anytown',
        'state' => 'CA',
        'zip_code' => '12345',
        'country' => 'US'
    ];
    
    echo "Customer data structure:\n";
    echo json_encode($customerData, JSON_PRETTY_PRINT) . "\n\n";
    
    echo "\nExample: Creating a Repair Ticket (Simple)\n";
    echo "=========================================\n";

    $repairTicket = [
        'customer_id' => 12345, // Existing customer ID
        'device_id' => 44221, // Existing device ID
        'issue' => 'Screen replacement needed',
        'status' => 'pending',
        'priority' => 'medium',
        'estimated_cost' => 89.99,
        'estimated_time' => '2 hours'
    ];

    echo "Simple repair ticket data structure:\n";
    echo json_encode($repairTicket, JSON_PRETTY_PRINT) . "\n\n";

    echo "\nExample: Creating a Comprehensive Repair Ticket with Validation\n";
    echo "===========================================================\n";

    $comprehensiveTicket = [
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

    echo "Comprehensive repair ticket data structure:\n";
    echo json_encode($comprehensiveTicket, JSON_PRETTY_PRINT) . "\n\n";

    echo "Required sections for comprehensive ticket:\n";
    $requiredSections = ['devices', 'summary'];
    foreach ($requiredSections as $section) {
        echo "- $section: " . (isset($comprehensiveTicket[$section]) ? '✓ Present' : '✗ Missing') . "\n";
    }

    echo "\nRequired summary fields:\n";
    $requiredSummaryFields = ['customer_id', 'employee_id'];
    foreach ($requiredSummaryFields as $field) {
        echo "- summary.$field: " . (isset($comprehensiveTicket['summary'][$field]) ? '✓ Present' : '✗ Missing') . "\n";
    }

    echo "\nValidating devices array:\n";
    if (is_array($comprehensiveTicket['devices']) && !empty($comprehensiveTicket['devices'])) {
        echo "- devices: ✓ Is a non-empty array\n";
    } else {
        echo "- devices: ✗ Must be a non-empty array\n";
    }

    echo "\nExample: Testing createTicket with Validation\n";
    echo "============================================\n";

    try {
        echo "Testing comprehensive ticket creation...\n";
        $response = $client->createTicket($comprehensiveTicket);
        echo "✓ Ticket created successfully!\n";
        echo "Response: " . json_encode($response, JSON_PRETTY_PRINT) . "\n";
    } catch (Exception $e) {
        echo "✗ Error creating ticket: " . $e->getMessage() . "\n";
        echo "This is expected if using dummy API key for validation testing.\n";
    }
    
    echo "\nError Handling Examples:\n";
    echo "=======================\n";
    
    // Example of missing required fields
    $invalidItem = [
        'name' => 'Test Item',
        // Missing: item_type, manufacturer, device, etc.
    ];
    
    echo "Testing validation with missing required fields:\n";
    try {
        $client->addInventoryItem($invalidItem);
        echo "✗ Validation should have failed!\n";
    } catch (Exception $e) {
        echo "✓ Validation correctly caught error: " . $e->getMessage() . "\n";
    }
    
    echo "\nBest Practices:\n";
    echo "==============\n";
    echo "1. Always check the RepairDesk API documentation for required fields\n";
    echo "2. Use try-catch blocks to handle API errors gracefully\n";
    echo "3. Validate data before making API calls\n";
    echo "4. Handle different response status codes appropriately\n";
    echo "5. Implement retry logic for transient errors\n";
    
    echo "\nValidation example completed successfully!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
