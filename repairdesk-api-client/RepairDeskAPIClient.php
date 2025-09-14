<?php
/**
 * Enhanced RepairDesk API Client
 * 
 * A more robust PHP client for interacting with the RepairDesk Public API v1 (OAS 3.0)
 * Supports configuration file and better error handling.
 */

class RepairDeskAPIClient {
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
     * @var resource
     */
    private $ch; // cURL handle
    
    /**
     * Debug mode
     * @var bool
     */
    private $debug;
    
    /**
     * Constructor
     * 
     * @param string $apiKey Your RepairDesk API key
     * @param string $baseUrl API base URL (optional)
     * @param bool $debug Enable debug mode (optional)
     */
    public function __construct($apiKey = null, $baseUrl = null, $debug = false) {
        // Load configuration if available
        if (file_exists(__DIR__ . '/config.php')) {
            require_once __DIR__ . '/config.php';
        }
        
        $this->apiKey = $apiKey ?: (defined('REPAIRDESK_API_KEY') ? REPAIRDESK_API_KEY : '');
        $this->baseUrl = $baseUrl ?: (defined('REPAIRDESK_BASE_URL') ? REPAIRDESK_BASE_URL : 'https://api.repairdesk.co/api/v1');
        $this->debug = $debug ?: (defined('REPAIRDESK_DEBUG') ? REPAIRDESK_DEBUG : false);
        
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
            'Accept: application/json'
        ]);
        
        // Set SSL verification (default to true)
        $sslVerify = defined('REPAIRDESK_SSL_VERIFY') ? REPAIRDESK_SSL_VERIFY : true;
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, $sslVerify);
        
        // Set timeout (default to 30 seconds)
        $timeout = defined('REPAIRDESK_TIMEOUT') ? REPAIRDESK_TIMEOUT : 30;
        curl_setopt($this->ch, CURLOPT_TIMEOUT, $timeout);
        
        if ($this->debug) {
            curl_setopt($this->ch, CURLOPT_VERBOSE, true);
        }
    }
    
    /**
     * Make API request
     * 
     * @param string $method HTTP method (GET, POST, PUT, DELETE)
     * @param string $endpoint API endpoint
     * @param array $data Request data
     * @return array Response data
     * @throws Exception
     */
    private function request($method, $endpoint, $data = []) {
        // Add API key as query parameter
        $url = $this->baseUrl . $endpoint;
        $separator = strpos($url, '?') === false ? '?' : '&';
        $url .= $separator . 'api_key=' . urlencode($this->apiKey);
        
        if ($this->debug) {
            echo "Making $method request to: $url\n";
            if (!empty($data)) {
                echo "Request data: " . json_encode($data, JSON_PRETTY_PRINT) . "\n";
            }
        }
        
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $method);
        
        if (!empty($data)) {
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($this->ch);
        $httpCode = curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
        
        if ($this->debug) {
            echo "Response code: $httpCode\n";
            echo "Response: " . $response . "\n";
        }
        
        if (curl_error($this->ch)) {
            throw new Exception('cURL Error: ' . curl_error($this->ch));
        }
        
        $result = json_decode($response, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('JSON Parse Error: ' . json_last_error_msg());
        }
        
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
     * Get purchase orders with detailed filtering options
     * 
     * @param array $params Query parameters
     *   - page * (integer): Page number for pagination
     *   - pagesize * (integer): Number of records per page
     *   - id (integer): Purchase order ID
     *   - item_name (string): Product name
     *   - manufacturer (integer): Manufacturer ID
     *   - purchase_order_status (string): PO-Status
     *   - po_order_id (string): PO Order number
     *   - supplier (string): Supplier Name
     *   - sku (string): Item SKU
     *   - createdd_date (string): Exact date match [YYYY-MM-DD]
     *   - created_date (string): Cases: today, 7days, 14days, 30days or date starting from the given date YYYY-MM-DD
     * @return array Purchase order data with pagination
     */
    public function getPurchaseOrders($params = []) {
        // Validate required parameters
        if (!isset($params['page']) || !is_numeric($params['page'])) {
            throw new Exception("Required parameter 'page' is missing or invalid");
        }
        
        if (!isset($params['pagesize']) || !is_numeric($params['pagesize'])) {
            throw new Exception("Required parameter 'pagesize' is missing or invalid");
        }
        
        $query = !empty($params) ? '?' . http_build_query($params) : '';
        return $this->request('GET', '/purchase-orders' . $query);
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
     * Create ticket with comprehensive device and custom field data
     * 
     * @param array $ticketData Ticket data including devices, customFields, and summary
     * @return array Created ticket data with success status
     */
    public function createTicket($ticketData) {
        // Validate required fields in ticket data
        $requiredSections = ['devices', 'summary'];
        foreach ($requiredSections as $section) {
            if (!isset($ticketData[$section])) {
                throw new Exception("Required section '$section' is missing in ticket data");
            }
        }
        
        // Validate devices array
        if (!is_array($ticketData['devices']) || empty($ticketData['devices'])) {
            throw new Exception("Devices array must be a non-empty array");
        }
        
        // Validate summary section
        $requiredSummaryFields = ['customer_id', 'employee_id'];
        foreach ($requiredSummaryFields as $field) {
            if (!isset($ticketData['summary'][$field])) {
                throw new Exception("Required summary field '$field' is missing");
            }
        }
        
        return $this->request('POST', '/tickets', $ticketData);
    }
    
    /**
     * Update ticket status
     *
     * @param int $ticketId Repair ticket ID
     * @param array $statusData Updated status data
     * @return array Updated ticket data
     */
    public function updateTicketStatus($ticketId, $statusData) {
        // Validate ticket ID
        if (!is_numeric($ticketId) || $ticketId <= 0) {
            throw new Exception("Invalid ticket ID. Ticket ID must be a positive integer.");
        }

        // Validate status data
        if (!isset($statusData['status']) || empty($statusData['status'])) {
            throw new Exception("Status is required in statusData.");
        }

        // Validate line item ID if provided
        if (isset($statusData['lineItemId']) && (!is_numeric($statusData['lineItemId']) || $statusData['lineItemId'] < 0)) {
            throw new Exception("Invalid line item ID. Line item ID must be a non-negative integer.");
        }

        return $this->request('PUT', "/ticket/updateticketstatus/$ticketId", $statusData);
    }

    /**
     * Update multiple ticket statuses (batch operation)
     *
     * @param array $batchData Array of ticket updates, each containing 'ticketId' and 'statusData'
     * @return array Array of update results
     */
    public function updateTicketStatuses($batchData) {
        if (!is_array($batchData) || empty($batchData)) {
            throw new Exception("Batch data must be a non-empty array.");
        }

        $results = [];
        foreach ($batchData as $index => $update) {
            try {
                if (!isset($update['ticketId']) || !isset($update['statusData'])) {
                    throw new Exception("Each batch item must contain 'ticketId' and 'statusData'.");
                }

                $result = $this->updateTicketStatus($update['ticketId'], $update['statusData']);
                $results[] = [
                    'index' => $index,
                    'ticketId' => $update['ticketId'],
                    'success' => true,
                    'data' => $result
                ];
            } catch (Exception $e) {
                $results[] = [
                    'index' => $index,
                    'ticketId' => $update['ticketId'] ?? null,
                    'success' => false,
                    'error' => $e->getMessage()
                ];
            }
        }

        return $results;
    }

    /**
     * Test API connection
     *
     * @return bool True if connection is successful
     * @throws Exception If connection fails
     */
    public function testConnection() {
        try {
            // Try to get repair tickets with minimal parameters to test connection
            $this->request('GET', '/repairs?page=1&pagesize=1');
            return true;
        } catch (Exception $e) {
            throw new Exception('API Connection Test Failed: ' . $e->getMessage());
        }
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
