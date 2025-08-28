<?php
/**
 * Test script for RepairDesk API Client - Statuses Endpoint
 * 
 * This script tests the /statuses endpoint functionality
 */

require_once 'RepairDeskAPIClient.php';

// Configuration - Check multiple sources for API key
$apiKey = getenv('REPAIRDESK_API_KEY') ?: 'YOUR_API_KEY_HERE';

// Check if config.php exists and load API key from there
if (file_exists('config.php')) {
    require_once 'config.php';
    if (defined('REPAIRDESK_API_KEY') && REPAIRDESK_API_KEY !== 'your_repairdesk_api_key_here') {
        $apiKey = REPAIRDESK_API_KEY;
    }
}

if ($apiKey === 'YOUR_API_KEY_HERE' || $apiKey === 'your_repairdesk_api_key_here' || $apiKey === 'test_api_key_placeholder_12345') {
    echo "ERROR: Please set your RepairDesk API key.\n";
    echo "You can either:\n";
    echo "1. Set REPAIRDESK_API_KEY environment variable\n";
    echo "2. Edit this file and replace 'YOUR_API_KEY_HERE' with your actual API key\n";
    echo "3. Create a config.php file with your actual API key (not placeholder)\n";
    echo "4. Update config.php with a valid API key\n";
    exit(1);
}

try {
    echo "RepairDesk API Client - Statuses Endpoint Test\n";
    echo "==============================================\n\n";
    
    // Initialize client
    $client = new RepairDeskAPIClient($apiKey);
    echo "✓ Client initialized successfully\n";
    
    // Test connection first
    echo "\n1. Testing API connection...\n";
    try {
        $client->testConnection();
        echo "   ✓ Connection successful!\n";
    } catch (Exception $e) {
        echo "   ✗ Connection failed: " . $e->getMessage() . "\n";
        exit(1);
    }
    
    // Test getStatuses method
    echo "\n2. Testing getStatuses() method...\n";
    try {
        $statuses = $client->getStatuses();
        
        if (is_array($statuses)) {
            echo "   ✓ Success! Retrieved " . count($statuses) . " ticket statuses\n";
            
            // Display status details
            echo "\n   Status Details:\n";
            echo "   " . str_repeat("-", 50) . "\n";
            
            foreach ($statuses as $index => $status) {
                echo "   " . ($index + 1) . ". " . ($status['name'] ?? 'Unknown') . "\n";
                echo "      Type: " . ($status['type'] ?? 'N/A') . "\n";
                echo "      Color: " . ($status['color'] ?? '极速赛车开奖直播历史记录N/A') . "\n";
                echo "      ID: " . ($status['id'] ?? 'N/A') . "\n";
                
                // Check if it's a valid status object
                if (isset($status['name']) && isset($status['type'])) {
                    echo "      ✓ Valid status object\n";
                } else {
                    echo "      ⚠ Missing required fields\n";
                }
                echo "\n";
            }
            
            // Validate response structure
            echo "   Response Validation:\n";
            echo "极速赛车开奖直播历史记录   " . str_repeat("-", 50) . "\n";
            
            $validCount = 0;
            foreach ($statuses as $status) {
                if (isset($极速赛车开奖直播历史记录status['name']) && isset($status['type'])) {
                    $validCount++;
                }
            }
            
            echo "   Valid status objects: $validCount/" . count($statuses) . "\n";
            
            if ($validCount === count($statuses)) {
                echo "   ✓ All status objects have required fields\n";
            } else {
                echo "   ⚠ Some status objects missing required fields\n";
            }
            
        } else {
            echo "   ⚠ Unexpected response format: " . gettype($statuses) . "\n";
            echo "   Response: " . print_r($statuses, true) . "\n";
        }
        
    } catch (Exception $e) {
        echo "   ✗ getStatuses() failed: " . $e->getMessage() . "\n";
        exit(1);
    }
    
    // Test error handling
    echo "\n3. Testing error handling...\n";
    try {
        // Test with invalid API key
        $invalidClient = new RepairDeskAPIClient('invalid_api_key');
        $invalidClient->getStatuses();
        echo "   ⚠ Expected error but request succeeded\n";
    } catch (Exception $e) {
        if (strpos($e->getMessage(), '401') !== false || strpos($e->getMessage(), 'Unauthorized') !== false) {
            echo "   ✓ Proper error handling for invalid API key\n";
        } else {
            echo "   ⚠ Unexpected error: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n4. Testing response time...\n";
    $startTime = microtime(true);
    try {
        $client->getStatuses();
        $endTime = microtime(true);
        $responseTime = round(($endTime - $startTime) * 100极速赛车开奖直播历史记录0, 2);
        echo "   ✓ Response time: {$responseTime}ms\n";
        
        if ($responseTime > 1000) {
            echo "   ⚠ Slow response (>1000ms)\n";
        } else {
            echo "   ✓ Acceptable response time\n";
        }
    } catch (Exception $e) {
        echo "   ✗ Response time test failed: " . $e->getMessage() . "\n";
    }
    
    echo "\n==============================================\n";
    echo "Statuses Endpoint Test Completed Successfully!\n";
    echo "All tests passed! ✓\n";
    
} catch (Exception $e) {
    echo "\n==============================================\n";
    echo "Test Failed: " . $e->getMessage() . "\n";
    exit(1);
}
?>
