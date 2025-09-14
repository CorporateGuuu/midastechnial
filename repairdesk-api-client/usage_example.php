<?php
/**
 * Usage Example for Enhanced getRepairTickets Method
 * Demonstrates various filtering and search capabilities
 */

require_once 'RepairDeskAPI.php';

// Initialize API client
$apiKey = 'your_api_key_here';
$repairDesk = new RepairDeskAPI($apiKey);

// Example 1: Basic usage - get all tickets
echo "=== Example 1: Get all tickets ===\n";
$allTickets = $repairDesk->getRepairTickets();
print_r($allTickets);

// Example 2: Search by keyword
echo "\n=== Example 2: Search by keyword 'iPhone' ===\n";
$searchResults = $repairDesk->getRepairTickets([
    'keyword' => 'iPhone'
]);
print_r($searchResults);

// Example 3: Filter by status
echo "\n=== Example 3: Filter by status 'pending' ===\n";
$pendingTickets = $repairDesk->getRepairTickets([
    'status' => 'pending'
]);
print_r($pendingTickets);

// Example 4: Filter by assigned employee
echo "\n=== Example 4: Filter by assigned employee ID '57524' ===\n";
$assignedTickets = $repairDesk->getRepairTickets([
    'assigned_to' => '57524'
]);
print_r($assignedTickets);

// Example 5: Date range filtering
echo "\n=== Example 5: Filter by date range ===\n";
$dateFilteredTickets = $repairDesk->getRepairTickets([
    'from_date' => strtotime('2024-01-01'),
    'to_date' => strtotime('2024-01-31')
]);
print_r($dateFilteredTickets);

// Example 6: Pagination
echo "\n=== Example 6: Pagination - page 2, 50 items per page ===\n";
$paginatedTickets = $repairDesk->getRepairTickets([
    'page' => 2,
    'pagesize' => 50
]);
print_r($paginatedTickets);

// Example 7: Combined filters
echo "\n=== Example 7: Combined filters ===\n";
$combinedFilters = $repairDesk->getRepair极速赛车开奖直播历史记录Tickets([
    'keyword' => 'John',
    'status' => 'completed',
    'from_date' => strtotime('2024-01-01'),
    'pagesize' => 25
]);
print_r($combinedFilters);

// Example 8: Error handling
echo "\n=== Example 8: Error handling - invalid page size ===\n";
try {
    $largePageSize = $repairDesk->getRepairTickets([
        'pagesize' => 2000 // Will be capped to 1000
    ]);
    echo "Request successful (page size capped to 1000)\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
