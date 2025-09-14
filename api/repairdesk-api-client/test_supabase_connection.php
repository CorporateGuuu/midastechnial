<?php
/**
 * Test Supabase connection using direct REST API calls
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

try {
    echo "Testing Supabase connection using REST API...\n";
    echo "URL: " . SUPABASE_URL . "\n";
    echo "Key: " . substr(SUPABASE_KEY, 0, 20) . "...\n\n";

    $client = new Client([
        'base_uri' => SUPABASE_URL . '/rest/v1/',
        'headers' => [
            'apikey' => SUPABASE_KEY,
            'Authorization' => 'Bearer ' . SUPABASE_KEY,
            'Content-Type' => 'application/json',
        ],
    ]);

    // Test 1: Try to get a count from parts table
    echo "Test 1: Checking parts table...\n";
    try {
        $response = $client->get('parts', [
            'query' => ['select' => 'count'],
            'http_errors' => false, // Don't throw on 4xx/5xx
        ]);

        $statusCode = $response->getStatusCode();
        $body = $response->getBody()->getContents();

        echo "Status: $statusCode\n";
        echo "Response: " . substr($body, 0, 200) . "\n";

        if ($statusCode >= 200 && $statusCode < 300) {
            echo "✓ Successfully connected to Supabase!\n";
        } elseif ($statusCode === 404) {
            echo "⚠ Table 'parts' not found (this may be expected)\n";
        } else {
            echo "⚠ Unexpected response\n";
        }
    } catch (RequestException $e) {
        echo "✗ Request failed: " . $e->getMessage() . "\n";
    }

    // Test 2: Try to get database health
    echo "\nTest 2: Checking database health...\n";
    try {
        $response = $client->get('', [
            'http_errors' => false,
        ]);

        $statusCode = $response->getStatusCode();
        echo "Health check status: $statusCode\n";

        if ($statusCode >= 200 && $statusCode < 300) {
            echo "✓ Database connection healthy\n";
        } else {
            echo "⚠ Health check returned status $statusCode\n";
        }
    } catch (RequestException $e) {
        echo "✗ Health check failed: " . $e->getMessage() . "\n";
    }

    // Test 3: Try to list tables (if RPC is available)
    echo "\nTest 3: Attempting to list available tables...\n";
    try {
        $response = $client->post('rpc/get_table_list', [
            'json' => [],
            'http_errors' => false,
        ]);

        $statusCode = $response->getStatusCode();
        $body = $response->getBody()->getContents();

        echo "RPC status: $statusCode\n";
        if ($statusCode >= 200 && $statusCode < 300) {
            echo "✓ RPC functions available\n";
            echo "Tables: " . substr($body, 0, 200) . "\n";
        } else {
            echo "⚠ RPC not available or no get_table_list function\n";
        }
    } catch (RequestException $e) {
        echo "⚠ RPC test failed (may not be implemented): " . $e->getMessage() . "\n";
    }

    echo "\n==============================================\n";
    echo "Supabase connection test completed!\n";
    echo "✓ Using direct REST API calls with Guzzle\n";
    echo "✓ Bypassed buggy Supabase PHP library\n";

} catch (Exception $e) {
    echo "Connection test failed: " . $e->getMessage() . "\n";
}
?>
