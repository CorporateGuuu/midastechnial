<?php
/**
 * Direct API test to see raw responses
 */

$apiKey = 'tnP2abr-GkQp-JT8z-Ptpn-UTAkjuB44';

// Try different base URLs
$baseUrls = [
    'https://api.repairdesk.co/api/v1',
    'https://api.repairdesk.co/api/web/v1',
    'https://api.repairdesk.co/v1',
    'https://repairdesk.co/api/v1',
    'https://app.repairdesk.co/api/v1'
];

foreach ($baseUrls as $baseUrl) {
    echo "\n=== Testing base URL: $baseUrl ===\n";

    // Test devices endpoint
    $url = $baseUrl . '/devices?api_key=' . urlencode($apiKey);

    echo "Testing URL: $url\n";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Shorter timeout

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

    echo "HTTP Code: $httpCode\n";
    if ($httpCode != 404) {
        echo "Content-Type: $contentType\n";
        echo "Response:\n" . substr($response, 0, 500) . "\n"; // First 500 chars
    }

    if (curl_error($ch)) {
        echo "cURL Error: " . curl_error($ch) . "\n";
    }

    curl_close($ch);
}
?>
