<?php
/**
 * API Endpoint to fetch a single product by ID from Supabase and RepairDesk
 * Returns detailed product data for the frontend
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include configuration
require_once __DIR__ . '/repairdesk-api-client/config.php';

// Initialize response
$response = [
    'success' => false,
    'data' => null,
    'message' => '',
    'source' => ''
];

try {
    // Get product ID from query parameters
    $productId = $_GET['id'] ?? null;

    if (!$productId) {
        throw new Exception('Product ID is required');
    }

    $product = null;

    // Try to fetch from Supabase first
    if (!empty(SUPABASE_URL) && !empty(SUPABASE_KEY)) {
        $product = fetchProductFromSupabase($productId);
        if ($product) {
            $response['source'] = 'supabase';
        }
    }

    // If not found in Supabase, try RepairDesk
    if (!$product) {
        $product = fetchProductFromRepairDesk($productId);
        if ($product) {
            $response['source'] = 'repairdesk';
        }
    }

    if (!$product) {
        throw new Exception('Product not found');
    }

    // Format product for frontend
    $formattedProduct = formatProductForFrontend($product);

    $response['success'] = true;
    $response['data'] = $formattedProduct;

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    error_log('Product API Error: ' . $e->getMessage());
}

echo json_encode($response);

/**
 * Fetch a single product from Supabase
 */
function fetchProductFromSupabase($productId) {
    try {
        $supabaseUrl = SUPABASE_URL . '/rest/v1/parts';
        $headers = [
            'apikey: ' . SUPABASE_KEY,
            'Authorization: Bearer ' . SUPABASE_KEY,
            'Content-Type: application/json'
        ];

        // Build query parameters
        $params = [
            'select' => '*',
            'id' => 'eq.' . urlencode($productId),
            'is_active' => 'eq.true'
        ];

        $queryString = http_build_query($params);
        $url = $supabaseUrl . '?' . $queryString;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if (curl_errno($ch)) {
            throw new Exception('Supabase cURL error: ' . curl_error($ch));
        }

        curl_close($ch);

        if ($httpCode === 200) {
            $data = json_decode($response, true);
            return is_array($data) && count($data) > 0 ? $data[0] : null;
        } else {
            error_log('Supabase API error: HTTP ' . $httpCode . ' - ' . $response);
            return null;
        }

    } catch (Exception $e) {
        error_log('Supabase fetch error: ' . $e->getMessage());
        return null;
    }
}

/**
 * Fetch a single product from RepairDesk API
 */
function fetchProductFromRepairDesk($productId) {
    try {
        if (empty(REPAIRDESK_API_KEY)) {
            return null;
        }

        $url = REPAIRDESK_BASE_URL . '/inventory/' . urlencode($productId);
        $headers = [
            'Authorization: Bearer ' . REPAIRDESK_API_KEY,
            'Content-Type: application/json'
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, REPAIRDESK_SSL_VERIFY);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if (curl_errno($ch)) {
            throw new Exception('RepairDesk cURL error: ' . curl_error($ch));
        }

        curl_close($ch);

        if ($httpCode === 200) {
            $data = json_decode($response, true);
            return isset($data['data']) ? $data['data'] : $data;
        } else {
            error_log('RepairDesk API error: HTTP ' . $httpCode . ' - ' . $response);
            return null;
        }

    } catch (Exception $e) {
        error_log('RepairDesk fetch error: ' . $e->getMessage());
        return null;
    }
}

/**
 * Format a single product for frontend consumption
 */
function formatProductForFrontend($product) {
    // Handle both Supabase and RepairDesk data formats
    $formattedProduct = [
        'id' => $product['id'] ?? $product['inventory_id'] ?? null,
        'name' => $product['name'] ?? $product['product_name'] ?? '',
        'description' => $product['description'] ?? $product['product_description'] ?? '',
        'price' => (float)($product['price'] ?? $product['selling_price'] ?? 0),
        'category' => $product['category'] ?? $product['category_name'] ?? '',
        'stock_quantity' => (int)($product['stock_quantity'] ?? $product['quantity'] ?? 0),
        'sku' => $product['sku'] ?? $product['product_sku'] ?? '',
        'manufacturer' => $product['manufacturer'] ?? $product['brand'] ?? '',
        'model' => $product['model'] ?? '',
        'compatibility' => is_array($product['compatibility'] ?? null) ? $product['compatibility'] : [],
        'warranty_period' => (int)($product['warranty_period'] ?? 12),
        'weight_grams' => (int)($product['weight_grams'] ?? 0),
        'dimensions_cm' => $product['dimensions_cm'] ?? '',
        'rating' => (float)($product['rating'] ?? 4.5),
        'reviews' => (int)($product['reviews'] ?? 0),
        'images' => formatProductImages($product),
        'features' => is_array($product['features'] ?? null) ? $product['features'] : [],
        'tags' => is_array($product['tags'] ?? null) ? $product['tags'] : [],
        'is_active' => $product['is_active'] ?? $product['active'] ?? true,
        'created_at' => $product['created_at'] ?? null,
        'updated_at' => $product['updated_at'] ?? null
    ];

    return $formattedProduct;
}

/**
 * Format product images
 */
function formatProductImages($product) {
    $images = [];

    // Handle Supabase format
    if (isset($product['images']) && is_array($product['images'])) {
        $images = $product['images'];
    }

    // Handle RepairDesk format
    if (isset($product['images']) && is_string($product['images'])) {
        $images = json_decode($product['images'], true) ?? [];
    }

    // Handle single image
    if (isset($product['image']) && is_string($product['image'])) {
        $images = [$product['image']];
    }

    // Ensure we have at least one image
    if (empty($images)) {
        $images = ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop'];
    }

    return $images;
}
?>
