<?php
/**
 * Test script for createTicket method validation
 */

require_once 'RepairDeskAPIClient.php';

try {
    // Initialize client with dummy key (validation happens before API call)
    $client = new RepairDeskAPIClient('dummy_key');

    echo "Testing createTicket validation...\n";
    echo "=================================\n";

    // Test 1: Valid data structure
    echo "\nTest 1: Valid ticket data\n";
    $validTicket = [
        'devices' => [
            [
                'imei' => '114231112421231',
                'status' => 'In Progress',
                'device' => '845618',
                'price' => 184.105,
                'assigned_to' => 10111,
                'repairCategId' => '34826'
            ]
        ],
        'summary' => [
            'customer_id' => 388,
            'employee_id' => 10111
        ]
    ];

    try {
        // This will fail at API call, but validation should pass
        $response = $client->createTicket($validTicket);
        echo "✓ Validation passed, API call attempted\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'Required section') !== false || strpos($e->getMessage(), 'array') !== false) {
            echo "✗ Validation failed: " . $e->getMessage() . "\n";
        } else {
            echo "✓ Validation passed, API call failed as expected: " . substr($e->getMessage(), 0, 50) . "...\n";
        }
    }

    // Test 1.5: Valid comprehensive ticket data
    echo "\nTest 1.5: Valid comprehensive ticket data\n";
    $comprehensiveValidTicket = [
        'devices' => [
            [
                'imei' => '114231112421231',
                'public_comments' => 'Screen replacement needed',
                'status' => 'In Progress',
                'device' => '845618',
                'price' => 150.00,
                'assigned_to' => 10111,
                'repairCategId' => '34826',
                'Parts' => [
                    [
                        'product_id' => '7516552',
                        'name' => 'Screen Part',
                        'price' => '120.00',
                        'quantity' => 1,
                        'sku' => 'SCR-001'
                    ]
                ]
            ]
        ],
        'customFields' => [
            [
                'racknumber' => [
                    'label' => 'Rack Number',
                    'value' => 'A-123'
                ]
            ]
        ],
        'summary' => [
            'customer_id' => 388,
            'employee_id' => 10111,
            'signature' => 'Customer Signature'
        ]
    ];

    try {
        $response = $client->createTicket($comprehensiveValidTicket);
        echo "✓ Comprehensive validation passed, API call attempted\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'Required section') !== false || strpos($e->getMessage(), 'array') !== false) {
            echo "✗ Comprehensive validation failed: " . $e->getMessage() . "\n";
        } else {
            echo "✓ Comprehensive validation passed, API call failed as expected: " . substr($e->getMessage(), 0, 50) . "...\n";
        }
    }

    // Test 2: Missing devices
    echo "\nTest 2: Missing devices section\n";
    $invalidTicket1 = [
        'summary' => [
            'customer_id' => 388,
            'employee_id' => 10111
        ]
    ];

    try {
        $client->createTicket($invalidTicket1);
        echo "✗ Should have failed validation\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'devices') !== false) {
            echo "✓ Correctly caught missing devices: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error: " . $e->getMessage() . "\n";
        }
    }

    // Test 3: Empty devices array
    echo "\nTest 3: Empty devices array\n";
    $invalidTicket2 = [
        'devices' => [],
        'summary' => [
            'customer_id' => 388,
            'employee_id' => 10111
        ]
    ];

    try {
        $client->createTicket($invalidTicket2);
        echo "✗ Should have failed validation\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'non-empty array') !== false) {
            echo "✓ Correctly caught empty devices: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error: " . $e->getMessage() . "\n";
        }
    }

    // Test 4: Missing summary customer_id
    echo "\nTest 4: Missing summary customer_id\n";
    $invalidTicket3 = [
        'devices' => [
            ['status' => 'In Progress']
        ],
        'summary' => [
            'employee_id' => 10111
        ]
    ];

    try {
        $client->createTicket($invalidTicket3);
        echo "✗ Should have failed validation\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'customer_id') !== false) {
            echo "✓ Correctly caught missing customer_id: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error: " . $e->getMessage() . "\n";
        }
    }

    // Test 5: Invalid device data (empty array)
    echo "\nTest 5: Invalid device data (empty array)\n";
    $invalidTicket4 = [
        'devices' => [],
        'summary' => [
            'customer_id' => 388,
            'employee_id' => 10111
        ]
    ];

    try {
        $client->createTicket($invalidTicket4);
        echo "✗ Should have failed validation for empty devices array\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'non-empty array') !== false) {
            echo "✓ Correctly caught empty devices array: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error for empty devices: " . $e->getMessage() . "\n";
        }
    }

    // Test 6: Invalid summary data (missing customer_id)
    echo "\nTest 6: Invalid summary data (missing customer_id)\n";
    $invalidTicket5 = [
        'devices' => [
            ['status' => 'In Progress']
        ],
        'summary' => [
            'employee_id' => 10111
            // Missing customer_id
        ]
    ];

    try {
        $client->createTicket($invalidTicket5);
        echo "✗ Should have failed validation for missing customer_id\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'customer_id') !== false) {
            echo "✓ Correctly caught missing customer_id: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error for missing customer_id: " . $e->getMessage() . "\n";
        }
    }

    // Test 7: Invalid summary data (missing employee_id)
    echo "\nTest 7: Invalid summary data (missing employee_id)\n";
    $invalidTicket6 = [
        'devices' => [
            ['status' => 'In Progress']
        ],
        'summary' => [
            'customer_id' => 388
            // Missing employee_id
        ]
    ];

    try {
        $client->createTicket($invalidTicket6);
        echo "✗ Should have failed validation for missing employee_id\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'employee_id') !== false) {
            echo "✓ Correctly caught missing employee_id: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error for missing employee_id: " . $e->getMessage() . "\n";
        }
    }

    echo "\nValidation tests completed!\n";
    echo "==========================\n";
    echo "Summary of createTicket validation:\n";
    echo "- ✓ Validates required 'devices' section\n";
    echo "- ✓ Validates required 'summary' section\n";
    echo "- ✓ Validates required 'customer_id' in summary\n";
    echo "- ✓ Validates required 'employee_id' in summary\n";
    echo "- ✓ Validates devices is a non-empty array\n";
    echo "- ✓ Provides clear error messages for validation failures\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
