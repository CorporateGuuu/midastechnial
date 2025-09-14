<?php
/**
 * Example usage of RepairDesk API Client - Update Ticket Status with Validation
 * 
 * This demonstrates how to use the updateTicketStatus method with proper validation
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
    
    // Example: Update ticket status with validation
    echo "\nExample: Updating ticket status with validation\n";
    echo "===============================================\n";
    try {
        // Replace with a valid ticket ID
        $ticketId = 123;
        
        // Define the status update data
        $statusData = [
            'status' => 'In Progress', // Replace with the desired status
            'lineItemId' => 456 // Optional: specify a specific line item
        ];
        
        // Validate the ticket ID
        if (!is_numeric($ticketId) || $ticketId <= 0) {
            throw new Exception("Invalid ticket ID. Ticket ID must be a positive integer.");
        }

        // Validate the status data
        if (!isset($statusData['status']) || empty(trim($statusData['status']))) {
            throw new Exception("Status is required and cannot be empty.");
        }

        // Validate status format (basic check for common status values)
        $validStatuses = ['New', 'In Progress', 'Waiting for Parts', 'Ready for Pickup', 'Completed', 'Cancelled'];
        if (!in_array($statusData['status'], $validStatuses)) {
            echo "Warning: Status '{$statusData['status']}' is not in the list of common statuses.\n";
            echo "Available statuses: " . implode(', ', $validStatuses) . "\n";
            echo "You can use getStatuses() to get the exact list from your RepairDesk instance.\n";
        }

        // Validate the line item ID if provided
        if (isset($statusData['lineItemId'])) {
            if (!is_numeric($statusData['lineItemId']) || $statusData['lineItemId'] < 0) {
                throw new Exception("Invalid line item ID. Line item ID must be a non-negative integer.");
            }
            if ($statusData['lineItemId'] == 0) {
                echo "Note: lineItemId 0 typically refers to the main ticket line item.\n";
            }
        }

        // Additional validation for status transitions
        echo "Validating status transition...\n";
        try {
            // You could add logic here to check if the status transition is valid
            // For now, we'll just log the attempt
            echo "Status transition from [current] to '{$statusData['status']}' is allowed.\n";
        } catch (Exception $e) {
            echo "Warning: Status transition validation failed: " . $e->getMessage() . "\n";
        }
        
        // Call the updateTicketStatus method
        $response = $client->updateTicketStatus($ticketId, $statusData);
        
        // Display the response
        echo "Ticket status updated successfully:\n";
        echo json_encode($response, JSON_PRETTY_PRINT) . "\n";
    } catch (Exception $e) {
        echo "Error updating ticket status: " . $e->getMessage() . "\n";
    }
    
    echo "\nTicket Status Update with Validation Example Completed!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "\nTroubleshooting:\n";
    echo "1. Make sure you have a valid RepairDesk API key\n";
    echo "2. Check your internet connection\n";
    echo "3. Verify the API endpoint is correct\n";
    echo "4. Ensure cURL extension is enabled in PHP\n";
}
?>
