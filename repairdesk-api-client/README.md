# RepairDesk API Client

A standalone PHP client for interacting with the RepairDesk Public API v1 (OAS 3.0). This client provides comprehensive endpoints for managing devices, inventory, customers, repair tasks, orders, and appointments.

## Features

- **Devices Management**: Retrieve and manage devices associated with tickets
- **Inventory Management**: Add, update, and track inventory items
- **Customer Management**: Access and update customer information
- **Repair Tasks**: Create, update, and monitor repair tickets and their statuses
- **Order Management**: Manage sales orders and track order/invoice status
- **Appointments**: Handle appointments and create Leads in Repairdesk

## Requirements

- PHP 7.4 or higher
- cURL extension enabled
- Valid RepairDesk API key

## Installation

1. Download or clone this repository
2. Include the `RepairDeskAPI.php` file in your project
3. Get your API key from RepairDesk dashboard

## Usage

### Basic Setup

```php
require_once 'RepairDeskAPI.php';

// Initialize the API client with your API key
$apiKey = 'your_repairdesk_api_key_here';
$repairDesk = new RepairDeskAPI($apiKey);
```

### Devices Management

```php
// Get all devices
$devices = $repairDesk->getDevices();

// Get specific device by ID
$device = $repairDesk->getDevice(123);
```

### Inventory Management

```php
// Get all inventory items
$inventory = $repairDesk->getInventory();

// Add new inventory item
$newItem = $repairDesk->addInventoryItem([
    'name' => 'iPhone Screen',
    'sku' => 'IPH-SCREEN-001',
    'price' => 49.99,
    'quantity' => 10
]);

// Update inventory item
$updatedItem = $repairDesk->updateInventoryItem(456, [
    'quantity' => 15,
    'price' => 44.99
]);
```

### Customer Management

```php
// Get all customers
$customers = $repairDesk->getCustomers();

// Get specific customer by ID
$customer = $repairDesk->getCustomer(789);

// Update customer information
$updatedCustomer = $repairDesk->updateCustomer(789, [
    'email' => 'new.email@example.com',
    'phone' => '+1234567890'
]);
```

### Repair Tasks

```php
// Get all repair tickets
$tickets = $repairDesk->getRepairTickets();

// Create new repair ticket
$newTicket = $repairDesk->createRepairTicket([
    'customer_id' => 789,
    'device_id' => 123,
    'issue' => 'Screen replacement needed',
    'status' => 'pending'
]);

// Update repair ticket
$updatedTicket = $repairDesk->updateRepairTicket(101, [
    'status' => 'in_progress',
    'technician_notes' => 'Screen replaced successfully'
]);
```

### Order Management

```php
// Get all orders
$orders = $repairDesk->getOrders();

// Get specific order by ID
$order = $repairDesk->getOrder(202);
```

### Appointments

```php
// Get all appointments
$appointments = $repairDesk->getAppointments();

// Create new appointment
$newAppointment = $repairDesk->createAppointment([
    'customer_id' => 789,
    'date_time' => '2024-01-15 10:00:00',
    'service_type' => 'Screen Repair',
    'notes' => 'Customer mentioned screen is cracked'
]);

// Create lead from appointment
$newLead = $repairDesk->createLead([
    'name' => 'John Doe',
    'email' => 'john.doe@example.com',
    'phone' => '+1234567890',
    'service_interest' => 'iPhone Repair'
]);
```

## Error Handling

The API client throws `Exception` objects when errors occur. Always wrap your API calls in try-catch blocks:

```php
try {
    $devices = $repairDesk->getDevices();
    // Process devices data
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
    // Handle error appropriately
}
```

## Testing

A test script is included to verify the API connection:

```bash
php test.php
```

Make sure to replace the placeholder API key in `test.php` with your actual RepairDesk API key.

## API Endpoints

The client supports the following endpoints:

- `GET /devices` - Retrieve devices
- `GET /devices/{id}` - Get specific device
- `GET /inventory` - Retrieve inventory items
- `POST /inventory` - Add inventory item
- `PUT /inventory/{id}` - Update inventory item
- `GET /customers` - Retrieve customers
- `GET /customers/{id}` - Get specific customer
- `PUT /customers/{id}` - Update customer
- `GET /repairs` - Retrieve repair tickets
- `POST /repairs` - Create repair ticket
- `PUT /repairs/{id}` - Update repair ticket
- `GET /orders` - Retrieve orders
- `GET /orders/{id}` - Get specific order
- `GET /appointments` - Retrieve appointments
- `POST /appointments` - Create appointment
- `POST /leads` - Create lead

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## API Documentation

Detailed API documentation is available in multiple formats:

1. **API_DOCUMENTATION.md** - Comprehensive human-readable documentation
2. **openapi.yaml** - OpenAPI 3.0 specification for automated tooling

### Viewing OpenAPI Documentation

You can view the interactive API documentation using tools like:
- [Swagger Editor](https://editor.swagger.io/)
- [Redoc](https://redocly.github.io/redoc/)
- Postman (import the openapi.yaml file)

## Support

For issues with the API client, please check:
- PHP cURL extension is enabled
- API key is valid and has proper permissions
- Internet connection is available

For RepairDesk API-specific issues, refer to the official RepairDesk API documentation.
