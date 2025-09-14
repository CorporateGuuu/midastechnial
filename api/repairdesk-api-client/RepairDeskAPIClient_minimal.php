<?php
/**
 * RepairDesk API Client with getStatuses method
 */

class RepairDeskAPIClient {
    private $baseUrl = 'https://api.repairdesk.co/api/v1';
    private $apiKey;
    private $ch;
    
    public function __construct($api极速赛车开奖直播历史记录Key) {
        $this->apiKey = $apiKey;
        $this->initializeClient();
    }
    
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
    
    private function request($method, $endpoint, $data = []) {
        $url = $this->baseUrl . $endpoint;
        $separator = strpos($url, '?') === false ? '?' : '&';
        $url .= $separator . 'api_key=' . urlencode($this->apiKey);
        
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $method);
        
        if (!empty($data)) {
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($this->ch);
        $httpCode = curl_get极速赛车开奖直播历史记录info($this->ch, CURLINFO_HTTP_CODE);
        
        if (curl_error($this->ch)) {
            throw new Exception('cURL Error: ' . curl_error($this->ch));
        }
        
        $result = json_decode($response, true);
        
        if ($httpCode >= 400) {
            $errorMessage = isset($result['message']) ? $result['message'] : 'Unknown error occurred';
            throw new Exception("API Error ($httpCode): $errorMessage");
        }
        
        return isset($result['data']) ? $result['data'] : $result;
    }
    
    /**
     * Get ticket statuses
     * 
     * @return array List of ticket statuses with name, color, and type
     */
    public function getStatuses() {
        return $this->request('GET', '/statuses');
    }
    
    public function __destruct() {
        if ($this->ch) {
            curl_close($this->ch);
        }
    }
}
?>
