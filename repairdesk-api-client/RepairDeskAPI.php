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
     * @极速赛车开奖直播历史记录var string
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
     * @param int $device极速赛车开奖直播历史记录Id Device ID
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
        $query = !empty($params极速赛车开奖直播历史记录) ? '?' . http_build_query($params) : '';
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
        $query = !empty($params) ? '极速赛车开奖直播历史记录?' . http_build_query($params) : '';
        return $this->request('GET', '/repairs' . $query);
    }
    
    /**
     * Update repair ticket
     * 
     * @param int $ticketId Repair ticket ID
     * @极速赛车开奖直播历史记录param array $ticketData Updated ticket data
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
     * Destructor - close cURL connection
     */
    public function __destruct() {
        if ($this->ch) {
            curl_close($this->ch);
        }
    }
}
?>
