<?php
/**
 * RepairDesk API Client
 * 
 * A standalone PHP client for interacting with the RepairDesk Public API v1 (OAS 3.0)
 * Provides comprehensive endpoints for managing devices, inventory, customers, repair tasks, orders, and appointments.
 */

class RepairDeskAPI {
    /**
     * API Base URL
     * @var string
     */
    private $baseUrl;
    
    /**
     * API Key for authentication
     * @var string
     */
    private $apiKey;
    
    /**
     * HTTP Client (cURL)
     * @var CurlHandle
     */
    private $ch;

    /**
     * Rate limiting storage
     * @var array
     */
    private $rateLimit = [];
    
    /**
     * Constructor
     *
     * @param string $apiKey Your RepairDesk API key
     * @param string $baseUrl API base URL (optional)
     */
    public function __construct($apiKey, $baseUrl = null) {
        // Load configuration if available
        if (file_exists(__DIR__ . '/config.php')) {
            require_once __DIR__ . '/config.php';
        }

        $this->apiKey = $apiKey ?: (defined('REPAIRDESK_API_KEY') ? REPAIRDESK_API_KEY : '');
        $this->baseUrl = $baseUrl ?: (defined('REPAIRDESK_BASE_URL') ? REPAIRDESK_BASE_URL : 'https://api.repairdesk.co/api/web/v1');

        if (empty($this->apiKey)) {
            throw new Exception('API key is required. Please provide an API key or create a config.php file.');
        }

        $this->initializeClient();
    }
    
    /**
     * Initialize cURL client
     */
    private function initializeClient() {
        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $this->apiKey
        ]);
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($this->ch, CURLOPT_TIMEOUT, 30);
    }

    /**
     * Validate input data
     *
     * @param array $data Data to validate
     * @param array $rules Validation rules
     * @throws Exception
     */
    private function validateInput($data, $rules) {
        foreach ($rules as $field => $rule) {
            if (isset($rule['required']) && $rule['required'] && !isset($data[$field])) {
                throw new Exception("Required field '$field' is missing");
            }

            if (isset($data[$field])) {
                $value = $data[$field];

                // Type validation
                if (isset($rule['type'])) {
                    switch ($rule['type']) {
                        case 'string':
                            if (!is_string($value)) {
                                throw new Exception("Field '$field' must be a string");
                            }
                            break;
                        case 'int':
                            if (!is_int($value) && !is_numeric($value)) {
                                throw new Exception("Field '$field' must be an integer");
                            }
                            break;
                        case 'float':
                            if (!is_float($value) && !is_numeric($value)) {
                                throw new Exception("Field '$field' must be a number");
                            }
                            break;
                        case 'array':
                            if (!is_array($value)) {
                                throw new Exception("Field '$field' must be an array");
                            }
                            break;
                    }
                }

                // Length validation for strings
                if (isset($rule['max_length']) && is_string($value)) {
                    if (strlen($value) > $rule['max_length']) {
                        throw new Exception("Field '$field' exceeds maximum length of {$rule['max_length']}");
                    }
                }

                // Range validation for numbers
                if (isset($rule['min']) && is_numeric($value)) {
                    if ($value < $rule['min']) {
                        throw new Exception("Field '$field' must be at least {$rule['min']}");
                    }
                }

                if (isset($rule['max']) && is_numeric($value)) {
                    if ($value > $rule['max']) {
                        throw new Exception("Field '$field' must be at most {$rule['max']}");
                    }
                }

                // Sanitize string inputs
                if (is_string($value)) {
                    $data[$field] = $this->sanitizeString($value);
                }
            }
        }
    }

    /**
     * Sanitize string input
     *
     * @param string $string String to sanitize
     * @return string Sanitized string
     */
    private function sanitizeString($string) {
        // Remove null bytes
        $string = str_replace("\0", "", $string);

        // Remove potential script tags
        $string = preg_replace('/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i', '', $string);

        // Trim whitespace
        return trim($string);
    }

    /**
     * Check rate limit
     *
     * @param string $endpoint API endpoint
     * @throws Exception
     */
    private function checkRateLimit($endpoint) {
        $now = time();
        $key = md5($endpoint);

        // Simple rate limiting: max 100 requests per minute per endpoint
        if (!isset($this->rateLimit[$key])) {
            $this->rateLimit[$key] = ['count' => 0, 'reset' => $now + 60];
        }

        if ($now > $this->rateLimit[$key]['reset']) {
            $this->rateLimit[$key] = ['count' => 0, 'reset' => $now + 60];
        }

        if ($this->rateLimit[$key]['count'] >= 100) {
            throw new Exception('Rate limit exceeded. Please try again later.');
        }

        $this->rateLimit[$key]['count']++;
    }
    
    /**
     * Make API request
     *
     * @param string $method HTTP method (GET, POST, PUT, DELETE)
     * @param string $endpoint API endpoint
     * @param array $data Request data
     * @param array $validationRules Validation rules for the data
     * @return array Response data
     * @throws Exception
     */
    private function request($method, $endpoint, $data = [], $validationRules = []) {
        // Check rate limit
        $this->checkRateLimit($endpoint);

        // Validate input data if rules are provided
        if (!empty($validationRules) && !empty($data)) {
            $this->validateInput($data, $validationRules);
        }

        // Build URL without exposing API key in query parameters
        $url = $this->baseUrl . $endpoint;

        // Add query parameters if provided (excluding API key for security)
        if (!empty($data) && $method === 'GET') {
            $url .= '?' . http_build_query($data);
        }

        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $method);

        // Reset POST data for non-POST requests
        if ($method !== 'POST' && $method !== 'PUT') {
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, null);
        } elseif (!empty($data)) {
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($this->ch);
        $httpCode = curl_getinfo($this->ch, CURLINFO_HTTP_CODE);

        if (curl_error($this->ch)) {
            throw new Exception('cURL Error: ' . curl_error($this->ch));
        }

        $result = json_decode($response, true);

        if ($httpCode >= 400) {
            // Handle RepairDesk API response format
            $errorMessage = isset($result['message']) ? $result['message'] : 'Unknown error occurred';
            $errorDetails = '';

            if (isset($result['data']) && isset($result['data']['message'])) {
                $errorDetails = ' Details: ' . $result['data']['message'];
            } elseif (isset($result['errors'])) {
                $errorDetails = ' Details: ' . json_encode($result['errors']);
            }

            throw new Exception("API Error ($httpCode): $errorMessage$errorDetails");
        }

        // Return data portion if available, otherwise return full response
        // Handle different response formats from different endpoints
        if (isset($result['data'])) {
            return $result['data'];
        } elseif (isset($result['items'])) {
            return $result['items']; // For inventory endpoint
        } else {
            return $result;
        }
    }
    
    /**
     * Get devices associated with tickets
     * 
     * @param array $params Query parameters
     * @return array Devices data
     */
    public function getDevices($params = []) {
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/devices' . $query);
    }
    
    /**
     * Get device by ID
     * 
     * @param int $deviceId Device ID
     * @return array Device data
     */
    public function getDevice($deviceId) {
        return $this->request('GET', "/devices/$deviceId");
    }
    
    /**
     * Add new inventory item
     * 
     * @param array $itemData Inventory item data
     * @return array Created item data
     */
    public function addInventoryItem($itemData) {
        // Ensure required fields are present based on API validation
        $requiredFields = ['name', 'item_type', 'manufacturer', 'device', 'in_stock', 
                          'cost_price', 'price', 'tax_class', 'sku'];
        
        foreach ($requiredFields as $field) {
            if (!isset($itemData[$field])) {
                throw new Exception("Required field '$field' is missing for inventory item");
            }
        }
        
        return $this->request('POST', '/inventory', $itemData);
    }
    
    /**
     * Update inventory item
     * 
     * @param int $itemId Inventory item ID
     * @param array $itemData Updated item data
     * @return array Updated item data
     */
    public function updateInventoryItem($itemId, $itemData) {
        return $this->request('PUT', "/inventory/$itemId", $itemData);
    }
    
    /**
     * Get inventory items
     * 
     * @param array $params Query parameters
     * @return array Inventory items
     */
    public function getInventory($params = []) {
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/inventory' . $query);
    }
    
    /**
     * Get customers
     * 
     * @param array $params Query parameters
     * @return array Customers data
     */
    public function getCustomers($params = []) {
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/customers' . $query);
    }
    
    /**
     * Get customer by ID
     * 
     * @param int $customerId Customer ID
     * @return array Customer data
     */
    public function getCustomer($customerId) {
        return $this->request('GET', "/customers/$customerId");
    }
    
    /**
     * Update customer information
     * 
     * @param int $customerId Customer ID
     * @param array $customerData Updated customer data
     * @return array Updated customer data
     */
    public function updateCustomer($customerId, $customerData) {
        return $this->request('PUT', "/customers/$customerId", $customerData);
    }
    
    /**
     * Create repair ticket
     * 
     * @param array $ticketData Repair ticket data
     * @return array Created ticket data
     */
    public function createRepairTicket($ticketData) {
        return $this->request('POST', '/repairs', $ticketData);
    }
    
    /**
     * Get repair tickets
     * 
     * @param array $params Query parameters
     * @return array Repair tickets
     */
    public function getRepairTickets($params = []) {
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/repairs' . $query);
    }
    
    /**
     * Update repair ticket
     * 
     * @param int $ticketId Repair ticket ID
     * @param array $ticketData Updated ticket data
     * @return array Updated ticket data
     */
    public function updateRepairTicket($ticketId, $ticketData) {
        return $this->request('PUT', "/repairs/$ticketId", $ticketData);
    }
    
    /**
     * Get orders
     * 
     * @param array $params Query parameters
     * @return array Orders data
     */
    public function getOrders($params = []) {
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/orders' . $query);
    }
    
    /**
     * Get order by ID
     * 
     * @param int $orderId Order ID
     * @return array Order data
     */
    public function getOrder($orderId) {
        return $this->request('GET', "/orders/$orderId");
    }
    
    /**
     * Create appointment
     * 
     * @param array $appointmentData Appointment data
     * @return array Created appointment data
     */
    public function createAppointment($appointmentData) {
        return $this->request('POST', '/appointments', $appointmentData);
    }
    
    /**
     * Get appointments
     * 
     * @param array $params Query parameters
     * @return array Appointments
     */
    public function getAppointments($params = []) {
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/appointments' . $query);
    }
    
    /**
     * Create lead from appointment
     * 
     * @param array $leadData Lead data
     * @return array Created lead data
     */
    public function createLead($leadData) {
        return $this->request('POST', '/leads', $leadData);
    }
    
    /**
     * Get ticket statuses
     * 
     * @return array List of ticket statuses with name, color, and type
     */
    public function getStatuses() {
        return $this->request('GET', '/statuses');
    }
    
    /**
     * Destructor - close cURL connection
     */
    public function __destruct() {
        if ($this->ch) {
            curl_close($this->ch);
        }
    }
}
?>
