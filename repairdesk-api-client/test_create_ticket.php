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

    echo "\nValidation tests completed!\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
