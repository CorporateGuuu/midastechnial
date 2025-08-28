# RepairDesk API Client - API Documentation

## Overview
This document provides detailed API documentation for the RepairDesk API Client following OpenAPI 3.0 specification standards.

## Base URL
`https://api.repairdesk.co/api/v1`

## Authentication
All API requests require an API key passed as a query parameter.

### Parameters
- **api_key** *required* `string` (query) - API key to authorize the request

## Endpoints

### Devices

#### GET /devices
Get devices associated with tickets

**Parameters:**
- Optional query parameters for filtering

**Response:**
```json
{
  "data": [
    {
      "id": 123,
      "name": "iPhone 12",
      "model": "A2172",
      "manufacturer": "Apple",
      "type": "smartphone"
    }
  ]
}
```

#### GET /devices/{id}
Get specific device by ID

**Parameters:**
- **id** *required* `integer` (path) - Device ID

**Response:**
```json
{
  "data": {
    "id": 123,
    "name": "iPhone 12",
    "model": "A2172",
    "manufacturer": "Apple",
    "type": "smartphone",
    "specifications": {...}
  }
}
```

### Inventory

#### GET /inventory
Get inventory items

**Parameters:**
- Optional query parameters for filtering and pagination

**Response:**
```json
{
  "items": [
    {
      "id": 456,
      "name": "iPhone Screen",
      "sku": "IPH-SCREEN-001",
      "price": 49.99,
      "cost_price": 25.00,
      "in_stock": 10,
      "item_type": "part",
      "tax_class": "standard"
    }
  ]
}
```

#### POST /inventory
Add new inventory item

**Parameters:**
- **body** *required* `object` - Inventory item data

**Required Fields:**
- name, item_type, manufacturer, device, in_stock, cost_price, price, tax_class, sku

**Response:**
```json
{
  "data": {
    "id": 456,
    "name": "iPhone Screen",
    "sku": "IPH-SCREEN-001",
    "price": 49.99,
    "cost_price": 25.00,
    "in_stock": 10,
    "item_type": "part",
    "tax_class": "standard"
  }
}
```

#### PUT /inventory/{id}
Update inventory item

**Parameters:**
- **id** *required* `integer` (path) - Inventory item ID
- **body** *required* `object` - Updated item data

**Response:**
```json
{
  "data": {
    "id": 456,
    "name": "iPhone Screen",
    "sku": "IPH-SCREEN-001",
    "price": 44.99,
    "cost_price": 25.00,
    "in_stock": 15,
    "item_type": "part",
    "tax_class": "standard"
  }
}
```

### Customers

#### GET /customers
Get customers

**Parameters:**
- Optional query parameters for filtering and pagination

**Response:**
```json
{
  "data": [
    {
      "id": 789,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "address": {...}
    }
  ]
}
```

#### GET /customers/{id}
Get specific customer by ID

**Parameters:**
- **id** *required* `integer` (path) - Customer ID

**Response:**
```json
{
  "data": {
    "id": 789,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": {...},
    "notes": "Preferred customer"
  }
}
```

#### PUT /customers/{id}
Update customer information

**Parameters:**
- **id** *required* `integer` (path) - Customer ID
- **body** *required* `object` - Updated customer data

**Response:**
```json
{
  "data": {
    "id": 789,
    "name": "John Doe",
    "email": "new.email@example.com",
    "phone": "+1234567890",
    "address": {...}
  }
}
```

### Repair Tickets

#### GET /repairs
Get repair tickets

**Parameters:**
- Optional query parameters for filtering and pagination

**Response:**
```json
{
  "data": [
    {
      "id": 101,
      "customer_id": 789,
      "device_id": 123,
      "issue": "Screen replacement needed",
      "status": "pending",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### POST /repairs
Create repair ticket

**Parameters:**
- **body** *required* `object` - Repair ticket data

**Response:**
```json
{
  "data": {
    "id": 101,
    "customer_id": 789,
    "device_id": 123,
    "issue": "Screen replacement needed",
    "status": "pending",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

#### PUT /repairs/{id}
Update repair ticket

**Parameters:**
- **id** *required* `integer` (path) - Repair ticket ID
- **body** *required* `object` - Updated ticket data

**Response:**
```json
{
  "data": {
    "id": 101,
    "customer_id": 789,
    "device_id": 123,
    "issue": "Screen replacement needed",
    "status": "in_progress",
    "technician_notes": "Screen replaced successfully",
    "updated_at": "2024-01-15T11:30:00Z"
  }
}
```

### Orders

#### GET /orders
Get orders

**Parameters:**
- Optional query parameters for filtering and pagination

**Response:**
```json
{
  "data": [
    {
      "id": 202,
      "customer_id": 789,
      "total_amount": 149.97,
      "status": "completed",
      "created_at": "2024-01-14T15:30:00Z"
    }
  ]
}
```

#### GET /orders/{id}
Get specific order by ID

**Parameters:**
- **id** *required* `integer` (path) - Order ID

**Response:**
```json
{
  "data": {
    "id": 202,
    "customer_id": 789,
    "total_amount": 149.97,
    "status": "completed",
    "items": [...],
    "created_at": "2024-01-14T15:30:00Z"
  }
}
```

### Appointments

#### GET /appointments
Get appointments

**Parameters:**
- Optional query parameters for filtering and pagination

**Response:**
```json
{
  "data": [
    {
      "id": 303,
      "customer_id": 789,
      "date_time": "2024-01-16T14:00:00Z",
      "service_type": "Screen Repair",
      "status": "scheduled"
    }
  ]
}
```

#### POST /appointments
Create appointment

**Parameters:**
- **body** *required* `object` - Appointment data

**Response:**
```json
{
  "data": {
    "id": 303,
    "customer_id": 789,
    "date_time": "2024-01-16T14:00:00Z",
    "service_type": "Screen Repair",
    "notes": "Customer mentioned screen is cracked",
    "status": "scheduled"
  }
}
```

### Leads

#### POST /leads
Create lead from appointment

**Parameters:**
- **body** *required* `object` - Lead data

**Response:**
```json
{
  "data": {
    "id": 404,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "service_interest": "iPhone Repair",
    "status": "new"
  }
}
```

### Parts

#### GET /parts
Retrieves a list of all parts

**Parameters:**
- **api_key** *required* `string` (query) - API key to authorize the request

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": [
    {
      "id": "74099947",
      "name": "Back Camera For Samsung Galaxy S8 / S8 Plus (US Models)",
      "sku": "107082011514",
      "upc_code": "",
      "item_no": "6872",
      "极速赛车开奖直播历史记录price": "26.99",
      "in_stock": "10",
      "cost_price": "20.00",
      "tax_inclusive": "0",
      "tax_class": {
        "tax_class": "GST",
        "id": "1",
        "tax_percent": "5.000"
      },
      "warranty": "30",
      "warranty_timeframe": "1",
      "supplier": "Supplier Name",
      "image": "https://example.com/images/parts/back_camera.jpg",
      "devices": "7720894,7720896",
      "is_serialize": 0,
      "original_price": "26.99",
      "gst": "1.35",
      "serials": [
        "string"
      ],
      "skus": [
        "string"
      ]
    }
  ]
}
```

### Statuses

#### GET /statuses
Get ticket statuses

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Pending",
      "type": "default",
      "color": "#ffc107"
    },
    {
      "id": 2,
      "name": "In Progress",
      "type": "default",
      "color": "#17a2b8"
    },
    {
      "id": 3,
      "name": "Completed",
      "type": "default",
      "color": "#28a745"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "field_name": ["Error description"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid API key"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Rate Limiting
- 100 requests per minute per API key
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets

## Client Implementation
The PHP client handles:
- Automatic API key inclusion
- Error handling and parsing
- JSON encoding/decoding
- HTTP status code validation
- Rate limit awareness

## Testing
Use the provided test scripts to validate your implementation:
- `test.php` - Comprehensive endpoint testing
- `test_statuses_clean.php` - Status endpoint testing
- `example.php` - Usage examples

## Support
For API-specific issues, refer to the official RepairDesk API documentation.
