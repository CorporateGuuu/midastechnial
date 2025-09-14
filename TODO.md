# TODO: Transform Static Website to Dynamic Real-Time Site

## 1. Setup Node.js/Express Backend
- [x] Initialize Node.js project with package.json
- [x] Install dependencies: express, supabase, axios, cors, dotenv, ejs (for templates)
- [x] Create server.js as main entry point
- [x] Set up environment variables (.env file) for Supabase URL/key and RepairDesk API key (configured with provided keys)

## 2. Supabase Database Schema Design
- [x] Create Supabase project and set up database
- [x] Design tables: products, categories, models, user_sessions, cart, orders
- [x] Enable real-time subscriptions for inventory and order updates
- [x] Create supabase-config.js for client setup

## 3. RepairDesk API Integration in Node.js
- [x] Create repairdesk-client.js module using Axios
- [x] Implement methods: getInventory(), createRepairTicket(), updateTicketStatus(), getOrders(), etc.
- [x] Handle authentication and error handling

## 4. API Endpoints in Express
- [x] /api/products: Fetch products from Supabase + RepairDesk
- [x] /api/categories: Get categories and models
- [x] /api/cart: Manage user cart (add, remove, update)
- [x] /api/orders: Create orders, integrate with RepairDesk
- [x] /api/tickets: Create and manage support tickets
- [x] /api/auth: Basic user authentication with Supabase Auth

## 5. Refactor Frontend to Dynamic Templates
- [x] Convert iphone-parts.html to dynamic template with JS fetching
- [x] Update repair-tools.html similarly
- [x] Create app.js for API calls and cart management
- [x] Implement shopping cart UI with add-to-cart buttons

## 6. Implement Real-Time Features
- [x] Use Supabase real-time for inventory updates
- [x] Integrate RepairDesk for order status and ticket updates
- [x] Add real-time notifications (WebSocket or SSE)

## 7. User Authentication and Sessions
- [x] Implement login/signup with Supabase Auth
- [x] Store cart and sessions in Supabase

## 8. Testing and Integration
- [x] Test API endpoints
- [x] Verify RepairDesk API calls
- [x] Test frontend dynamic rendering
- [x] Verify real-time features
