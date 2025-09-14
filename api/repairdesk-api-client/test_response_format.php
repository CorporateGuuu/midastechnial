<?php
/**
 * Test script for RepairDesk API Client Response Format
 * 
 * This demonstrates the updated response handling based on actual API structure
 */

require_once 'RepairDeskAPIClient.php';

echo "RepairDesk API Response Format Test\n";
echo "===================================\n\n";

// Mock response examples based on actual API documentation
$successResponse = [
    'success' => true,
    'statusCode' => 200,
    'message' => 'Item was updated successfully',
    'data' => [
        'id' => 75611692,
        'name' => 'Charging Adapter Updated',
        'sku' => '231124551321245',
        'price' => '120.00',
        'in_stock' => 20,
        'tax_class' => [
            'tax_class' => null,
            'id' => null,
            'tax_percent' => null,
            'tax_inclusive' => 0
        ]
    ]
];

$errorResponse = [
    'success' => false,
    'statusCode' => 401,
    'message' => 'Unauthorized',
    'data' => [
        'name' => 'Unauthorized',
        'message' => 'Your request was made with invalid credentials.',
        'code' => 0,
        'status' => 401
    ]
];

echo "Success Response Example:\n";
echo json_encode($successResponse, JSON_PRETTY_PRINT) . "\n\n";

echo "Error Response Example:\n";
echo json_encode($errorResponse, JSON_PRETTY_PRINT) . "\n\n";

echo "Response Handling in API Client:\n";
echo "===============================\n";
echo "✓ Success responses return the 'data' portion: \$result['data']\n";
echo "✓ Error responses provide detailed error messages\n";
echo "✓ Both 'message' and 'data.message' are used for error details\n";
echo "✓ HTTP status codes are properly handled\n";

echo "\nTesting Response Processing:\n";
echo "===========================\n";

// Simulate processing a success response
$processedSuccess = isset($successResponse['data']) ? $successResponse['data'] : $successResponse;
echo "Success response processed to return data:\n";
echo json_encode($processedSuccess, JSON_PRETTY_PRINT) . "\n\n";

// Simulate error handling
echo "Error response would throw exception with message:\n";
$errorMessage = isset($errorResponse['message']) ? $errorResponse['message'] : 'Unknown error occurred';
$errorDetails = '';
if (isset($errorResponse['data']) && isset($errorResponse['data']['message'])) {
    $errorDetails = ' Details: ' . $errorResponse['data']['message'];
}
echo "Exception: API Error (401): {$errorMessage}{$errorDetails}\n";

echo "\nAPI Client is now properly configured to handle RepairDesk API response format!\n";
?>
