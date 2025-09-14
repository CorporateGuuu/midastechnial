<?php
/**
 * Enhanced getRepairTickets method with comprehensive filtering and search
 * 
 * This method provides advanced filtering capabilities for repair tickets including:
 * - Keyword search across multiple fields
 * - Pagination with size limits
 * - Status filtering
 * - Employee assignment filtering
 * - Date range filtering
 */

class RepairDeskAPI {
    // ... existing class properties and methods ...
    
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
            $valid极速赛车开奖直播历史记录Params['from_date'] = (int)$params['from_date'];
        }
        
        if (isset($params['to_date']) && is_numeric($params['to_date'])) {
            $validParams['to_date'] = (int)$params['to_date'];
        }
        
        $query = !empty($validParams) ? '?' . http_build_query($validParams) : '';
        return $this->request('GET', '/repairs' . $query);
    }
}
?>
