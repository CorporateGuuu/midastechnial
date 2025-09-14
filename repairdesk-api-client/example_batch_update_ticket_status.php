<?php
/**
 * Example usage of RepairDesk API Client - Batch Update Ticket Statuses
 *
 * This demonstrates how to use the updateTicketStatuses method for batch operations
 */

require_once 'RepairDeskAPIClient.php';

try {
    // Initialize the API client
    $apiKey = 'your_repairdesk_api_key_here'; // Replace with your actual API key
    $client = new RepairDeskAPIClient($apiKey);

    // Test connection
    echo "Testing API connection...\n";
    try {
        $client->testConnection();
        echo "✓ Connection successful!\n";
    } catch (Exception $e) {
        echo "✗ Connection failed: " . $e->getMessage() . "\n";
        exit(1);
    }

    // Example: Batch update ticket statuses
    echo "\nExample: Batch updating ticket statuses\n";
    echo "========================================\n";

    // Prepare batch data - array of updates
    $batchData = [
        [
            'ticketId' => 123,
            'statusData' => [
                'status' => 'In Progress'
            ]
        ],
        [
            'ticketId' => 124,
            'statusData' => [
                'status' => 'Completed',
                'lineItemId' => 456
            ]
        ],
        [
            'ticketId' => 125,
            'statusData' => [
                'status' => 'Waiting for Parts'
            ]
        ]
    ];

    // Validate batch data before processing
    echo "Validating batch data...\n";
    $validBatchData = [];
    foreach ($batchData as $index => $update) {
        try {
            if (!isset($update['ticketId']) || !is_numeric($update['ticketId']) || $update['ticketId'] <= 0) {
                throw new Exception("Invalid ticket ID at index $index");
            }
            if (!isset($update['statusData']) || !isset($update['statusData']['status']) || empty($update['statusData']['status'])) {
                throw new Exception("Invalid status data at index $index");
            }
            $validBatchData[] = $update;
            echo "✓ Update $index validated (Ticket ID: {$update['ticketId']})\n";
        } catch (Exception $e) {
            echo "✗ Skipping update $index: " . $e->getMessage() . "\n";
        }
    }

    if (empty($validBatchData)) {
        throw new Exception("No valid updates found in batch data.");
    }

    // Call the batch update method
    $results = $client->updateTicketStatuses($validBatchData);

    // Display the results
    echo "\nBatch Update Results:\n";
    echo "=====================\n";

    $successCount = 0;
    $failureCount = 0;

    foreach ($results as $result) {
        if ($result['success']) {
            $successCount++;
            echo "✓ Update {$result['index']} (Ticket ID: {$result['ticketId']}): SUCCESS\n";
            // Optionally show partial response data
            if (isset($result['data']['id'])) {
                echo "  Updated ticket ID: {$result['data']['id']}\n";
            }
        } else {
            $failureCount++;
            echo "✗ Update {$result['index']} (Ticket ID: " . ($result['ticketId'] ?? 'N/A') . "): FAILED\n";
            echo "  Error: {$result['error']}\n";
        }
    }

    echo "\nBatch Summary:\n";
    echo "- Total updates attempted: " . count($results) . "\n";
    echo "- Successful updates: $successCount\n";
    echo "- Failed updates: $failureCount\n";
    echo "- Success rate: " . round(($successCount / count($results)) * 100, 1) . "%\n";

} catch (Exception $e) {
    echo "Error in batch update: " . $e->getMessage() . "\n";
    echo "\nTroubleshooting for Batch Updates:\n";
    echo "1. Ensure all ticket IDs are valid and exist in your RepairDesk system\n";
    echo "2. Verify that status values are correct (use getStatuses() to check)\n";
    echo "3. Check your API key permissions for ticket updates\n";
    echo "4. Consider processing updates individually if batch fails\n";
    echo "5. Implement retry logic for transient network errors\n";
}

echo "\nBatch Ticket Status Update Example Completed!\n";
?>
