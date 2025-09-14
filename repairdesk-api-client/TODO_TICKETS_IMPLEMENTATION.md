# POST /tickets Endpoint Implementation Plan

## Tasks to Complete:

### 1. Main API Client Implementation

### 2. OpenAPI Documentation
- [ ] Add `/tickets` path definition to openapi.yaml
- [ ] Define request body schema for ticket creation
- [ ] Define response schemas for success and error cases

### 3. Examples and Documentation
- [ ] Add example usage to example.php
- [ ] Add validation example to example_with_validation.php

### 4. Testing
- [ ] Test the implementation with sample data
- [ ] Verify response format matches expected structure

## Expected Request Structure:
```json
{
  "devices": [
    {
      "imei": "114231112421231",
      "public_comments": "Our team is working on it",
      "public_comment_flag": 1,
      "PreConditions": [],
      "status": "In Progress",
      "PostPreCategory": "34826",
      "task_type": 1,
      "gst": 14.894,
      "device": "845618",
      "staff_comments": "",
      "warranty": "5",
      "lineItemId": 0,
      "repairProdItems": [
        {
          "id": "7516047",
          "name": "Huawei Mate 9 Screen Replacement Blk"
        }
      ],
      "line_discount": 0,
      "taxclass": 28632,
      "device_location": "",
      "warranty_timeframe": "3",
      "Parts": [
        {
          "product_id": "7516552",
          "name": "Huawei Mate 9 Screen Replacement Blk",
          "price": "0.00",
          "quantity": 1,
          "supplier": "",
          "warranty_timeframe": "",
          "warrenty": "",
          "serials": {
            "0": ""
          },
          "sku": ""
        }
      ],
      "supplied": [],
      "security_code": "",
      "network": "",
      "serial": "",
      "price": 184.105,
      "due_on": 1588156799,
      "tax_inclusive": "1",
      "assigned_to": 10111,
      "repairCategId": "34826",
      "images": []
    }
  ],
  "customFields": [
    {
      "racknumber": {
        "label": "Rack Number",
        "value": "311"
      },
      "shipmentnum": {
        "label": "Shipment Number",
        "value": "12344211"
      }
    }
  ],
  "summary": {
    "signature": "",
    "how_did_u_find_us": "",
    "customer_id": "388",
    "estimate_id": "",
    "employee_id": 10111
  }
}
```

## Expected Response Structure (Success):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Ticket was created successfully",
  "data": {
    "id": 2614827,
    "order_id": "4578",
    "customer_id": 388,
    "ticketLabels": [
      {
        "id": "64656076",
        "name": "Huawei Mate 9 Screen Replacement Blk"
      }
    ],
    "devicesRepairItems": [
      {
        "id": "64656076",
        "ticketId": "2614827",
        "lineItemId": "0"
      }
    ],
    "notification_message": "No User In List"
  }
}
```

## Expected Response Structure (Error):
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized",
  "data": {
    "name": "Unauthorized",
    "message": "Your request was made with invalid credentials.",
    "code": 0,
    "status": 401
  }
}
