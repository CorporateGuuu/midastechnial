<?php
/**
 * Example usage of RepairDesk API Client - Update Ticket Status
 * 
 * This demonstrates how to use the updateTicketStatus method
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
    
    // Example: Update ticket status
    echo "\nExample: Updating ticket status\n";
    echo "===============================\n";
    try {
        // Replace with a valid ticket ID
        $ticketId = 123;

        // Define the status update data
        $statusData = [
            'status' => 'In Progress', // Replace with the desired status
            'lineItemId' => 456 // Optional: specify a specific line item
        ];

        // Validate inputs before making the API call
        if (!is_numeric($ticketId) || $ticketId <= 0) {
            throw new Exception("Invalid ticket ID provided. Please use a positive integer.");
        }

        if (empty($statusData['status'])) {
            throw new Exception("Status cannot be empty. Please provide a valid status.");
        }

        // Call the updateTicketStatus method
        $response = $client->updateTicketStatus($ticketId, $statusData);

        // Display the response
        echo "Ticket status updated successfully:\n";
        echo json_encode($response, JSON_PRETTY_PRINT) . "\n";

        // Additional success information
        echo "\nUpdate Summary:\n";
        echo "- Ticket ID: $ticketId\n";
        echo "- New Status: " . $statusData['status'] . "\n";
        if (isset($statusData['lineItemId'])) {
            echo "- Line Item ID: " . $statusData['lineItemId'] . "\n";
        }

    } catch (Exception $e) {
        echo "Error updating ticket status: " . $e->getMessage() . "\n";

        // Provide specific troubleshooting based on error type
        $errorMessage = $e->getMessage();
        if (strpos($errorMessage, 'Invalid ticket ID') !== false) {
            echo "Troubleshooting: Ensure the ticket ID is a positive integer and exists in your RepairDesk system.\n";
        } elseif (strpos($errorMessage, 'Status') !== false) {
            echo "Troubleshooting: Check that the status value is valid. Use getStatuses() to see available statuses.\n";
        } elseif (strpos($errorMessage, 'API Error (401)') !== false) {
            echo "Troubleshooting: Verify your API key is correct and has the necessary permissions.\n";
        } elseif (strpos($errorMessage, 'API Error (404)') !== false) {
            echo "Troubleshooting: The ticket ID may not exist. Verify the ticket exists in your system.\n";
        } elseif (strpos($errorMessage, 'cURL Error') !== false) {
            echo "Troubleshooting: Check your internet connection and ensure cURL is properly configured.\n";
        }
    }
    
    echo "\nTicket Status Update Example Completed!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "\nTroubleshooting:\n";
    echo "1. Make sure you have a valid RepairDesk API key\n";
    echo "2. Check your internet connection\n";
    echo "3. Verify the API endpoint is correct\n";
    echo "4. Ensure cURL extension is enabled in PHP\n";
}
?>
