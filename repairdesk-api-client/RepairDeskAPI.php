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
    private $baseUrl = 'https://api.repairdesk.co/api/v1';
    
    /**
     * API Key for authentication
     * @var string
     */
    private $apiKey;
    
    /**
     * HTTP Client (cURL)
     * @var resource
     */
    private $ch;
    
    /**
     * Constructor
     * 
     * @param string $apiKey Your RepairDesk API key
     */
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
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
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($this->ch, CURLOPT_TIMEOUT, 30);
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
        
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $method);
        
        if (!empty($data)) {
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
     * Get repair tickets with comprehensive filtering and search
     * 
     * @param array $params Query parameters including:
     *   - keyword (string): Search by customer name, email, phone, device, ticket number, IMEI/serial
     *   - page (int): Page number for pagination (default: 0)
     *   - pagesize (int): Items per page (max: 1000)
     *   - status (string): Filter by ticket status
     *   - assigned_to (string): Filter by assigned employee ID
     *   - created_by (string): Filter by creator employee ID
     *   - from_date (int): Filter from date (Unix timestamp)
     *   - to_date (int): Filter to date (Unix timestamp)
     * @return array Repair tickets with ticketData and pagination information
     */
    public function getRepairTickets($params = []) {
        // Validate and sanitize parameters
        $validParams = [];
        
        if (isset($params['keyword']) && is_string($params['keyword'])) {
            $validParams['keyword'] = trim($params['keyword']);
        }
        
        if (isset($params['page']) && is_numeric($params['page'])) {
            $validParams['page'] = (int)$params['page'];
        }
        
        if (isset($params['pagesize']) && is_numeric($params['pagesize'])) {
            $pagesize = (int)$params['pagesize'];
            if ($pagesize > 1000) {
                $pagesize = 1000; // Enforce maximum limit
            }
            $validParams['pagesize'] = $pagesize;
        }
        
        if (isset($params['status']) && is_string($params['status'])) {
            $validParams['status'] = trim($params['status']);
        }
        
        if (isset($params['assigned_to']) && is_string($params['assigned_to'])) {
            $validParams['assigned_to'] = trim($params['assigned_to']);
        }
        
        if (isset($params['created_by']) && is_string($params['created_by'])) {
            $validParams['created_by'] = trim($params['created_by']);
        }
        
        if (isset($params['from_date']) && is_numeric($params['from_date'])) {
            $validParams['from_date'] = (int)$params['from_date'];
        }
        
        if (isset($params['to_date']) && is_numeric($params['to_date'])) {
            $validParams['to_date'] = (int)$params['to_date'];
        }
        
        $query = !empty($validParams) ? '?' . http_build_query($validParams) : '';
        return $this->request('GET', '/repairs' . $query);
    }
    
    /**
     * Update ticket status
     * 
     * @param int $ticketId Repair ticket ID
     * @param array $statusData Updated status data
     * @return array Updated ticket data
     */
    public function updateTicketStatus($ticketId, $statusData) {
        return $this->request('PUT', "/ticket/updateticketstatus/$ticketId", $statusData);
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
     * @param array $params Query parameters:
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
     * Get ticket statuses
     * 
     * @return array List of ticket statuses with name, color, and type
     */
    public function getStatuses() {
        return $this->request('GET', '/statuses');
    }
    
    /**
     * Get single ticket by ID
     * 
     * @param string $ticketId Ticket ID
     * @return array Ticket data
     */
    public function getTicket($ticketId) {
        // Validate ticket ID
        if (empty($ticketId)) {
            throw new Exception("Ticket ID is required");
        }
        
        return $this->request('GET', "/tickets/$ticketId");
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
