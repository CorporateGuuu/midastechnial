<?php
/**
 * API Endpoint to fetch products from Supabase and RepairDesk
 * Returns combined product data for the frontend
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
    'data' => [],
    'message' => '',
    'source' => 'combined'
];

try {
    // Get query parameters
    $category = $_GET['category'] ?? null;
    $search = $_GET['search'] ?? null;
    $limit = (int)($_GET['limit'] ?? 50);
    $offset = (int)($_GET['offset'] ?? 0);

    $products = [];

    // Try to fetch from Supabase first
    if (!empty(SUPABASE_URL) && !empty(SUPABASE_KEY)) {
        $supabaseProducts = fetchFromSupabase($category, $search, $limit, $offset);
        if (!empty($supabaseProducts)) {
            $products = array_merge($products, $supabaseProducts);
            $response['source'] = 'supabase';
        }
    }

    // If no Supabase data or we want to supplement, fetch from RepairDesk
    if (empty($products) || count($products) < $limit) {
        $repairdeskProducts = fetchFromRepairDesk($category, $search, $limit - count($products), $offset);
        if (!empty($repairdeskProducts)) {
            $products = array_merge($products, $repairdeskProducts);
            $response['source'] = empty($products) ? 'repairdesk' : 'combined';
        }
    }

    // Format products for frontend
    $formattedProducts = formatProductsForFrontend($products);

    $response['success'] = true;
    $response['data'] = $formattedProducts;
    $response['count'] = count($formattedProducts);

} catch (Exception $e) {
    $response['message'] = 'Error fetching products: ' . $e->getMessage();
    error_log('API Error: ' . $e->getMessage());
}

echo json_encode($response);

/**
 * Fetch products from Supabase
 */
function fetchFromSupabase($category = null, $search = null, $limit = 50, $offset = 0) {
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
            'is_active' => 'eq.true',
            'order' => 'created_at.desc',
            'limit' => $limit,
            'offset' => $offset
        ];

        if ($category) {
            $params['category'] = 'ilike.*' . urlencode($category) . '*';
        }

        if ($search) {
            $params['or'] = '(name.ilike.*' . urlencode($search) . '*,description.ilike.*' . urlencode($search) . '*,sku.ilike.*' . urlencode($search) . '*)';
        }

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
            return is_array($data) ? $data : [];
        } else {
            error_log('Supabase API error: HTTP ' . $httpCode . ' - ' . $response);
            return [];
        }

    } catch (Exception $e) {
        error_log('Supabase fetch error: ' . $e->getMessage());
        return [];
    }
}

/**
 * Fetch products from RepairDesk API
 */
function fetchFromRepairDesk($category = null, $search = null, $limit = 50, $offset = 0) {
    try {
        if (empty(REPAIRDESK_API_KEY)) {
            return [];
        }

        $url = REPAIRDESK_BASE_URL . '/inventory';
        $headers = [
            'Authorization: Bearer ' . REPAIRDESK_API_KEY,
            'Content-Type: application/json'
        ];

        // Build query parameters
        $params = [
            'limit' => $limit,
            'offset' => $offset
        ];

        if ($search) {
            $params['search'] = $search;
        }

        $queryString = http_build_query($params);
        $url .= '?' . $queryString;

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

            // Filter by category if specified
            if ($category && isset($data['data']) && is_array($data['data'])) {
                $data['data'] = array_filter($data['data'], function($product) use ($category) {
                    return stripos($product['category'] ?? '', $category) !== false;
                });
            }

            return isset($data['data']) && is_array($data['data']) ? $data['data'] : [];
        } else {
            error_log('RepairDesk API error: HTTP ' . $httpCode . ' - ' . $response);
            return [];
        }

    } catch (Exception $e) {
        error_log('RepairDesk fetch error: ' . $e->getMessage());
        return [];
    }
}

/**
 * Format products for frontend consumption
 */
function formatProductsForFrontend($products) {
    $formatted = [];

    foreach ($products as $product) {
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
            'is_active' => $product['is_active'] ?? $product['active'] ?? true
        ];

        // Only include active products
        if ($formattedProduct['is_active']) {
            $formatted[] = $formattedProduct;
        }
    }

    return $formatted;
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
        $images = ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop'];
    }

    return $images;
}
?>
