<?php
/**
 * Enhanced getRepairTickets method for RepairDesk API
 * Provides comprehensive filtering and search capabilities
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
