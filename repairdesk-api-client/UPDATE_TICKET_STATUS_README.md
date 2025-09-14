# Update Ticket Status Endpoint

This document provides information about the `/ticket/updateticketstatus/{id}` endpoint and how to use it with the RepairDesk API Client.

## Endpoint Details

- **Method**: PUT
- **URL**: `/ticket/updateticketstatus/{id}`
- **Description**: Update the status of a ticket line item

## Request Parameters

### Path Parameters
- `id` (integer, required): The ID of the ticket to update

### Query Parameters
- `api_key` (string, required): Your RepairDesk API key

### Request Body
The request body should be a JSON object with the following properties:

- `status` (string, required): The new status for the ticket
- `lineItemId` (integer, optional): The ID of the specific line item to update

Example:
```json
{
  "status": "In Progress",
  "lineItemId": 123
}
```

## Response

The response will be a JSON object with the following structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": {
    // Updated ticket data
  }
}
```

## Usage Examples

### Basic Usage
```php
// Initialize the API client
$client = new RepairDeskAPIClient('your_api_key');

// Update ticket status
$ticketId = 123;
$statusData = [
    'status' => 'In Progress'
];

$response = $client->updateTicketStatus($ticketId, $statusData);
```

### With Line Item
```php
// Initialize the API client
$client = new RepairDeskAPIClient('your_api_key');

// Update ticket status for a specific line item
$ticketId = 123;
$statusData = [
    'status' => 'Completed',
    'lineItemId' => 456
];

$response = $client->updateTicketStatus($ticketId, $statusData);
```

## Error Handling

The method will throw an exception if:
- The API key is invalid
- The ticket ID is invalid
- The request data is invalid
- There's a network error

Make sure to wrap your calls in a try-catch block to handle these exceptions appropriately.

## Related Files

- `RepairDeskAPI.php`: Main API client implementation
- `RepairDeskAPIClient_minimal.php`: Minimal API client implementation
- `example_update_ticket_status.php`: Basic usage example
- `example_update_ticket_status_with_validation.php`: Example with validation
- `openapi.yaml`: OpenAPI specification
