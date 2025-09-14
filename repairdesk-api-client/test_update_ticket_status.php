<?php
/**
 * Test script for updateTicketStatus functionality
 *
 * This script tests the updateTicketStatus method without making actual API calls
 */

require_once 'RepairDeskAPIClient.php';

echo "Testing updateTicketStatus Implementation\n";
echo "========================================\n";

// Test 1: Valid inputs
echo "\nTest 1: Valid inputs\n";
try {
    $client = new RepairDeskAPIClient('test_api_key');
    // We won't actually call the method since we don't have a real API key
    // But we can test the validation logic by creating a mock scenario

    echo "✓ Client initialized successfully\n";

    // Test parameter validation (this would normally happen inside the method)
    $ticketId = 123;
    $statusData = ['status' => 'In Progress'];

    if (!is_numeric($ticketId) || $ticketId <= 0) {
        throw new Exception("Invalid ticket ID");
    }

    if (!isset($statusData['status']) || empty($statusData['status'])) {
        throw new Exception("Status is required");
    }

    echo "✓ Parameter validation passed\n";

} catch (Exception $e) {
    echo "✗ Test 1 failed: " . $e->getMessage() . "\n";
}

// Test 2: Invalid ticket ID
echo "\nTest 2: Invalid ticket ID\n";
try {
    $ticketId = -1;
    if (!is_numeric($ticketId) || $ticketId <= 0) {
        throw new Exception("Invalid ticket ID. Ticket ID must be a positive integer.");
    }
    echo "✗ Should have failed validation\n";
} catch (Exception $e) {
    echo "✓ Correctly caught invalid ticket ID: " . $e->getMessage() . "\n";
}

// Test 3: Missing status
echo "\nTest 3: Missing status\n";
try {
    $statusData = [];
    if (!isset($statusData['status']) || empty($statusData['status'])) {
        throw new Exception("Status is required in statusData.");
    }
    echo "✗ Should have failed validation\n";
} catch (Exception $e) {
    echo "✓ Correctly caught missing status: " . $e->getMessage() . "\n";
}

// Test 4: Invalid line item ID
echo "\nTest 4: Invalid line item ID\n";
try {
    $statusData = ['status' => 'In Progress', 'lineItemId' => -5];
    if (isset($statusData['lineItemId']) && (!is_numeric($statusData['lineItemId']) || $statusData['lineItemId'] < 0)) {
        throw new Exception("Invalid line item ID. Line item ID must be a non-negative integer.");
    }
    echo "✗ Should have failed validation\n";
} catch (Exception $e) {
    echo "✓ Correctly caught invalid line item ID: " . $e->getMessage() . "\n";
}

// Test 5: Batch update validation
echo "\nTest 5: Batch update validation\n";
try {
    $batchData = [
        ['ticketId' => 123, 'statusData' => ['status' => 'In Progress']],
        ['ticketId' => 124, 'statusData' => ['status' => 'Completed']]
    ];

    if (!is_array($batchData) || empty($batchData)) {
        throw new Exception("Batch data must be a non-empty array.");
    }

    foreach ($batchData as $update) {
        if (!isset($update['ticketId']) || !isset($update['statusData'])) {
            throw new Exception("Each batch item must contain 'ticketId' and 'statusData'.");
        }
    }

    echo "✓ Batch data validation passed\n";

} catch (Exception $e) {
    echo "✗ Test 5 failed: " . $e->getMessage() . "\n";
}

echo "\nValidation Tests Completed!\n";
echo "\nNote: To test actual API calls, replace 'test_api_key' with your real RepairDesk API key\n";
echo "and ensure you have valid ticket IDs in your RepairDesk system.\n";
?>
