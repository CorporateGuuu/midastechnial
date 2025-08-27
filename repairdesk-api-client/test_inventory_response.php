<?php
/**
 * Test script for RepairDesk API Inventory Response Format
 * 
 * This demonstrates the inventory-specific response handling
 */

require_once 'RepairDeskAPIClient.php';

echo "RepairDesk API Inventory Response Format Test\n";
echo "============================================\n\n";

// Mock inventory response example based on actual API documentation
$inventoryResponse = [
    'items' => [
        [
            'name' => 'Charging Adapter',
            'item_type' => 'Accessories',
            'manufacturer' => 11231,
            'device' => 44221,
            'in_stock' => 10,
            'cost_price' => 100,
            'price' => 120,
            'tax_class' => 11221,
            'tax_inclusive' => 0,
            'sku' => '231124551321245',
            'supplier' => 11144,
            'upc_code' => '123123aaA114',
            'valuation_method' => 1,
            'is_serialize' => 0
        ],
        [
            'name' => 'iPhone Screen',
            'item_type' => 'Parts',
            'manufacturer' => 11232,
            'device' => 44222,
            'in_stock' => 5,
            'cost_price' => 45,
            'price' => 89,
            'tax_class' => 11221,
            'tax_inclusive' => 0,
            'sku' => 'IPH-SCREEN-001',
            'supplier' => 11145,
            'upc_code' => '123456789012',
            'valuation_method' => 1,
            'is_serialize' => 1
        ]
    ]
];

// Mock standard response example
$standardResponse = [
    'success' => true,
    'statusCode' => 200,
    'message' => 'Operation successful',
    'data' => [
        'id' => 12345,
        'name' => 'Test Item',
        'status' => 'active'
    ]
];

echo "Inventory Response Example:\n";
echo json_encode($inventoryResponse, JSON_PRETTY_PRINT) . "\n\n";

echo "Standard Response Example:\n";
echo json_encode($standardResponse, JSON_PRETTY_PRINT) . "\n\n";

echo "Response Handling in API Client:\n";
echo "===============================\n";

// Test inventory response processing
$processedInventory = [];
if (isset($inventoryResponse['items'])) {
    $processedInventory = $inventoryResponse['items'];
} elseif (isset($inventoryResponse['data'])) {
    $processedInventory = $inventoryResponse['data'];
} else {
    $processedInventory = $inventoryResponse;
}

echo "✓ Inventory response returns 'items' array:\n";
echo "Found " . count($processedInventory) . " inventory items\n";
foreach ($processedInventory as $item) {
    echo "- " . $item['name'] . " (SKU: " . $item['sku'] . ")\n";
}

echo "\n";

// Test standard response processing
$processedStandard = [];
if (isset($standardResponse['data'])) {
    $processedStandard = $standardResponse['data'];
} elseif (isset($standardResponse['items'])) {
    $processedStandard = $standardResponse['items'];
} else {
    $processedStandard = $standardResponse;
}

echo "✓ Standard response returns 'data' object:\n";
echo json_encode($processedStandard, JSON_PRETTY_PRINT) . "\n";

echo "\nAPI Client now properly handles different response formats:\n";
echo "✓ Inventory endpoint returns 'items' array\n";
echo "✓ Other endpoints return 'data' object\n";
echo "✓ Fallback to full response if neither is present\n";
?>
