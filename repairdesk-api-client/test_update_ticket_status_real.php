<?php
/**
 * Real API testing for updateTicketStatus functionality
 * Uses actual RepairDesk API with provided API key
 */

require_once 'RepairDeskAPIClient.php';

$apiKey = 'tbpzKBH-6yxj-VB8Y-xYp0-jkO3HL8SB';

echo "Testing updateTicketStatus with Real API\n";
echo "========================================\n";

try {
    // Initialize the API client with real key
    $client = new RepairDeskAPIClient($apiKey);

    // Test 1: Test connection
    echo "\nTest 1: Testing API connection\n";
    try {
        $client->testConnection();
        echo "✓ API connection successful\n";
    } catch (Exception $e) {
        echo "✗ API connection failed: " . $e->getMessage() . "\n";
        exit(1);
    }

    // Test 2: Get existing tickets to find one for testing
    echo "\nTest 2: Getting existing tickets\n";
    try {
        $tickets = $client->getRepairTickets(['page' => 1, 'pagesize' => 5]);
        if (empty($tickets)) {
            echo "✗ No existing tickets found. Cannot test updateTicketStatus without tickets.\n";
            echo "Please create a ticket first using the create ticket functionality.\n";
            exit(1);
        }

        $testTicket = $tickets[0]; // Use the first ticket for testing
        $ticketId = $testTicket['id'];
        echo "✓ Found ticket ID: $ticketId for testing\n";
        echo "Current status: " . ($testTicket['status'] ?? 'Unknown') . "\n";

    } catch (Exception $e) {
        echo "✗ Failed to get tickets: " . $e->getMessage() . "\n";
        exit(1);
    }

    // Test 3: Test individual ticket status update
    echo "\nTest 3: Testing individual ticket status update\n";
    $originalStatus = $testTicket['status'] ?? 'Unknown';
    $newStatus = 'In Progress';

    try {
        $statusData = [
            'status' => $newStatus
        ];

        $response = $client->updateTicketStatus($ticketId, $statusData);
        echo "✓ Individual update successful\n";
        echo "Response: " . json_encode($response, JSON_PRETTY_PRINT) . "\n";

    } catch (Exception $e) {
        echo "✗ Individual update failed: " . $e->getMessage() . "\n";
    }

    // Test 4: Test batch update (using the same ticket)
    echo "\nTest 4: Testing batch ticket status update\n";
    try {
        $batchData = [
            [
                'ticketId' => $ticketId,
                'statusData' => [
                    'status' => 'Completed'
                ]
            ]
        ];

        $batchResults = $client->updateTicketStatuses($batchData);
        echo "✓ Batch update completed\n";

        foreach ($batchResults as $result) {
            if ($result['success']) {
                echo "✓ Batch item {$result['index']}: SUCCESS\n";
            } else {
                echo "✗ Batch item {$result['index']}: FAILED - {$result['error']}\n";
            }
        }

    } catch (Exception $e) {
        echo "✗ Batch update failed: " . $e->getMessage() . "\n";
    }

    // Test 5: Test error scenarios
    echo "\nTest 5: Testing error scenarios\n";

    // Test 5a: Invalid ticket ID
    echo "Testing invalid ticket ID...\n";
    try {
        $client->updateTicketStatus(-1, ['status' => 'In Progress']);
        echo "✗ Should have failed with invalid ticket ID\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'Invalid ticket ID') !== false) {
            echo "✓ Correctly caught invalid ticket ID: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error for invalid ticket ID: " . $e->getMessage() . "\n";
        }
    }

    // Test 5b: Missing status
    echo "Testing missing status...\n";
    try {
        $client->updateTicketStatus($ticketId, []);
        echo "✗ Should have failed with missing status\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'Status is required') !== false) {
            echo "✓ Correctly caught missing status: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error for missing status: " . $e->getMessage() . "\n";
        }
    }

    // Test 5c: Invalid line item ID
    echo "Testing invalid line item ID...\n";
    try {
        $client->updateTicketStatus($ticketId, ['status' => 'In Progress', 'lineItemId' => -5]);
        echo "✗ Should have failed with invalid line item ID\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), 'Invalid line item ID') !== false) {
            echo "✓ Correctly caught invalid line item ID: " . $e->getMessage() . "\n";
        } else {
            echo "? Unexpected error for invalid line item ID: " . $e->getMessage() . "\n";
        }
    }

    // Test 6: Test with line item ID
    echo "\nTest 6: Testing update with line item ID\n";
    try {
        $statusData = [
            'status' => 'Waiting for Parts',
            'lineItemId' => 0  // Main ticket line item
        ];

        $response = $client->updateTicketStatus($ticketId, $statusData);
        echo "✓ Update with line item ID successful\n";
        echo "Response: " . json_encode($response, JSON_PRETTY_PRINT) . "\n";

    } catch (Exception $e) {
        echo "✗ Update with line item ID failed: " . $e->getMessage() . "\n";
    }

    echo "\nReal API Testing Completed!\n";
    echo "===============================\n";
    echo "Summary:\n";
    echo "- API Connection: ✓\n";
    echo "- Individual Update: Tested\n";
    echo "- Batch Update: Tested\n";
    echo "- Error Handling: Tested\n";
    echo "- Line Item Updates: Tested\n";

} catch (Exception $e) {
    echo "Fatal error during testing: " . $e->getMessage() . "\n";
    echo "\nTroubleshooting:\n";
    echo "1. Check your internet connection\n";
    echo "2. Verify the API key is correct\n";
    echo "3. Ensure the RepairDesk API is accessible\n";
    echo "4. Check if you have the necessary permissions\n";
}
?>
